
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileService } from '../file.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-data-mining',
    templateUrl: './data-mining.html',
})
export class DataMiningComponent implements OnInit, OnDestroy {
    OlzData: string[];
    TABLE_HEADER: string[];
    tableRows: number[][];

    tableColumns: number[];

    private unsubscribe: Subscription;
    constructor(private fileService: FileService) {
    }

    ngOnInit() {

        this.unsubscribe = this.fileService.renderTable.asObservable()
            .subscribe(({ rows, headers }) => {
                this.TABLE_HEADER = headers;
            });

        // IpcRenderer.on('rendertable', (event, data) => {
        //     console.log(data)
        // })

        // this.TABLE_HEADER = ['SaleBusinessProperty', 'AlternateMinimumTax', 'FarmRentalIncome', 'ContributionIRA', 'DepreciationProperty', 'CapitalAssetSale', 'AdditionalTaxIRA', 'SaversCredit', 'EducationCredit', 'ChildTaxCredit', 'ProfitLossBusiness', 'ClientGovernmentOfficial', 'EmployeeBusinessExpenses'];

        // this.tableRows = [];
        // this.tableColumns = [];
        // for (let i = 0; i < this.TABLE_HEADER.length; ++i) {
        //     this.tableColumns.push(0);
        // }
        // const FORMTOCOLUMN = { 'Form4797': 'SaleBusinessProperty', 'Form6251': 'AlternateMinimumTax', 'Form4835': 'FarmRentalIncome', 'Form8606': 'ContributionIRA', 'Form4562': 'DepreciationProperty', 'Form8949': 'CapitalAssetSale', 'Form5329': 'AdditionalTaxIRA', 'Form8880': 'SaversCredit', 'Form8863': 'EducationCredit', 'Schedule8812 ChildTaxCredit': 'ChildTaxCredit', 'ScheduleC': 'ProfitLossBusiness', 'Form2106': 'EmployeeBusinessExpenses|ClientGovernmentOfficial' };

        // let error = true;
        // Promise.all(this.doAsyncTask())
        //     .then(
        //         res => { // Success
        //             for (const OlzData of res) {
        //                 var objectKeys: string[] = Object.keys(OlzData)
        //                 for (const key of objectKeys) {
        //                     const value = FORMTOCOLUMN[key];
        //                     this.tableColumns[this.TABLE_HEADER.indexOf(value)] = 1;
        //                 }
        //                 this.tableRows.push(this.tableColumns);
        //             }
        //         }
        //     );
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
