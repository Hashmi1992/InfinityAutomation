class LoginPage {
    usernameField = '#UserName';
    passwordField = '#Password';
    loginButton = '#btn-login';
    usernamedropdown = '#navbarAccount';
    usernamelabel = '#navbarTogglerMainmenu div.h5';
    customerinformationlabel = '#ContractTabs-1 h6.d-inline-block'
    remembermecheckbox = '#RememberMe';
    languagedropdown = '#dd-language-anony'
    signoutbutton = '#logoutForm button.btn'
    forgotpasswordbutton = 'a.btn-forgot-pwd'
    verifyforgotpasswordtitle = '#div-forgotpwd-popup_wnd_title'
    emailfield = '#txt-email-pwd'
    resetbutton = '#btn-reset'
    resetmessage = '#reset-message'
    forgotwindowcancelbutton = '#btn-forgotpwd-cancel'

    visiturl() {
        cy.clearCookies();
        cy.clearLocalStorage()
        cy.visit('/');
    }

    ValidateLanguageChange() {
        cy.get(this.languagedropdown).select('2');
        //page load
        cy.wait(3000)
        //check fields are in French
        cy.get(this.usernameField).should('have.attr', 'placeholder', 'Identifiant d\'utilisateur');
        cy.get(this.passwordField).should('have.attr', 'placeholder', 'Mot de Passe');
        cy.get(this.loginButton).should('contain.text', 'Connexion');


        //change back to English
        cy.get(this.languagedropdown).select('1');
        cy.wait(3000)
        //verify placeholders are back to English
        cy.get(this.usernameField).should('have.attr', 'placeholder', 'User ID');
        cy.get(this.passwordField).should('have.attr', 'placeholder', 'Password');
        cy.get(this.loginButton).should('contain.text', 'Sign In');
    }


    enterUsername(username) {
        cy.get(this.usernameField).should('be.visible').clear().type(username);
    }

    enterPassword(password) {
        cy.get(this.passwordField).should('be.visible').clear().type(password);
    }

    clickLogin() {
        cy.get(this.remembermecheckbox).check();
        cy.get(this.loginButton).should('be.visible').click();
    }

    login(username, password) {
        this.enterUsername(username);
        this.enterPassword(password);
        this.clickLogin();
    }

    verifyloggedInUser() {
        // open the user dropdown (if needed) then read the label text
        cy.get(this.usernamedropdown).should('be.visible').click();
        cy.get(this.usernamelabel)
            .invoke('text')
            .then((text) => {
                const loggedInUser = text.trim();
                // assert the displayed username matches the expected static value
                expect(loggedInUser).to.equal('APAKX APAK');
            })
            .then(() => {
                // click the dropdown again to close it
                cy.get(this.usernamedropdown).click();
            });
    }

    verifydashboardVisible() {
        // Wait for a heading containing 'Customer Information' (case-insensitive)
        cy.contains('h1, h2, h3, h4, h5, h6', /customer information/i, { timeout: 30000 })
            .should('be.visible')
            .then(() => cy.log('Dashboard is displayed'));
    }

    Signout() {
        cy.get(this.usernamedropdown).should('be.visible').click();
        cy.contains('Sign Out').should('be.visible').click();
        // Verify that the login button is visible again after logout
        cy.get(this.loginButton).should('be.visible');
    }

    verifyUsernameAfterLogout() {
        //username should be apak in username field after logout
        cy.get(this.usernameField).should('have.value', 'apak');
    }

    verifyforgotpasswordfunctionality() {
        cy.get(this.forgotpasswordbutton)
            .should('be.visible')
            .click();

        cy.get(this.verifyforgotpasswordtitle)
            .should('be.visible')
            .and('have.text', 'Forgot Password');

        cy.get(this.emailfield)
            .should('be.visible')
            .clear()
            .type('asad.hashmi@constellationfs.com', { delay: 50, force: true })
            .should('have.value', 'asad.hashmi@constellationfs.com');


        cy.get(this.resetbutton)
            .should('be.visible')
            .click();

        cy.get(this.resetmessage)
            .should('be.visible')
            .and('contain.text', 'Your request has been received'); // avoids exact match issue

        cy.get(this.forgotwindowcancelbutton)
            .should('have.text', 'Cancel')
            .click();
    }

}
export default LoginPage;