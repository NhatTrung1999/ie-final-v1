import { Module } from '@nestjs/common';
import { StagelistService } from './stagelist.service';
import { StagelistController } from './stagelist.controller';
import { DatabaseModule } from 'src/database/database.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { CreateStagelistDto } from './dto/create-stagelist.dto';
import * as fs from 'fs';
import * as path from 'path';

@Module({
  imports: [
    DatabaseModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        storage: diskStorage({
          destination: (req, file, cb) => {
            const { date, season, stage, area, article } =
              req.body as CreateStagelistDto;
            const basePath = `${configService.get('UPLOAD_DESTINATION') || './uploads'}/${date}/${season}/${stage}/${area}/${article}`;
            if (!fs.existsSync(basePath)) {
              fs.mkdirSync(basePath, { recursive: true });
            }
            cb(null, basePath);
          },
          filename: (req, file, cb) => {
            const { date, season, stage, area, article } =
              req.body as CreateStagelistDto;
            const ext = path.extname(file.originalname);
            const baseName = path.basename(file.originalname, ext);
            const destination = `${configService.get('UPLOAD_DESTINATION') || './uploads'}/${date}/${season}/${stage}/${area}/${article}`;
            let finalName = file.originalname;
            let counter = 0;

            while (fs.existsSync(path.join(destination, finalName))) {
              counter++;
              finalName = `${baseName}(${counter})${ext}`;
            }
            cb(null, finalName);
          },
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [StagelistController],
  providers: [StagelistService],
})
export class StagelistModule {}
