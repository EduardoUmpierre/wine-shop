import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ShopHistoryService {

    constructor(private http: HttpClient) {
    }

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
}
