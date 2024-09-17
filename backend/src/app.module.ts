import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirestoreModule } from './firestore/firestore.module';
import { MemberModule } from './member/member.module';

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
    MemberModule,
  ],
})
export class AppModule {}
