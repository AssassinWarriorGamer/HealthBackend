/* eslint-disable prettier/prettier */
import { IsString, IsEmail, MinLength, Matches, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'Username must be at least 2 characters long' })
  public username: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  public email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  public password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Confirm password must be at least 8 characters long' })
  public confirmPassword: string;

  // Custom validation rule for matching password and confirmPassword
  @Matches(/^.*$/, { message: 'Passwords do not match' })
  public confirmPasswordMatches: string;
}