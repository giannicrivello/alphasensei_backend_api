import { sign } from "jsonwebtoken";
import { User } from "./entity/User";




export const createAcccessToken = (user: User) => {
    return sign({ userId: user.user_id}, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "15m"
    });
};

export const createRefreshToken = (user: User) => {
    return sign({
        userId: user.user_id},
        process.env.REFRESH_TOKEN_SECRET!, {
            expiresIn: '7d'
    });
};