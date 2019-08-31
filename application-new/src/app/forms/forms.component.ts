import { Component, OnInit } from '@angular/core';

import { FormService } from './forms.service';
import { ITreeState } from 'angular-tree-component';
import { ITreeNode } from './interfaces/tree-node.interface';

@Component({
    selector: 'app-forms',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

    public nodes: ITreeNode[];
    public options: any;
    public forms: any;
    public data: any = {};
    public state: ITreeState;
    public isSuggestedForm = false;

    constructor(private dataService: FormService) { }

    ngOnInit() {
        this.getTreeData();
    }

    public async getTreeData() {
        this.nodes = await this.dataService.getTreeData();
        this.nodes = [...this.nodes, ...this.appendSuggestedNodes()];

        this.getFormJson(this.nodes[0].key);
        const activeNodeIds = {};
        activeNodeIds[this.nodes[0].id] = true;
        this.state = {
            ...this.state,
            activeNodeIds
        };

        this.getFormData(this.nodes[0].key);
        this.options = {};
    }

    public async getFormJson(formName: string) {
        this.forms = await this.dataService.getFormJson(formName);
    }

    public async getFormData(formName: string) {
        this.data = await this.dataService.getFormData(formName);
    }

    public trackByFn(index: number) {
        return index;
    }

    public nodeClicked({ node }: any) {
        this.getFormJson(node.data.key);
        this.isSuggestedForm = node.data.type === 'Suggested';
        if (node.data.type === 'Default') {
            this.getFormData(node.data.key);
        }
    }

    private appendSuggestedNodes(): ITreeNode[] {
        const nodes: ITreeNode[] = [];
        let highestId = this.nodes[this.nodes.length - 1].id;
        for (const node of this.dataService.suggestedFormsList) {
            nodes.push({
                id: ++highestId,
                children: [],
                key: node.replace(/\s/g, ''),
                name: node,
                type: "Suggested"
            });
        }
        return nodes;
    }
}
