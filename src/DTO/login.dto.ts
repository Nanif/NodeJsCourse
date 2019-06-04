import {userDto} from './user.dto.js';


export class loginDto {
    user: userDto;

    constructor(user) {
        this.user = user;
    }
}


