import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './models/review';
import { Repository } from 'typeorm';
import { CreateReviewInput } from './dto/input/create-review.input';
import { UpdateReviewInput } from './dto/input/update-review.input';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review) 
        private reviewRepo: Repository<Review>
    ) {}

    async getAllReviews(): Promise<Review[]> {
        const reviews: Review[] | null = await this.reviewRepo.find();

        if(reviews.length === 0) {
            throw new NotFoundException(`no reviews`);
        }
        return reviews;
    }

    async getReviewByUserId(userId: number): Promise<Review[]> {
        const reviews: Review[] | null = await this.reviewRepo.findBy({ userId });
        
        if(reviews.length === 0) {
            throw new NotFoundException(`No reviews for this user`);
        }

        return reviews;
    }

    async getReviewByProductId(productId: number): Promise<Review[]> {
        const reviews: Review[] | null = await this.reviewRepo.findBy({ productId });
        
        if(reviews.length === 0) {
            throw new NotFoundException(`No reviews for this product`);
        }

        return reviews;
    }

    async addReview(createReviewDto: CreateReviewInput): Promise<Review> {
        const review: Review =  this.reviewRepo.create(createReviewDto);
        return this.reviewRepo.save(review);
    }

    async updateReview(updateReviewDto: UpdateReviewInput): Promise<Review> {
        const oldReview = await this.reviewRepo.findOneBy({id: updateReviewDto.id});

        if(!oldReview) {
            throw new NotFoundException('review not found');
        }

        Object.assign(oldReview, updateReviewDto)

        return this.reviewRepo.save(oldReview);
    }

    async deleteReview(reviewId: number): Promise<Review> {
        const review: Review | null = await this.reviewRepo.findOneBy({ id: reviewId });

        if(!review) {
            throw new NotFoundException('review not found')
        }

        await this.reviewRepo.delete(review);

        return review;
    }
} 
