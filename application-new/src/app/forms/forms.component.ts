import { Component, OnInit } from '@angular/core';

import { FormService } from './forms.service';
import { ITreeState } from 'angular-tree-component';

@Component({
    selector: 'app-forms',
    templateUrl: './forms.component.html'
})
export class FormsComponent implements OnInit {

    public nodes: any[];
    public options: any;
    public forms: any;
    public data: any = {};
    public state: ITreeState;

    constructor(private dataService: FormService) { }

    ngOnInit() {
        this.getTreeData();
    }

    public async getTreeData() {
        this.nodes = await this.dataService.getTreeData();
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
        this.getFormData(node.data.key);
    }
}
