import { Controller, Post, Body, UploadedFile, UseInterceptors, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';
import { Response } from 'express'
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreatePostDto,
        @UploadedFile() image) {
        return this.postService.create(dto, image)
    }

    @Get(':id')
    async getDatabaseFileById(@Param('id') id: number, @Res({ passthrough: true }) response: Response) {
      const post = await this.postService.getPostById(id);
   
      const stream = Readable.from(post.imageData);
   
      response.set({
        'Content-Disposition': `inline; filename="${post.image}"`,
        'Content-Type': 'image/application/json'
      })
      //const img = new StreamableFile(stream)
   
      return { post };
    }

}
