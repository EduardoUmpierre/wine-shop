import { browser, by, element } from 'protractor';

export class AppPage {
    navigateTo() {
        return browser.get('/');
    }

    getPageTitle() {
        return element(by.css('body > .container > h1')).getText();
    }

    getCustomersOrderedByShopHistory() {
        return element(by.css('app-root > .row > .col-12:first-child > app-customer-list > h2')).getText();
    }

    getCustomerWithBiggestPurchase() {
        return element(by.css('app-root > .row > .col-12:last-child > app-customer-list:first-child > h2')).getText();
    }

    getMostLoyalCustomers() {
        return element(by.css('app-root > .row > .col-12:last-child > app-customer-list:last-child > h2')).getText();
    }
}
