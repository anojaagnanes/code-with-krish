import { IsString, IsEmail, IsOptional, IsInt } from 'class-validator';

export class CreateDispatcherDto {
  @IsString()
  name: string;

  @IsInt()
  vechileNumber: number;

  @IsString()
  release: string;

  @IsOptional()
  @IsString()
  city?: string;
}
