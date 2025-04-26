import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReviewService } from './review.service';
import { Review } from './models/review';
import { CreateReviewInput } from './dto/input/create-review.input';
import { UpdateReviewInput } from './dto/input/update-review.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Resolver(() => Review)
export class ReviewResolver {
    constructor(
        private reviewService: ReviewService
    ) {}

    @Query(() => [Review])
    async getAllReviews(): Promise<Review[]> {
        return this.reviewService.getAllReviews();      
    }

    @Query(() => [Review])
    async getReviewsByUserId(@Args('userId') userId: number): Promise<Review[]> {
        return this.reviewService.getReviewByUserId(userId);
    }

    @Query(() => [Review])
    async getReviewByProductId(@Args('productId') productId: number): Promise<Review[]> {
        return this.reviewService.getReviewByProductId(productId);
    }

    @Mutation(() => Review)
    async addReview(
        @Args('createReviewDto') createReviewDto: CreateReviewInput
    ): Promise<Review> {
        return this.reviewService.addReview(createReviewDto);
    }

    @Mutation(() => Review)
    async updateReview(@Args('updateReviewDto') updateReviewDto: UpdateReviewInput) {
        return this.reviewService.updateReview(updateReviewDto);
    }

    @Mutation(() => Review)
    async deleteReview(@Args('reviewId') reviewId: number): Promise<Review> {
        return this.reviewService.deleteReview(reviewId);
    }
}
