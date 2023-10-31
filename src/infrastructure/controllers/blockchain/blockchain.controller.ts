import { Controller, Get, Inject } from "@nestjs/common";
import { ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ApiResponseType } from "src/infrastructure/common/swagger/response.decorator";
import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "src/infrastructure/usecases-proxy/usecases-proxy.module";
import { StatusBlockchainUseCases } from "src/usecases/blockchain/statusBlockchain.usecases";

@Controller('blockchain')
@ApiTags('Blockchain')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels()
export class BlockchainController {
    constructor(
        @Inject(UsecasesProxyModule.STATUS)
        private readonly statusUsecaseProxy: UseCaseProxy<StatusBlockchainUseCases>
    ) { }

    @Get('livess')
    //@ApiBearerAuth()
    //@UseGuards(JwtAuthGuard)
    @ApiOperation({ description: 'Este servicio retorna el estado de la blockchain.' })
    async status() {
        const status = await this.statusUsecaseProxy.getInstance().execute();
        return status;
    }
}