import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { FilesModule } from 'src/files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/roles/roles.entity';
import { UserToRole } from 'src/roles/user-roles.entity';
import { UserEntity } from 'src/users/user.entity';
import { PostEntity } from './posts.entity';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, UserToRole, PostEntity ]),
      FilesModule
  ]
})
export class PostsModule {}
