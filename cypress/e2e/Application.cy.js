// << ---------------All Imports here------------------------>> 
import LoginPage from './pages/OM_login.js';

// << ---------------Constructors here------------------------>>
const loginPage = new LoginPage();

// << ---------------Test Suite------------------------>>
describe('Infinity Application', () => {
    //User visits URL, checks language change, logs in, verifies dashboard, 
    // signs out, and finally checks if the username persists after logout.

    beforeEach(() => {
        cy.viewport(1745, 850); // Set consistent screen resolution before each test
    });

    // << ----------- 1. Visit URL -------------------------->>
    describe('TS01: Visit Application URL', () => {
        it('TC1.1: Login page should be opened successfully', () => {
            loginPage.visiturl();
        });
    });

    // << ----------- 2. Validate Language Dropdown Change -------------->>
    describe('TS02: Language Change Validation', () => {
        it('TC2.1: Change language to French and back to English', () => {
            loginPage.ValidateLanguageChange();
        });
    });

    // << ----------- 3. Login and Validate Dashboard -------------->>
    describe('TS03: Login and Verify Dashboard', () => {
        it('TC3.1 Login with Valid Credentials and check remember me box', () => {
            loginPage.login('apak', 'apak');
        })
        it('TC3.2 Verify logged in user', () => {
            loginPage.verifyloggedInUser();
        })
        it('TC3.3 Verify Dashboard visibility', () => {
            loginPage.verifydashboardVisible();
        });
    });

    // << ----------- 4. Signout and Validate Logout State -------------->>
    describe('TS04: Sign out and Verify User is Logged Out', () => {
        it('TC4.1 Verify perfect signout', () => {
            loginPage.Signout();
        })
        it('TC4.2 Verify Username Availability', () => {
            loginPage.verifyUsernameAfterLogout();
        });
    });
// << ----------- Forgot Password Functionality -------------------------->>
    //only ensuring that when forgot password is clicked, reset password window appears, 
    // user enters email, and clicks reset button, and confirming a REQUEST RECEIVED message appears.
    describe('TS05: Verify forgot password functionality', () => {
        it('TC5.1 Verify Forgot Password functionality', () => {
            loginPage.verifyforgotpasswordfunctionality();
        })
    });
});