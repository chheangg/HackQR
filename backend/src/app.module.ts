import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirestoreModule } from './firestore/firestore.module';
import { MemberModule } from './member/member.module';
import { AttendanceModule } from './attendance/attendance.module';
import { FirebaseAdminModule } from '@alpha018/nestjs-firebase-auth';
import { ExtractJwt } from 'passport-jwt';
import * as fs from 'fs';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    FirestoreModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        keyFilename: configService.get<string>('SA_KEY'),
      }),
      inject: [ConfigService],
    }),
    FirebaseAdminModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        options: JSON.parse(fs
          .readFileSync(
            path.join(
              process.cwd(),
              configService.get<string>('SA_KEY')
            )
          ).toString()
        ), // Optionally, provide Firebase configuration here
        auth: {
          config: {
            extractor: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the header
            checkRevoked: true, // Optionally check if the token is revoked
            validateRole: true, // Enable role validation if needed
          },
        },
      }),
      inject: [ConfigService],
    }),
    MemberModule,
    AttendanceModule,
  ],
})
export class AppModule {}
