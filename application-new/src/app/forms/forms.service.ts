import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class FormService {
    constructor(private http: HttpClient) { }

    public getTreeData(): any {
        return this.http.get('assets/data/tree-render.json').toPromise();
    }

    public getFormJson() {
        return this.http.get('assets/data/form-render.json').toPromise();
    }
}