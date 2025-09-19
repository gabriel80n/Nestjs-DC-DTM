import { IsString, IsIn, IsOptional, IsBoolean } from 'class-validator';

export class SearchExamsDto {
  @IsOptional()
  @IsString()
  query?: string;

  @IsOptional()
  @IsIn(['id', 'patient', 'user', ''])
  type?: 'id' | 'patient' | 'user';

  @IsOptional()
  @IsBoolean()
  onlyNotValidated?: boolean;
}
