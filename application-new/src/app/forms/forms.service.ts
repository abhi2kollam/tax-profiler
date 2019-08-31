import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class FormService {

    public suggestedFormsList: string[] = ['Schedule C'];

    constructor(private http: HttpClient) { }

    public getTreeData(): any {
        return this.http.get('assets/data/tree-render.json').toPromise();
    }

    public getFormJson(formname: string) {
        return this.http.get(`assets/data/form-json/${formname}.json`).toPromise();
    }

    public getFormData(formname: string) {
        return this.http.get(`assets/data/form-data/${formname}.json`).toPromise();
    }
}