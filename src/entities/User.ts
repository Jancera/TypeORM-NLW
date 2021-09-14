import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    OneToOne, 
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { IsEmail,Length } from "class-validator";
import { Channel } from './Channel';

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    @Length(4, 20)
    firstName: string;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => Channel, (channel) => channel.user)
    channel: Channel;
}