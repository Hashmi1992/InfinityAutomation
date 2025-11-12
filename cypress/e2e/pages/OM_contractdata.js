class ContractDataPage {
    // << --------------- Elements (Locators) Section -------------------------->>
    
    contractDetailsTitle = 'h5.k-card-title';
    

    // << --------------- Methods Section -------------------------->>
    // Click on Contract Data Link - Click the visible span containing "Contract Data"
    clickContractDataLink() {
        cy.contains('span.k-link', 'Contract Data').should('be.visible').click();
    }
    
    // Verify Contract Details Section is Visible
    verifyContractDetailsVisible() {
        cy.get(this.contractDetailsTitle).should('be.visible').and('contain.text', 'Contract Details');
    }
}

export default ContractDataPage;