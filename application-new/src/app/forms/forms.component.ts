import { Component, OnInit } from '@angular/core';

import { FormService } from './forms.service';

@Component({
    selector: 'app-forms',
    templateUrl: './forms.component.html'
})
export class FormsComponent implements OnInit {

    public nodes: any[];
    public options: any;
    public forms: any;
    public data: { [key: string]: string } = {};

    constructor(private dataService: FormService) { }

    ngOnInit() {
        this.getTreeData();
        this.getFormJson();
    }

    public async getTreeData() {
        this.nodes = await this.dataService.getTreeData();
        this.options = {};
    }

    public async getFormJson() {
        this.forms = await this.dataService.getFormJson();
    }

    public trackByFn(index: number) {
        return index;
    }
}
