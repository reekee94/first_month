import {Module} from "@nestjs/common";
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { FilesModule } from './files/files.module';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/users.model";
import { Role } from "./roles/roles.model";
import { Post } from "./posts/posts.model";
//import { UserRoles } from "./roles/user-roles.model";
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from "./users/user.entity";
import { RoleEntity } from "./roles/roles.entity";
import { PostEntity } from "./posts/posts.entity";
import { UserRoles } from "./roles/user-roles.model";
import { UserToRole } from "./roles/user-roles.entity";
import { UsersModuleSeq } from "./usersSeq/users.module";
import { RolesModuleSeq } from "./rolesSeq/roles.module";
import { PostsModuleSeq } from "./postsSeq/posts.module";


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env`//.${process.env.NODE_ENV}.env
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
          }),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRESS_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRESS_PASSWORD,
          database: process.env.POSTGRES_DB,
          entities: [UserEntity, RoleEntity, PostEntity, UserRoles, UserToRole],
          //migrations: ['src/migrations/*{.ts,.js}'],
          cli: {
            migrationsDir: 'src/migrations'
          },
          synchronize: false
        }),
      //   SequelizeModule.forRoot({
      //   dialect: 'postgres',
      //   host: process.env.POSTGRES_HOST,
      //   port: Number(4543),
      //   username: process.env.POSTGRES_USER,
      //   password: process.env.POSTGRESS_PASSWORD,
      //   database: 'test2',
      //   models: [User, Role, UserRoles, Post],
      //   //autoLoadModels: true
      // }),
      UsersModule,
      RolesModule,
      AuthModule,
      PostsModule,
      FilesModule,
      // UsersModuleSeq,
      // RolesModuleSeq,
      // PostsModuleSeq
    ]
})

export class AppModule {}