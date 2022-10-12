import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { mkdir, rm, rmdir, writeFile } from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { resolve } from 'path';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>,
  ) {}

  createFile(directoryPath: string, file: Express.Multer.File) {
    console.log('directoryPath: ', directoryPath);

    this.createDirectory(directoryPath);
    const { fileName, filePath } = this.saveFile(directoryPath, file);
    return this.imagesRepository.create({ path: filePath, name: fileName });
  }

  createDirectory(directoryPath: string) {
    mkdir(directoryPath, { recursive: true }, (err) => {
      if (err) {
        throw new HttpException(
          "Couldn't create directory",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    });
  }

  async deleteFileByName(name: string) {
    const file = await this.imagesRepository.findOne({ where: { name } });
    rm(file.path, (err) => {
      if (err) {
        throw new HttpException(
          "Couldn't delete file",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    });
    return await this.imagesRepository.remove(file);
  }

  saveFile(directoryPath: string, file: Express.Multer.File) {
    const fileName = uuidv4();
    const fileExtention = file.originalname.split('.').pop();
    const filePath = resolve(directoryPath, `${fileName}.${fileExtention}`);

    writeFile(filePath, file.buffer, (err) => {
      if (err) {
        throw new HttpException(
          "Couldn't write file",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    });
    return { fileName, filePath };
  }

  deleteFolderWithFiles(filePath: string) {
    rm(filePath, { recursive: true, force: true }, (err) => {
      if (err) {
        throw new HttpException(
          "Couldn't delete file",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    });
  }

  deleteFolder(folderPath: string) {
    rmdir(folderPath, (err) => {
      if (err) {
        throw new HttpException(
          "Couldn't delete directory",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    });
  }
}
