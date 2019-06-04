export class userDto {
    password: string;
    name: string;
    email: string;

    constructor(pwd, name, email) {
        this.password = pwd;
        this.name = name;
        this.email = email;
    }
}


