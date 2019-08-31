
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

    private unsubscribe: Subscription;

    constructor(private fileService: FileService,
        private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {

        this.unsubscribe = this.fileService.renderTable.asObservable()
            .subscribe(({ rows, headers }) => {
                this.TABLE_HEADER = headers;
                this.tableRows = rows;
                this.cdr.detectChanges();
            });

    }

    /**
     * onFileSubmit
     */
    public onFileSubmit(files) {
        const filesFormatted = [];
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
