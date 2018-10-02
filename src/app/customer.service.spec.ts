import { TestBed } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import { HttpClientModule } from '@angular/common/http';

describe('CustomerService', () => {
    let service: CustomerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ]
        });
        service = TestBed.get(CustomerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should clean the cpf', () => {
        expect(service.getCleanCpf('000.000.000-01')).toBe('00000000001');
    });
});
