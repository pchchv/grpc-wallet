import { Entity, PrimaryGeneratedColumn, Column, getManager } from "typeorm";
import { AppDataSource } from "./data-source";

export
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

async function createTransaction(
  from: string,
  to: string,
  value: number,
  metadata: any,
) {
  const transaction = new Transaction();
  transaction.from = from;
  transaction.to = to;
  transaction.value = value;
  transaction.timestamp = new Date();
  transaction.metadata = metadata;

  await AppDataSource.manager.save(transaction);
}
