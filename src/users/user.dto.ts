import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

//creamos el Dto para cada endpoint, perimitiendo hacer las validaciones automaticas apartir de los decoradores
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class updateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;
}
