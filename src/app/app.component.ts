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
    biggestPurchaseCustomer: any[] = null;
    mostLoyalCustomers: any[] = null;

    constructor(private customerService: CustomerService, private shopHistoryService: ShopHistoryService) {
    }

    /**
     * Get the dashboard data on component init
     */
    ngOnInit() {
        this.getCustomersOrderedByTotal();
        this.getCustomerWithTheBiggestPurchaseLastYear(2016);
        this.getMostLoyalCustomers();
    }

    /**
     * Get the most loyal customers data
     */
    private getMostLoyalCustomers() {

        this.customerService.getAll().subscribe((customers) => {

            this.shopHistoryService.getAll().subscribe((historic) => {

                customers.forEach((customer, index) => {
                    // Get shopping history by customer
                    const customerShopHistory = this.shopHistoryService.getHistoricByCustomerCpf(historic, customer.cpf);

                    // Get the first purchase sorted by date
                    customers[index]['data'] = customerShopHistory.sort(this.sortByDate)[0].data;
                });

                // Sort customers by first purchase
                this.mostLoyalCustomers = customers.sort(this.sortByDate).slice(0, 5);
            });
        });
    }

    /**
     * Gets the customer with the biggest purchase
     * @param {number} year
     */
    private getCustomerWithTheBiggestPurchaseLastYear(year: number) {

        this.shopHistoryService.getAll().subscribe((historic) => {
            // Filter the purchases
            const purchasesFromLastYear = historic.filter((item) => item.data.indexOf(year) !== -1);

            // Get the biggest purchase information
            const biggestPurchase = purchasesFromLastYear.sort((a, b) => b['valorTotal'] - a['valorTotal'])[0];

            this.customerService.getAll().subscribe((customers) => {
                // Get the customer with the biggest purchase
                this.biggestPurchaseCustomer = customers.filter(item => {
                    const customerCpf = this.customerService.getCleanCpf(item.cpf);
                    const historicItemCustomerCpf = this.shopHistoryService.getCleanCustomerCpf(biggestPurchase.cliente);

                    return customerCpf === historicItemCustomerCpf;
                });
            });
        });
    }

    /**
     * Gets all customers ordered by the total of them purchases
     */
    private getCustomersOrderedByTotal() {
        this.customerService.getAll().subscribe((customers) => {

            this.shopHistoryService.getAll().subscribe((historic) => {

                customers.forEach((customer, index) => {
                    // Get shopping history by customer
                    const customerShopHistory = this.shopHistoryService.getHistoricByCustomerCpf(historic, customer.cpf);

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

    /**
     * Sort two dates
     * @param a
     * @param b
     * @returns {number}
     */
    private sortByDate(a, b) {
        let firstDate = a['data'].split('-');
        let secondDate = b['data'].split('-');

        firstDate = new Date(firstDate[2], firstDate[1], firstDate[0]);
        secondDate = new Date(secondDate[2], secondDate[1], secondDate[0]);

        return firstDate - secondDate;
    }
}
