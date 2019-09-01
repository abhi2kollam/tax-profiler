import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { FormService } from './forms/forms.service';
import { groupBy } from 'lodash-es';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    private ipc: IpcRenderer;

    public rows = [];
    public renderTable = new Subject();
    public fileToFormMap: any;
    public config: any;
    public configMap: any;

    constructor(private http: HttpClient, private formService: FormService) {
        if ((<any>window).require) {
            try {
                this.ipc = (<any>window).require('electron').ipcRenderer;
            } catch (error) {
                throw error;
            }
        } else {
            console.warn('Could not load electron ipc');
        }
    }

    async getFiles() {
        this.ipc.on('getFilesResponse', (event, arg) => {
            console.log(arg);
            if (arg.fileToFormMap) {
                this.fileToFormMap = arg.fileToFormMap;
            } else {
                const filesSize = Object.keys(this.fileToFormMap).length;
                let formsList;
                for (let i = 0; i < arg.clusters.length; ++i) {
                    if (arg.clusters[i].includes(filesSize)) {
                        formsList = this.fileToFormMap[arg.clusters[i][0]];
                        break;
                    }
                }
                if (formsList) {
                    this.fileToFormMap[filesSize] = formsList;
                    this.formService.suggestedFormsList = formsList;
                } else {
                    this.fileToFormMap[filesSize] = [];
                    this.formService.suggestedFormsList = [];
                }
            }
            this.rows = arg.rows;
            this.renderTable.next(arg);
        });
    }

    async processFiles(files: any) {
        this.config = await this.http.get('./assets/data/config.json').toPromise();
        this.configMap = groupBy(this.config, 'FormNumber');
        this.ipc.send('processFiles', { files, config: this.config });
    }
    runDbScan(lastRow) {
        this.rows.push(lastRow);
        this.ipc.send('runDbScan', this.rows);
    }
}
