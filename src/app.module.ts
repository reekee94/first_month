import {Module} from "@nestjs/common";
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { FilesModule } from './files/files.module';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from "./users/user.entity";
import { RoleEntity } from "./roles/roles.entity";
import { PostEntity } from "./posts/posts.entity";
import { UserToRole } from "./roles/user-roles.entity";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env`
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
          entities: [UserEntity, RoleEntity, PostEntity, UserToRole],
          //migrations: ['src/migrations/*{.ts,.js}'],
          cli: {
            migrationsDir: 'src/migrations'
          },
          synchronize: false
        }),
      UsersModule,
      RolesModule,
      AuthModule,
      PostsModule,
      FilesModule,
    ]
})

export class AppModule {}