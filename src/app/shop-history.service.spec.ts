import { TestBed } from '@angular/core/testing';

import { ShopHistoryService } from './shop-history.service';
import { HttpClientModule } from '@angular/common/http';

describe('ShopHistoryService', () => {
    let service: ShopHistoryService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ]
        });
        service = TestBed.get(ShopHistoryService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should clean the cpf', () => {
        expect(service.getCleanCustomerCpf('0000.000.000.01')).toBe('00000000001');
    });
});
