import { Field, ObjectType } from "type-graphql";
import { Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import {PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import { Drills } from "./Drills";
import { Gif } from "./Gif";
import { User } from "./User";




enum Category {
    passing = "passing",
    guard = "guard",
    takedown ="takedown"
}

enum Rank {
    white = "white",
    blue = "blue",
    purple = "purple",
    brown = "brown",
    black = "black",
}




@ObjectType()
@Entity()
export class Post extends BaseEntity {

    @PrimaryGeneratedColumn()
    post_id: number;

    @Field()
    @Column("text")
    title: string;

    @Field()
    @Column("text")
    description: string;

    @Field()
    @Column({ 
        type: "enum",
        enum: Rank
    })
    rank: string;

    @Field()
    @Column({ 
        type: 'enum',
        enum: Category 

    })
    category: string;

    @Field()
    @Column()
    user_id: string;
}