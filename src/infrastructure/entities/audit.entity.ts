import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Audit {
    @PrimaryGeneratedColumn({ type: 'integer' })
    id: number;

    @Column('varchar', { length: 255, nullable: true })
    description: string;

    @Column('varchar', { length: 255, nullable: true })
    method: string;

    @Column('varchar', { length: 255, nullable: true })
    value: string;

    @Column('boolean', { default: false })
    is_done: boolean;

    @CreateDateColumn({ name: 'createdate' })
    created_date: Date;

    @UpdateDateColumn({ name: 'updateddate' })
    updated_date: Date;
}