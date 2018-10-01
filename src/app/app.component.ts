import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { ShopHistoryService } from './shop-history.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    orderedCustomersByTotal: any[] = null;

    constructor(private customerService: CustomerService, private shopHistoryService: ShopHistoryService) {
    }

    /**
     *
     */
    ngOnInit() {
        this.getCustomersOrderedByTotal();
    }

    /**
     * Gets all customers ordered by the total of them purchases
     */
    private getCustomersOrderedByTotal() {
        this.customerService.getAll().subscribe((customers) => {

            this.shopHistoryService.getAll().subscribe((historic) => {

                customers.forEach((customer, index) => {
                    // Get shopping history by customer
                    const customerShopHistory = historic.filter(item => {
                        const customerCpf = this.customerService.getCleanCpf(customer.cpf);
                        const historicItemCustomerCpf = this.shopHistoryService.getCleanCustomerCpf(item.cliente);

                        return historicItemCustomerCpf === customerCpf;
                    });

                    // Sum the shopping history
                    customers[index]['total'] = customerShopHistory.reduce((previousValue, element) => {
                        return previousValue + element.valorTotal;
                    }, 0).toFixed(2);
                });

                // Sort customers by shopping history
                this.orderedCustomersByTotal = customers.sort((a, b) => b['total'] - a['total']);
            });
        });
    }
}
