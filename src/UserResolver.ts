import { Arg, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { hash, compare } from 'bcryptjs';
import { User } from "./entity/User";
import { MyContext } from "./MyContext";
import { sendRefreshToken } from "./sendRefreshToken";
import { createAcccessToken, createRefreshToken } from "./auth";






@ObjectType()
class LoginResponse {

    @Field()
    accessToken: string;

    @Field(() => User)
    user: User;
}

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello() {
        return 'hi from boss nigga!';
    }

    @Query(() => [User])
    users() {
        return User.find();
    }





    

   

    //registering user
    @Mutation(() => Boolean)
     async registerUser( 
        @Arg('firstName') firstName: string,
        @Arg('lastName') lastName: string,
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Arg('age') age: string,
        @Arg('gender') gender: string,
        @Arg('myRank') myRank: string,
    ) {

        const hashedPassword = await hash(password, 12);

        await User.insert({
            firstName,
            lastName,
            email,
            age,
            gender,
            myRank,
            password: hashedPassword
        });
        return true;
    }
    
    //logging user in
    @Mutation(() => LoginResponse)
    async login(
        @Arg('email', () => String) email: string,
        @Arg('password', () => String) password: string,
        @Ctx() {res}: MyContext 
    ): Promise<LoginResponse>{
        const user = await User.findOne({where: {email}});
        if (!user) {
            throw new Error ('could not find user');
        }
        const valid = await compare(password, user.password);
        if (!valid) {
            throw new Error ('wrong password');
        }
        //login succcesful
        sendRefreshToken(res, createRefreshToken(user))
        return {
            accessToken: createAcccessToken(user),
            user
        }
        
    }



}