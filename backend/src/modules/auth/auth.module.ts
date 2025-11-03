import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationService } from './auth.service';
import { LocalStrategy } from './strategies/local-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../user/entities/user.entity';
import { AuthenticationResolver } from './auth.resolver';

/* If we import JwtModule, we don't need to import JwtService */
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '4h' },
      }),
    }),
  ],
  providers: [
    AuthenticationService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    AuthenticationResolver,
  ],
  controllers: [],
})
export class AuthenticationModule {}
