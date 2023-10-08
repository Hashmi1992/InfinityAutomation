export class LoginPage{


    username_textbox = '#UserName'
    loginpage_password =  '#Password'
    loginpage_signin_button = '#btn-login'

enterUsername(username){
   
    cy.get(this.username_textbox).should('be.visible').clear().type(username)

}
enterPassword(password){

    cy.get(this.loginpage_password).should('be.visible').clear().type(password)

}
Signin(){

    cy.get(this.loginpage_signin_button).should('be.visible').click() //signin button click


}

}