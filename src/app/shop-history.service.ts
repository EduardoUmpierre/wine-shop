import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from './customer.service';

@Injectable({
    providedIn: 'root'
})
export class ShopHistoryService {

    constructor(private http: HttpClient, private customerService: CustomerService) {
    }

    /**
     * Get all customer shop history data
     * @returns {Observable<any>}
     */
    getAll(): Observable<any> {
        return this.http.get('http://www.mocky.io/v2/598b16861100004905515ec7');
    }

    /**
     * Gets the customers CPF without the special characters
     * @param {string} cpf
     * @returns {string}
     */
    getCleanCustomerCpf(cpf: string) {
        let customerCpf = cpf.replace(/\./g, '');

        if (customerCpf.length > 11) {
            customerCpf = customerCpf.substr(1);
        }

        return customerCpf;
    }

    /**
     * Gets the list of purchases by customer cpf
     * @param {any[]} historic
     * @param {string} cpf
     * @returns {any[]}
     */
    getHistoricByCustomerCpf(historic: any[], cpf: string) {
        return historic.filter(item => {
            const customerCpf = this.customerService.getCleanCpf(cpf);
            const historicItemCustomerCpf = this.getCleanCustomerCpf(item.cliente);

            return historicItemCustomerCpf === customerCpf;
        });
    }
}
