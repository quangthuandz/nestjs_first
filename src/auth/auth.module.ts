import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-strategy.guard';

@Module({
  imports: [UsersModule,PassportModule,JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '3600s' },
  }),],
  providers: [AuthService,LocalStrategy,JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },],
  controllers: [AuthController],
})
export class AuthModule {}
