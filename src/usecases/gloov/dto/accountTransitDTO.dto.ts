import Decimal from "decimal.js";

export class AccountTransitDTO {
    available: number;
    transit: number;
    total: number;

    constructor(available: number, transit: number, total: number) {
        this.available = available;
        this.transit = transit;
        this.total = total;
    }
}