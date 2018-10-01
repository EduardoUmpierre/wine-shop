import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent {
    @Input() title: string;
    @Input() customers: any[] = null;
}
