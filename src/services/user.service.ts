import { Inject, Injectable} from '@nestjs/common';
import {loginDto} from "../DTO/login.dto";
import {User} from "../DB/entities/user.entity";
import {registerDto} from '../DTO/register.dto';
import {rejects} from "assert";
const bcrypt = require('bcryptjs')

@Injectable()
export class UserService {

    constructor(@Inject('USER_REPOSITORY') private readonly USER_REPOSITORY: typeof User) {
    }

    async register(user: registerDto): Promise<User> {
        let hashedPassword = '';

        await this.hashPassword(user.password).then((res) => {
            console.log(res);
            hashedPassword = res;
        })

        return await this.USER_REPOSITORY.create({
            name: user.name,
            email: user.email,
            password: hashedPassword
        });
    }

    async findAll(): Promise<User[]> {
        return await this.USER_REPOSITORY.findAll<User>();
    }

    async login(user): Promise<boolean> {
        console.log(user);
        const usr = await this.USER_REPOSITORY.findOne({
            attributes: ['password'],
            where: {
                email: user.email,
            }
        });

        return await this.comparePassword(user.password, usr.password)
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 8);
    }

    async comparePassword(loginPassword, currentPassword): Promise<boolean> {
        return await bcrypt.compare(loginPassword, currentPassword)
    }
}
