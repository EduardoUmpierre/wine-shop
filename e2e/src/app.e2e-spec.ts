import { AppPage } from './app.po';

describe('workspace-project App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display page title', () => {
        page.navigateTo();
        expect(page.getPageTitle()).toEqual('Wine shop');
    });

    it('should display the correct title', () => {
        expect(page.getCustomersOrderedByShopHistory()).toEqual('Lista de clientes pelo valor total de compras');
    });

    it('should display the correct title', () => {
        expect(page.getCustomerWithBiggestPurchase()).toEqual('Cliente com maior compra no último ano');
    });

    it('should display the correct title', () => {
        expect(page.getMostLoyalCustomers()).toEqual('Clientes mais fiéis');
    });
});
