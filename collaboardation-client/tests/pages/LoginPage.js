export class LoginPage {
    constructor(page){
        this.page = page
        this.emailInput = this.page.getByLabel("Email")
        this.passwordInput = this.page.getByLabel("Password")
        this.submitButton = this.page.getByRole("button", {name: "Log In"})
    }

    async goto() {
        await this.page.goto("/login")
    }

    async fillEmail(email) {
        await this.emailInput.fill(email)
    }

    async fillPassword(password) {
        await this.passwordInput.fill(password)
    }

    async submit() {
        await this.submitButton.click()
    }

    async login(email, password) {
        await this.fillEmail(email)
        await this.fillPassword(password)
        await this.submit()
    }
}