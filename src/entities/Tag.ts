import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
} from 'typeorm';
import { Length } from "class-validator";

@Entity("tags")
export class Tag {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    @Length(2, 20)
    name: string;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}