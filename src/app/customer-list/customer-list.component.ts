import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
    @Input() title: string;
    @Input() customers: any[] = null;

    constructor() {
    }

    ngOnInit() {
    }
}
