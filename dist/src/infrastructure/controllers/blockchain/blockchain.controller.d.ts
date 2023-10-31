import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usecases-proxy";
import { StatusBlockchainUseCases } from "src/usecases/blockchain/statusBlockchain.usecases";
export declare class BlockchainController {
    private readonly statusUsecaseProxy;
    constructor(statusUsecaseProxy: UseCaseProxy<StatusBlockchainUseCases>);
    status(): Promise<any>;
}
