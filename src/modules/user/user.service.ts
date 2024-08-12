import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '@prisma/client';
import { AuthenUser } from '../auth/dto/authen-user.dto';
import { ImageService } from '../image/image.service';
import { apiFailed, apiSuccess } from 'src/common/dto/api-response';

@Injectable()
export class UserService {
  async addAvatar(file: Express.Multer.File, userInput: AuthenUser) {
    try {
      //Get the user
      const user: User = await this.findOneByUserId(userInput.id);

      const imageUrl = await this.imageService.addAvatarToFirebase(
        file,
        user.id,
      );
      if (!imageUrl) {
        return apiFailed(404, 'Upload avatar failed');
      }

      //Delete the current image
      if (user.avatar_url !== null) {
        const filePath = `images/users/${user.id}/${user.avatar_url}`;
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
          avatar_url: imageUrl,
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
}
