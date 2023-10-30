import { ApiProperty } from '@nestjs/swagger';
export class IsGloovBalancePresenter {
  @ApiProperty()
  balance: number;
}

export class createAccountPresenter {
  @ApiProperty()
  publicKey: string;

  @ApiProperty()
  privateKey: string;
}

export class transactionPresenter {
  @ApiProperty()
  txHash: string;
}

export class transitTokensPresenter {
  @ApiProperty()
  available: number;
  @ApiProperty()
  transit: number;
  @ApiProperty()
  total: number;
}
