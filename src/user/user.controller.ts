import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserTypeDto } from './dto/update-user-type.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { User } from 'src/database/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @IsPublic()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }
  @Get('search')
  async findByNamePrefix(@Query('name') name: string) {
    return this.userService.findByNamePrefix(name);
  }
  @Roles('admin')
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(+id);
  }
  @Get('/me')
  getMe(@CurrentUser() currentUser: User) {
    console.log('aaaaaaaaaaa');
    return currentUser;
  }

  @Put('/me')
  async updateMe(
    @CurrentUser() currentUser: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateMe(currentUser.id, updateUserDto);
  }
  @Patch(':id/type')
  async updateUserType(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserTypeDto,
  ) {
    return this.userService.updateUserType(id, dto.type);
  }
  @Post('reset-password')
  @IsPublic()
  async resetPassword(@Body() body: { email: string; senha: string }) {
    return this.userService.resetPasswordByEmail(body.email, body.senha);
  }
}
