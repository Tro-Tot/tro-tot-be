import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UpdateImageDto } from './dto/update-image.dto';
import { FirebaseService } from '../firebase/firebase.service';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { AuthenUser } from '../auth/dto/authen-user.dto';
import { apiFailed, apiGeneral } from 'src/common/dto/api-response';
import { ApiResponse } from 'src/common/dto/response.dto';

export interface ImageResponse {
  successful: Array<{
    fileName: string;
    index: number;
  }>;
  failed: Array<{
    fileName: string;
    index: number;
    error: any;
  }>;
}

@Injectable()
export class ImageService {
  async addImageToFirebase(
    file: Express.Multer.File,
    id: string,
    pathInput: string,
  ): Promise<string> {
    if (file.mimetype !== 'image/jpeg') {
      throw new HttpException(
        'Only JPEG images are allowed.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Check if the file size is greater than or equal to 10 MB (10 * 1024 * 1024 bytes)
    if (file.size >= 10 * 1024 * 1024) {
      throw new HttpException(
        'File size exceeds the 5 MB limit.',
        HttpStatus.PAYLOAD_TOO_LARGE,
      );
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
            index,
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
      const successful: { fileName: string; index: number }[] = [];
      const failed: { fileName: string; index: number; error: string }[] = [];

      //Filter status and map message
      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          if (result.value.status === 'fulfilled') {
            successful.push({
              fileName: result.value.value,
              index: result.value.index,
            });
          } else {
            failed.push({
              fileName: result.value.file,
              index: result.value.index,
              error: result.value.reason,
            });
          }
        } else {
          failed.push({ fileName: 'Unknown', index: 0, error: result.reason });
        }
      });
      let statusCode = 200;
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

  //Use this when you dont need ApiResponse, this will return array of successful and failed upload images
  async handleArrayImagesWithoutApiResponse(
    files: Express.Multer.File[],
    id,
    path,
  ): Promise<ImageResponse> {
    try {
      //Upload and get all image promise
      const uploadPromises = files.map((file: Express.Multer.File, index) => {
        return this.addImageToFirebase(file, id, path)
          .then((result) => ({
            status: 'fulfilled' as const,
            value: result,
            index,
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
      const successful: { fileName: string; index: number }[] = [];
      const failed: { fileName: string; index: number; error: string }[] = [];

      //Filter status and map message
      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          if (result.value.status === 'fulfilled') {
            successful.push({
              fileName: result.value.value,
              index: result.value.index,
            });
          } else {
            failed.push({
              fileName: result.value.file,
              index: result.value.index,
              error: result.value.reason,
            });
          }
        } else {
          failed.push({ fileName: 'Unknown', index: 0, error: result.reason });
        }
      });

      const imageResponse: ImageResponse = {
        successful: successful.map(({ fileName, index }) => ({
          fileName,
          index,
        })),
        failed: failed.map(({ fileName, index, error }) => ({
          fileName,
          index,
          error,
        })),
      };

      return imageResponse;
    } catch (error) {
      return error;
    }
  }

  async deleteImage(filePath: string) {
    const storageRef = ref(this.storage, filePath);
    try {
      await deleteObject(storageRef);
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

  async getImageWithPathAndImageName(
    id: string,
    fileName: string,
    pathInput: string,
  ) {
    const path = `images/${pathInput}/${id}/${fileName}`;
    console.log(path);
    const storageRef = ref(this.storage, `${path}`);
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
