import { Field, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity} from "typeorm";
import { Technique } from "./Technique";


@ObjectType()
@Entity()
export class Gif extends BaseEntity {

    @PrimaryGeneratedColumn()
    gif_id: number;

    @Field()
    @Column("text")
    gif_link: string;

    @Field()
    @Column()
    @ManyToOne(() => Technique, technique => technique.gif)
    technique: number;
}

