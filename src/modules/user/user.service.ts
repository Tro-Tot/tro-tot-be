import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '@prisma/client';
import { AuthenUser } from '../auth/dto/authen-user.dto';
import { ImageService } from '../image/image.service';
import { apiFailed, apiSuccess, apiGeneral } from 'src/common/dto/api-response';
import { ApiResponse } from 'src/common/dto/response.dto';
import { PathConstants } from 'src/common/constant/path.constant';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly imageService: ImageService,
  ) {}

  async addAvatar(file: Express.Multer.File, userInput: AuthenUser) {
    try {
      //Get the user
      const user: User = await this.findOneByUserId(userInput.id);

      const imageUrl = await this.imageService.addImageToFirebase(
        file,
        user.id,
        PathConstants.USER_PATH,
      );
      if (!imageUrl) {
        return apiFailed(404, 'Upload avatar failed');
      }

      //Delete the current image in firebase
      if (user.avatarUrl !== null) {
        try {
          await this.imageService.deleteImage(
            user.id,
            user.avatarUrl,
            PathConstants.USER_PATH,
          );
        } catch (error) {
          console.error('Error deleting image:', error);
          // Continue execution even if there is an error
        }
      }

      //Update avatar url
      const newUser = await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          avatarUrl: imageUrl,
        },
      });

      return apiSuccess(200, newUser, 'Update avatar successfully');
    } catch (error) {
      throw error;
    }
  }

  findOneByUserId(userId: string) {
    return this.prisma.user.findFirstOrThrow({
      where: {
        id: userId,
      },
      include: {
        landLords: true,
        managers: true,
        renters: true,
        staffs: true,
        role: true,
      },
    });
  }

  findOneByUserName(usernameInput: string) {
    return this.prisma.user.findFirstOrThrow({
      where: {
        username: usernameInput,
      },
      include: {
        role: true,
      },
    });
  }

  async validateUser(username: string, password: string) {
    return await this.prisma.user.findFirst({
      where: {
        AND: [
          {
            username: username,
            password: password,
          },
        ],
      },
    });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async updatePassword(id: string, newPassword: string) {
    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: newPassword,
      },
    });
  }
}
