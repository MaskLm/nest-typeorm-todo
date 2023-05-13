import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class SearchTodoDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  done?: boolean;

  @IsOptional()
  @IsDateString()
  deadlineStart?: Date;

  @IsOptional()
  @IsDateString()
  deadlineEnd?: Date;

  @IsOptional()
  @IsDateString()
  createdAtStart?: Date;

  @IsOptional()
  @IsDateString()
  createdAtEnd?: Date;

  @IsOptional()
  @IsDateString()
  updatedAtStart?: Date;

  @IsOptional()
  @IsDateString()
  updatedAtEnd?: Date;
}
