import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Transactions {
    @PrimaryColumn()
    hash: string;

    @Column({ name: 'block_number' })
    blockNumber: string;

    @Column({ name: 'from_address_hash' })
    fromAddressHash: string;

    @Column({ name: 'to_address_hash' })
    toAddressHash: string;

    @Column({ name: 'value' })
    value: number;

    @Column({ name: 'type' })
    type: number;

}