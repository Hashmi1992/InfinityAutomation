class SearchingFunctionality {
    // << --------------- Elements (Locators) Section -------------------------->>

    searchfield = 'input[name="AutoCompleteContracts_input"]';
    searchresults = 'span.k-list-item-text';
    contractdisplayed = 'span.h5'


    // << --------------- Methods Section -------------------------->>
    // Search for Contract by entering text in the search field
    searchContract(searchText) {
        cy.get(this.searchfield).should('be.visible').click({ force: true }); //click search field.
        cy.get(this.searchfield).type(searchText); //type contract number.
        cy.wait(3000);
        cy.get(this.searchresults).eq(0).should('be.visible').and('contain.text', searchText).click(); //click first result.
        cy.wait(6000);
        cy.get(this.contractdisplayed).should('be.visible').and('contain.text', `Contract #${searchText}`); //verify contract number is displayed.

        // Pass the test case once the page loading finishes
        // Cypress will wait for loading spinners or overlays to disappear before finishing the test
        cy.get('body').then($body => {
            if ($body.find('.spinner, .loading, .k-loading-mask, .k-loader').length > 0) {
                // Wait for any known loading indicators to disappear
                cy.get('.spinner, .loading, .k-loading-mask, .k-loader', { timeout: 10000 }).should('not.exist');
            }
            // Also wait for graph chart loading indicator to disappear if present
            if ($body.find('div.k-loading-image').length > 0) {
                cy.get('div.k-loading-image', { timeout: 10000 }).should('not.exist');
            }
        });
    }
}

export default SearchingFunctionality;