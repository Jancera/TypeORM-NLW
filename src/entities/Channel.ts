import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne, OneToMany, JoinColumn,
    CreateDateColumn, UpdateDateColumn
} from 'typeorm';
import { User } from './User';
import { Video } from './Video';
import { Length } from "class-validator";

@Entity("channels")
export class Channel {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @Length(10, 50)
    name: string;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => User, user => user.channel, {eager:true})
    @JoinColumn()
    user: User;

    @OneToMany(() => Video, (video) => video.channel)
    videos: Video[];
}