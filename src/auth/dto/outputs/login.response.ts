import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/users/models/user';

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;
  
  @Field()
  refreshToken: string;

  @Field(() => User)
  user: User;
}
