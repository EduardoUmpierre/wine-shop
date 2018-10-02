import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<any> {
        return this.http.get('http://www.mocky.io/v2/598b16291100004705515ec5');
    }

    /**
     * Gets the customers CPF without the special characters
     * @param {string} cpf
     * @returns {string}
     */
    getCleanCpf(cpf: string) {
        return cpf.replace(/[\.\-]/g, '');
    }
}
