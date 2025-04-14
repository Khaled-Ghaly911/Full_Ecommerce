# ------------------------------------------------------
# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
# ------------------------------------------------------

type User {
  id: Int!
  name: String!
  email: String!
  password: String!
  admin: Boolean
  verified: Boolean
}

type LoginResponse {
  accessToken: String!
  refreshToken: String!
  user: User!
}

type Query {
  getUser(userId: Float!): User
  getUsers: [User!]
}

type Mutation {
  createUser(createUserData: CreateUserInput!): User!
  updateUser(updateUserData: UpdateUserInput!): User!
  deleteUser(deleteUserData: DeleteUserInput!): User!
  signUp(signupData: SignupUserDto!): User!
  verifyUser(email: String!, otp: String!): User!
  login(loginUserData: LoginUserDto!): LoginResponse!
  refreshToken: String!
  requestResetPasswordOtp(email: String!): String!
  resetPassword(email: String!, newPassword: String!, otp: String!): User!
  requestOtpAgain(email: String!): String!
}

input CreateUserInput {
  name: String!
  email: String!
  password: String!
}

input UpdateUserInput {
  userId: String!
  name: String!
  password: String!
  admin: Boolean!
  verified: Boolean!
}

input DeleteUserInput {
  userId: Float!
}

input SignupUserDto {
  name: String!
  email: String!
  password: String!
}

input LoginUserDto {
  email: String!
  password: String!
}