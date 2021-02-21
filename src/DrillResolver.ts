import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Drills } from "./entity/Drills";
import { Technique } from "./entity/Technique";





@Resolver()
export class DrillResolver {

    @Query(() => [Drills])
    async drills() {
        return Drills.find()
    }


    @Mutation(() => [Drills])
     async registerDrills( 
        @Arg('title') title: string,
        @Arg('num_reps') num_reps: number,
        @Arg('num_sets') num_sets: number,
        @Arg('technique') technique: number,
    ) {

        await Drills.insert({
            title,
            num_reps,
            num_sets,
            technique
        });
        return true;
    }
}



// @ObjectType()
// @Entity()
// export class Drills extends BaseEntity {
//     @PrimaryGeneratedColumn()
//     drill_id: number;


//     @Field()
//     @Column("text")
//     title: string;

//     @Field()
//     @Column()
//     num_reps: number;

//     @Field()
//     @Column()
//     num_sets: number;

//     @ManyToOne(() => Technique, technique => technique.drills)
//     technique: number;


// }