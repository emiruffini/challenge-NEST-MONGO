import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Express, Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@ApiTags('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    createUserDto._id = uuidv4();
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiBearerAuth('access-token')
  async findAll(@Req() request: Request) {
    return this.userService.findAll(request);
  }
  //TODO implements pipe to check id param structure
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiBearerAuth('access-token')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiBearerAuth('access-token')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiBearerAuth('access-token')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/upload')
  @ApiBearerAuth('access-token')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPicture(
    //TODO add file validations
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.userService.uploadPicture(file, id);
  }
}
