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

      //Delete the current image
      if (user.avatarUrl !== null) {
        const filePath = `images/${PathConstants.USER_PATH}/${user.id}/${user.avatarUrl}`;
        try {
          await this.imageService.deleteImage(filePath);
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
  constructor(
    private prisma: PrismaService,
    private readonly imageService: ImageService,
  ) {}

  async addAvatars(files: Express.Multer.File[], userInput: AuthenUser) {
    if (files.length <= 0) {
      return apiFailed(400, 'No images found');
    }
    return this.imageService.handleArrayImages(
      files,
      userInput,
      PathConstants.USER_PATH,
    );
  }

  findOneByUserId(userId: string) {
    return this.prisma.user.findFirstOrThrow({
      where: {
        id: userId,
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
