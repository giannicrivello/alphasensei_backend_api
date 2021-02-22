import { Arg, Mutation, Resolver } from "type-graphql";
import { Post } from "./entity/Post";



@Resolver()
export class PostResolvers {
@Mutation(() => Boolean)
async postToUser(
    @Arg('title', () => String) title: string,
    @Arg('rank', () => String) rank: string,
    @Arg('category', () => String) category: string,
    @Arg('user_id', () => String) user_id: string,
) {
   await Post.insert({
       title,
       rank,
       category,
       user_id
   });
   return true;
}

}
