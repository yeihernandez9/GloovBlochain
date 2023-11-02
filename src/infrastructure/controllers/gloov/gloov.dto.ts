import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetBalanceDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly address: string;
}

export class SendTransactinoDto {
  @ApiProperty({ required: true })
  readonly pkOrigin: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly accDestiny: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly value: number;
}
