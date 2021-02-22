import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
// import { hash } from 'bcryptjs';
import { User } from "./entity/User";
import { Technique } from "./entity/Technique";
// import { title } from "process";
// import { getConnection } from "typeorm";
import { MyContext } from "./MyContext";
import { verify } from "jsonwebtoken";




@Resolver()
export class TechniqueResolver {

    @Query(() => [Technique])
    async techniques() {
        return Technique.find()
    }

    @Query(() =>[Technique])
    async filterByRank(
        @Arg('rank') rank: string,
        @Arg('category') category: string,
    ){
        return Technique.find({ where: {rank, category}})
    }

    // @Query(() => [Technique])
    // async techniqueToUser(
    //     @Arg('user_rank', () => Int) user_rank: number
    // ) {
    //     await getConnection().getRepository(User)
    // }

    // @Query(() => [Technique])
    // async myTechnique (
    //     @Ctx() context: MyContext, tech:Technique
    // ) {
    //     if(context.payload.userRank == tech.rank){
    //         console.log(context.payload.userRank)
    //         return Technique.find({
    //             title
    //         })
    //     } else {
    //         return "not rank"
    //     }
    // }

    @Query(() => User, {nullable: true})
    me(
        @Ctx() context: MyContext
    ) {
        const authorization = context.req.headers['authorization'];

        if(!authorization) {
            throw null;
        }
        try {
            const token = authorization.split(' ')[1]
            const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!)
            context.payload = payload as any;
            return User.findOne(payload.userId); //this finds our user
    
        } catch(err) {
            console.log(err);
            return null
        }
    }

    @Query(() => Technique)
    async myTechnique(
        @Ctx() context: MyContext,
        // @Arg('myRank') myRank: String,
        @Arg('rank') rank: String,
    ) {
        const authorization = context.req.headers['authorization'];
        if(!authorization) {
            throw new Error('not authenticated');
        }
        try {
            const token = authorization.split(' ')[1]
            const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!)
            context.payload = payload as any;
            const user = await User.findOne(payload.userId);
            const technique = Technique.findOne({ where: {rank: user.myRank}})
            // if (user == technique)
            return technique
        } catch (err) {
            return 'you fucked up'
        }
        
    }




    @Mutation(() => Technique)
     async registerTechnique( 
        @Arg('title') title: string | null,
        @Arg('description') description: string,
        @Arg('videoLink') videoLink: string,
        @Arg('category') category: string,
        @Arg('rank') rank: string,
    ) {

        await Technique.insert({
            title,
            description,
            videoLink,
            category,
            rank
        });
        return true;
    }
}

// enum Category {
//     passing,
//     guard,
//     takedown,
// }

// @Entity()
// export class Technique extends BaseEntity {

//     @PrimaryGeneratedColumn()
//     technique_id: number;

//     @Column()
//     title: string;

//     @Column()
//     description: string;

//     @Column()
//     videoLink: string;

//     @Column({ 
//         type: 'enum',
//         enum: Category 

//     })
//     category: string;
//     @OneToMany(() => Gif, gifs => gifs.technique)
//     gif: Gif[];

//     @OneToMany(() => Drills, drills => drills.technique)
//     drills: Drills[];
// }
