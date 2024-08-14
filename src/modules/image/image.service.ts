import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FirebaseService } from '../firebase/firebase.service';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  FirebaseStorage,
  deleteObject,
} from 'firebase/storage';
import { User } from '@prisma/client';
import { AuthenUser } from '../auth/dto/authen-user.dto';
import { apiFailed, apiGeneral } from 'src/common/dto/api-response';
import { ApiResponse } from 'src/common/dto/response.dto';
import e from 'express';

@Injectable()
export class ImageService {
  // async addAvatarToFirebase(file: Express.Multer.File, id: string) {
  //   if (file.mimetype !== 'image/jpeg') {
  //     throw new BadRequestException('Only JPEG images are allowed');
  //   }

  //   const filename = `${Date.now()}-${file.originalname}`;
  //   const storageRef = ref(this.storage, `images/users/${id}/${filename}`);

  //   try {
  //     const snapshot = await uploadBytes(storageRef, file.buffer, {
  //       contentType: file.mimetype,
  //     });

  //     return snapshot.metadata.name;
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //     throw error;
  //   }
  // }

  async addImageToFirebase(
    file: Express.Multer.File,
    id: string,
    pathInput: string,
  ) {
    if (file.mimetype !== 'image/jpeg') {
      throw new BadRequestException('Only JPEG images are allowed');
    }
    const path = `images/${pathInput}/${id}`;
    const filename = `${Date.now()}-${file.originalname}`;
    const storageRef = ref(this.storage, `${path}/${filename}`);
    try {
      const snapshot = await uploadBytes(storageRef, file.buffer, {
        contentType: file.mimetype,
      });
      return snapshot.metadata.name;
    } catch (error) {
      console.error('Error uploading file:', error);
      return error;
    }
  }

  //Use when add array of Image
  async handleArrayImages(
    files: Express.Multer.File[],
    id,
    path,
  ): Promise<ApiResponse> {
    try {
      //Upload and get all image promise
      const uploadPromises = files.map((file: Express.Multer.File, index) => {
        return this.addImageToFirebase(file, id, path)
          .then((result) => ({
            status: 'fulfilled' as const,
            value: result,
            file,
          }))
          .catch((error) => {
            return {
              status: 'rejected' as const,
              reason: error.message,
              file: file.originalname,
              index,
            };
          });
      });

      //Handle all Promise
      const results = await Promise.allSettled(uploadPromises);

      //successful and failed array data
      const successful: string[] = [];
      const failed: { filename: string; index: number; error: string }[] = [];

      //Filter status and map message
      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          if (result.value.status === 'fulfilled') {
            successful.push(result.value.value);
          } else {
            failed.push({
              filename: result.value.file,
              index: result.value.index,
              error: result.value.reason,
            });
          }
        } else {
          failed.push({ filename: 'Unknown', index: 0, error: result.reason });
        }
      });
      let statusCode = 200;
      console.log(failed.length);
      console.log(successful.length);
      //Handle status code base on number of success or failed
      if (failed.length > 0 && successful.length <= 0) {
        statusCode = 400;
      } else if (failed.length > 0 && successful.length > 0) {
        statusCode = 207;
      } else if (failed.length <= 0 && successful.length > 0) {
        statusCode = 200;
      } else {
        statusCode = 400;
      }

      return apiGeneral(statusCode, successful, 'Upload image finish', failed);
    } catch (error) {
      return apiFailed(500, 'Upload image failed', error);
    }
  }

  async deleteImage(filePath: string) {
    const storageRef = ref(this.storage, filePath);
    try {
      await deleteObject(storageRef);
      console.log('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  private storage;
  constructor(private firebaseService: FirebaseService) {
    this.storage = getStorage();
  }

  async addAvatar(file: Express.Multer.File, user: AuthenUser) {
    if (file.mimetype !== 'image/jpeg') {
      throw new BadRequestException('Only JPEG images are allowed');
    }

    //Get the user

    const filename = `${Date.now()}-${file.originalname}`;
    const storageRef = ref(this.storage, `images/users/${user.id}/${filename}`);
    try {
      const snapshot = await uploadBytes(storageRef, file.buffer, {
        contentType: file.mimetype,
      });

      // Create and return an Image object
      const image = {
        id: snapshot.metadata.name,
        filename: filename,
        createdAt: new Date(),
      };

      return image;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  async createImage(file: Express.Multer.File) {
    // Check if the file is a JPEG image
    if (file.mimetype !== 'image/jpeg') {
      throw new BadRequestException('Only JPEG images are allowed');
    }

    const filename = `${Date.now()}-${file.originalname}`;
    const storageRef = ref(this.storage, `images/${filename}`);

    try {
      const snapshot = await uploadBytes(storageRef, file.buffer, {
        contentType: file.mimetype,
      });
      console.log('Uploaded a JPEG image!');

      // Create and return an Image object
      const image = {
        id: snapshot.metadata.name,
        filename: filename,
        createdAt: new Date(),
      };

      return image;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  async getImages() {
    const storageRef = ref(
      this.storage,
      `images/1722837247336-4d7a6fa6fabd931a57161c7b1bb8f725.jpg`,
    );
    const result = await getDownloadURL(storageRef);
    return result;
  }
  findAll() {
    return `This action returns all image`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
