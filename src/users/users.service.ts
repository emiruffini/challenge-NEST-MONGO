import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Model } from 'mongoose';
import { Request } from 'express';
import * as FormData from 'form-data';
import { HttpService } from '@nestjs/axios';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly httpService: HttpService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  async findAll(request: Request): Promise<User[]> {
    return this.userModel
      .find(request.query)
      .setOptions({ sanitizeFilter: true })
      .exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findOneAndUpdate({ _id: id }, updateUserDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.userModel.findByIdAndRemove({ _id: id }).exec();
  }

  async uploadPicture(
    picture: Express.Multer.File,
    userId: string,
  ): Promise<any> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw 'User not found';
    }
    const formData = new FormData();
    formData.append('image', picture.buffer.toString('base64'));
    const { data: imageData } = await firstValueFrom(
      this.httpService
        .post(
          `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.IMG_API_KEY}`,
          formData,
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw error;
          }),
        ),
    );
    user.updateOne({ picture: imageData.data.url }).exec();
    return imageData;
  }
}
