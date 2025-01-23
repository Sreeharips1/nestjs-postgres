import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './users/user.entity';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'host.docker.internal', // For Docker, change based on setup
      port: 5432,                  // Default PostgreSQL port
      username: 'root',            // Username for DB
      password: 'pass',            // Password for DB
      database: 'postgres',        // Database name
      entities: [User],            // User entity
      synchronize: true,           // Sync database automatically (use with caution)
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
