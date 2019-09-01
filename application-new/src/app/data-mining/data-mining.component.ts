
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { FileService } from '../file.service';


@Component({
    selector: 'app-data-mining',
    templateUrl: './data-mining.html',
})
export class DataMiningComponent implements OnInit, OnDestroy {
    OlzData: string[];
    TABLE_HEADER: string[];
    tableRows: number[][];
    fileDescription: string;
    processed = false;
    showResult = false;
    clusterFiles = false;

    private unsubscribe: Subscription;

    constructor(private fileService: FileService,
        private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {

        this.unsubscribe = this.fileService.renderTable.asObservable()
            .subscribe(({ rows, headers, fileToFormMap, clusterFiles }) => {
                this.TABLE_HEADER = headers;
                this.tableRows = rows;
                this.fileService.fileToFormMap = fileToFormMap;
                this.processed = true;
                this.clusterFiles = clusterFiles;
                console.log(clusterFiles)
                this.cdr.detectChanges();
            });

    }
    showResults() {
        this.showResult = true;
    }

    fileSelected(event) {
        if (event.target.files.length) {
            this.fileDescription = `${event.target.files.length} file(s) selected`;
        }
    }

    /**
     * onFileSubmit
     */
    public onFileSubmit(files) {
        const filesFormatted = [];
        this.showResult = false;
        let file: any = {};
        // format the file data to only path and name
        for (var i = 0; i < files.length; i++) {
            file = files[i];
            filesFormatted.push({ name: file.name, path: file.path })
        }

        // send the data to the main process
        this.fileService.processFiles(filesFormatted);
    }

    ngOnDestroy() {
        this.unsubscribe.unsubscribe();
    }

}
