import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-new-return',
    templateUrl: 'new-return.component.html',
    styles: [`
        .card.card-stats{
            cursor:pointer;
        }
        .card.card-stats.active{
            opacity:.5;
            background:lightblue;
        }
        .active:before{
            content: "✓";
            position: absolute;
            top: 15%;
            right: 8%;
            z-index: 1;
            font-size: 45px;
            font-weight: bolder;
        }
    `]

})
export class NewReturnComponent implements OnInit {

    public questions = []

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.http.get('./assets/data/config.json')
            .toPromise()
            .then((data: any[]) => {
                this.questions = data;
            });
    }

    setActive(question: any) {
        question.active = !question.active;
    }

}
