import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileService } from '../file.service';

@Component({
    selector: 'app-new-return',
    templateUrl: 'new-return.component.html',
    styles: [`
    .modal{
        background: rgba(0,0,0,.5);
    }
        .card.card-stats{
            cursor:pointer;
        }
        .card.card-stats.active{
            opacity: .7;
            background: #8cf7a8;
            border: 1px solid #19b519;
        }
        .tick {
                position: absolute;
                font-size: 50px;
                color: #0eb30e;
                top: 30%;
                left: 40%;
                z-index: 1;
        }
    `]

})
export class NewReturnComponent implements OnInit {

    public questions = [];
    public hidePopup = true;
    constructor(
        private http: HttpClient,
        private fileService: FileService) { }

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

    findReturnCluster() {
        this.hidePopup = false;
        const selectedAnswers = this.questions.map(
            (question) => {
                return question.active ? 1 : 0;
            });
        this.fileService.runDbScan(selectedAnswers);

    }

}
