import { HttpModule, HttpService, Module } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';

@Module({
  providers: [BlockchainService],
  exports: [BlockchainService],
  imports: [
    HttpModule,
  ],

})
export class BlockchainModule { }
