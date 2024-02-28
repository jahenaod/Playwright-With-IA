import { Locator, Page } from "@playwright/test"

export class LoginPage {

    private readonly usernameTextBox: Locator
    private readonly passwordTextBox: Locator
    private readonly loginButton: Locator

    constructor(page: Page){
        this.usernameTextBox = page.getByRole('textbox', { name: 'Username' })
        this.passwordTextBox = page.getByRole('textbox', { name: "Password" })
        this.loginButton = page.getByRole('button', { name: 'Login' })
    }

    async fillUsername(username:string){
        await this.usernameTextBox.fill(username)
    }

    async fillPassword(password:string){
        await this.passwordTextBox.fill(password)
    }

    async clickLogin(){
        await this.loginButton.click()
    }

    async loginWithCredentials(username:string, password:string){
        await this.fillUsername(username)
        await this.fillPassword(password)
        await this.clickLogin()
    }

}