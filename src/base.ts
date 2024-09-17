import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class Transaction {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    from!: string;

  @Column()
    to!: string;

  @Column()
    value!: number;

  @Column("timestamp")
    timestamp!: Date;

  @Column("json")
    metadata: any;
}
