import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import {UserResolver} from './UserResolver';
import { TechniqueResolver } from "./TechniqueResolver";
import { DrillResolver } from "./DrillResolver";
import { GifResolver } from "./GifResolver";
import { verify } from "jsonwebtoken";
import { createAcccessToken, createRefreshToken } from "./auth";
import { sendRefreshToken } from "./sendRefreshToken";


import cookieParser = require("cookie-parser");
import express = require("express");
import cors = require("cors");


(async () => {
const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
  
}))

// var express = require('express')
// var app = express()

app.use(cookieParser())
app.get('/', function (_req, res) {
    res.send('hello world')
  })

app.post('/refresh_token', async (req, res) => {
  console.log(req.cookies)
  const token = req.cookies.jid
  console.log(token)
  if(!token) {
    return res.send({ ok: false, accessToken: ''})
  }
  let payload: any = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
  } catch (err) {
    console.log(err)
    return res.send({ ok: false, accessToken: ''})
  }
  //token is valid and we send back an access token
  const user = await User.findOne({ user_id: payload.userId })
  if (!user) {
    return res.send({ ok: false, accessToken: ''})
  }
  sendRefreshToken(res, createRefreshToken(user));
  return res.send({ ok:true, accessToken: createAcccessToken(user) })
})

  await createConnection();


    
  const apolloServer = new ApolloServer({
     schema: await buildSchema({
       resolvers: [UserResolver, TechniqueResolver, DrillResolver, GifResolver]
     }),
      context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({app, cors: false})
  app.listen(4000, () => {
      console.log('express server has started')
  });
})();