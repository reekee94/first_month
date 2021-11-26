import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize'
import { FilesService } from 'src/files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
// import { Post } from './posts.model';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '../roles/roles.entity';
import { Repository } from 'typeorm';
import { PostEntity } from './posts.entity';

@Injectable()
export class PostsService {

    constructor(@InjectRepository(PostEntity) private postRepository: Repository<PostEntity>,
        private fileService: FilesService) {}

    // async create(dto: CreatePostDto, image: any) {
    //     const fileName = await this.fileService.createFile(image)
    //     const post = await this.postRepository.create({...dto, image: fileName})
    //     await this.postRepository.save(post)
    //     return post
    // }

    async create(dto: CreatePostDto, image: any) {
        const post = await this.postRepository.create({...dto, image: image.originalname})
        post.imageData = image.buffer
        console.log(image)
        await this.postRepository.save(post)
        return post
    }

    async getPostById(postId: number) {
        const post = await this.postRepository.findOne(postId);
        if (!post) {
          throw new HttpException('User with this email allready exists', HttpStatus.NOT_FOUND)
        }
        return post;
      }
}
