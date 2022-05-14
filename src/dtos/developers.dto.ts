import { Sex } from '@prisma/client';
import { IsString, IsInt, IsEnum, IsDateString } from 'class-validator';

export class CreateDeveloperDto {
  @IsString()
  public name: string;
  @IsString()
  public hobby: string;
  @IsInt()
  public age: number;
  @IsEnum(Sex)
  public sex: Sex;
  @IsDateString()
  public birthdate: Date;
}
