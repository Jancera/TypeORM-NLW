import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinTable,
    ManyToMany,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { Channel } from './Channel';
import { Tag } from './Tag';

@Entity("videos")
export class Video {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Channel, (channel) => channel.videos, {eager:true})
    channel: Channel;

    @ManyToMany(() => Tag)
    @JoinTable()
    tags: Tag[];
}