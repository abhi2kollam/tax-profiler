import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileService } from '../file.service';
import { Subscription } from 'rxjs';
import { FormService } from '../forms/forms.service';
import { first, map, flatten } from 'lodash-es';

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
export class NewReturnComponent implements OnInit, OnDestroy {
    public questions = [];
    public messageList = [];
    public formList = [];
    public hidePopup = true;
    private unsubscribe: Subscription;

    constructor(
        private http: HttpClient,
        private fileService: FileService,
        private formService: FormService,
        private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.http.get('./assets/data/config.json')
            .toPromise()
            .then((data: any[]) => {
                this.questions = data;
            });
        this.unsubscribe = this.fileService.renderTable.asObservable()
            .subscribe(() => {
                this.createPopupMessage();
                this.cdr.detectChanges();
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

    trackByFn(index: number) {
        return index;
    }

    ngOnDestroy(): void {
        this.unsubscribe.unsubscribe();
    }

    /**
     * selectOrUnselectForm
     */
    public selectOrUnselectForm(form) {
        form.selected = !form.selected;
        const forms = this.formList.filter((item) => item.name && item.selected);
        this.formService.suggestedFormNamesList = forms.map((item1) => item1.name);
    }

    private createPopupMessage() {
        this.formList = [];
        this.messageList = [];
        for (const form of this.formService.suggestedFormsList) {
            this.formList.push(
                {
                    name: first(this.fileService.configMap[form])['FormName'],
                    message: flatten(map(this.fileService.configMap[form], 'ConfirmationMessage')),
                    selected: true
                }
            );
        }
        this.formService.suggestedFormNamesList = this.formList.map((form) => form.name);
    }

}
