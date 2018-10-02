import { Component, Input } from '@angular/core';
import { ShopHistoryService } from '../shop-history.service';
import { CustomerService } from '../customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent {
    recommendation: any = null;

    @Input() customTitle: string;
    @Input() customers: any[] = null;

    constructor(private customerService: CustomerService, private shopHistoryService: ShopHistoryService, private modalService: NgbModal) {
    }

    /**
     * Opens the recommendation modal
     * @param content
     * @param {number} id
     */
    open(content, id: number) {
        this.getRecommendation(id);

        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }

    /**
     * Generates the recommendation based on the customer shop history
     * @param {number} id
     */
    private getRecommendation(id: number) {
        this.recommendation = null;

        this.customerService.getAll().subscribe((customers) => {

            this.shopHistoryService.getAll().subscribe((historic) => {

                customers.filter((customer) => customer.id === id).forEach((customer) => {
                    // Get shopping history by customer
                    const customerShopHistory = this.shopHistoryService.getHistoricByCustomerCpf(historic, customer.cpf);

                    // Bought items
                    let items = [];

                    // Loops through all the purchases
                    customerShopHistory.forEach((order) => {
                        items = items.concat(order.itens);
                    });

                    // Random item index
                    const recommendedIndex = Math.floor(Math.random() * items.length);

                    this.recommendation = items[recommendedIndex];
                });
            });
        });
    }
}
