import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @IsPublic()
  create(@Body() createUserDto: CreateUserDto) {
    console.log('passei aq');
    return this.userService.create(createUserDto);
  }
}
