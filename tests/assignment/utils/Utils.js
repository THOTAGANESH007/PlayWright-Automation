export default class Utils {

    constructor(apiContext, user) {
        this.apiContext = apiContext;
        this.user = user;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: {
                    userEmail: this.user.username,
                    userPassword: this.user.password
                }
            })
        console.log(`Status Code: ${loginResponse.status()}`);

        const loginResponseJson = await loginResponse.json();
        if (loginResponse.status() !== 200) {
            throw new Error(`Login failed with status ${loginResponse.status()}. Check console for response body.`);
        }


        const token = loginResponseJson.token;
        // console.log(token);
        return token;
    }
}
