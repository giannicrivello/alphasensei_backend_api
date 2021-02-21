import { Field, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, JoinTable} from "typeorm";
import { Technique } from "./Technique";




enum Gender {
    male = "male",
    female = "female"
}

enum Rank {
    white = "white",
    blue = "blue",
    purple = "purple",
    brown = "brown",
    black = "black",
}




@ObjectType()
@Entity('users')
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    user_id: number;

    @Field()
    @Column("text")
    firstName: string | null;

    @Field()
    @Column("text")
    lastName: string;

    @Field()
    @Column("text")
    email: string;

    @Field()
    @Column("text")
    password: string;

    @Field()
    @Column("text")
    age: string;

    //for the session control login
    @Column("int", {default: 0})
    tokenVersion: number | null;
    

    @Field()
    @Column({
        type: "enum",
        enum: Gender,
    })
    gender: string;

    @Field()
    @Column({ 
        type: "enum",
        enum: Rank
    })
    myRank: string;

    @ManyToMany(() => Technique)
    @JoinTable()
    techniques: Technique[];

    // @Field()
    // @Column()
    // @ManyToOne(() => Rank, rank => rank.user)
    // rank: number | null

}
