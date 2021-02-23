import { Field, ObjectType } from "type-graphql";
import { Entity } from "typeorm";
import {PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";




enum Category {
    passing = "passing",
    guard = "guard",
    takedown ="takedown"
}




@ObjectType()
@Entity()
export class Post extends BaseEntity {

    @PrimaryGeneratedColumn()
    post_id: number;

    @Field()
    @Column("text")
    title: string | null;


    @Field()
    @Column()
    rank: string;

    @Field()
    @Column()
    category: string;

    @Field()
    @Column()
    user_id: string;
}