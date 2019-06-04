import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import {userProviders} from "./DB/providers/user.providers";
import {DatabaseModule} from "./DB/database.module";


@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
})
export class AppModule {}
