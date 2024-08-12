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

@Injectable()
export class ImageService {
  async addAvatarToFirebase(file: Express.Multer.File, id: string) {
    if (file.mimetype !== 'image/jpeg') {
      throw new BadRequestException('Only JPEG images are allowed');
    }

    const filename = `${Date.now()}-${file.originalname}`;
    const storageRef = ref(this.storage, `images/users/${id}/${filename}`);

    try {
      const snapshot = await uploadBytes(storageRef, file.buffer, {
        contentType: file.mimetype,
      });

      return snapshot.metadata.name;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
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
