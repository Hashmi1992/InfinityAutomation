class ContractDataPage {
    // << --------------- Elements (Locators) Section -------------------------->>
    contractdatalink = 'span.k-link:contains("Contract Data") a[data-section="CONTRACTDATA"]';
    contractDetailsTitle = 'h5.k-card-title';
    contractSearchInput = 'input[name="AutoCompleteContracts_input"]';

    // << --------------- Methods Section -------------------------->>
    // Click on Contract Data Link
    clickContractDataLink() {
        cy.get(this.contractdatalink).should('be.visible').and('contain.text', 'Contract Data').click();
    }
    // Verify Contract Details Section is Visible
    verifyContractDetailsVisible() {
        cy.get(this.contractDetailsTitle).should('be.visible').and('contain.text', 'Contract Details');
    }

    // Search for Contract
    searchContract(searchText) {
        cy.get(this.contractSearchInput).should('be.visible').clear().type(searchText);
    }

}

export default ContractDataPage;