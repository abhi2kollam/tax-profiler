import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    private ipc: IpcRenderer;

    public rows = [];
    public renderTable = new Subject()
    constructor(private http: HttpClient) {
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
            this.rows = arg.rows;
            this.renderTable.next(arg);
        });
    }

    async processFiles(files: any) {
        const config = await this.http.get('./assets/data/config.json').toPromise();
        this.ipc.send('processFiles', { files, config });
    }
    runDbScan(lastRow) {
        this.rows.push(lastRow);
        this.ipc.send('runDbScan', this.rows);
    }
}
