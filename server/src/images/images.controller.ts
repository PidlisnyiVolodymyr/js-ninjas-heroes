import { ImagesService } from './images.service';
import {
  Controller,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express/multer';

@Controller('images')
export class ImagesController {
  constructor(private readonly imageService: ImagesService) {}
}
