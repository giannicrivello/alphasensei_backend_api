import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Gif } from "./entity/Gif";




@Resolver()
export class GifResolver {

    @Query(() => [Gif])
    async gifs() {
        return Gif.find()
    }


    //matches gif to technique
    @Query(() => [Gif])
    async gif_to_technique(
        @Arg('technique') technique: number
    ) {
        const gif_to_technique = await Gif.find({ where: {technique} });
        return gif_to_technique
    }


    @Mutation(() => [Gif])
     async registerGifs( 
        @Arg('gif_link') gif_link: string,
        @Arg('technique') technique: number,
    ) {

        await Gif.insert({
            gif_link,
            technique
        });
        return true;
    }
}
// import { Field, ObjectType } from "type-graphql";
// import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity} from "typeorm";
// import { Technique } from "./Technique";


// @ObjectType()
// @Entity()
// export class Gif extends BaseEntity {

//     @PrimaryGeneratedColumn()
//     gif_id: number;

//     @Field()
//     @Column("text")
//     gif_link: string;

//     @Field()
//     @Column()
//     @ManyToOne(() => Technique, technique => technique.gif)
//     technique: number;
// }

