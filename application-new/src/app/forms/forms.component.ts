import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-forms',
    templateUrl: './forms.component.html'
})
export class FormsComponent implements OnInit {

    public nodes: any[];
    public options: any;

    constructor() { }

    ngOnInit() {
        this.nodes = [
            {
                id: 1,
                name: 'root1',
                children: [
                    { id: 2, name: 'child1' },
                    { id: 3, name: 'child2' }
                ]
            },
            {
                id: 4,
                name: 'root2',
                children: [
                    { id: 5, name: 'child2.1' },
                    {
                        id: 6,
                        name: 'child2.2',
                        children: [
                            { id: 7, name: 'subsub' }
                        ]
                    }
                ]
            }
        ];
        this.options = {};
    }

}
