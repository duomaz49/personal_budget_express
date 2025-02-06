import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

 @Entity()
 export class Envelope {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
  
    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    balance: number;
  
    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    limit: number;
  
    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
  
    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
  }