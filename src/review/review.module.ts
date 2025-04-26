import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewResolver } from './review.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './models/review';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Review]),
        JwtModule,
        AuthModule
    ],
    providers: [ReviewService, ReviewResolver],
    exports: [ReviewService, ReviewResolver]
})
export class ReviewModule {}
