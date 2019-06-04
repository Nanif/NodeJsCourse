import {UserService} from '../services/user.service';
import {loginDto} from "../DTO/login.dto";
import {Controller, Get, Post, Res, HttpStatus, Body, Query} from '@nestjs/common';
import {Response} from 'express';
import {registerDto} from '../DTO/register.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    login(@Query() request, @Res() res: Response): Response {
        try {
            this.userService.login(request).then((result) => {
                if (result) {
                    return res.status(HttpStatus.OK).send({user: 'user'})
                } else {
                    return res.status(HttpStatus.BAD_REQUEST).send('something went wrong, try again!')
                }
            });


        } catch (e) {
            return res.status(HttpStatus.BAD_REQUEST).send('failed')
        }
    }

    @Post()
    register(@Query() registerUser: registerDto, @Res() res: Response): any {


        try {
            const user = this.userService.register(registerUser).then(() => {
                if (!user) {
                    return res.status(HttpStatus.BAD_REQUEST).send({error: 'Could not create user'})
                }
                return res.status(HttpStatus.CREATED).send({user: user})
            })
        } catch (e) {
            return res.status(HttpStatus.BAD_REQUEST).send({error: 'Something went wrong, please try again!'})
        }
    }
}
