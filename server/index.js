import express from 'express';
import {graphqlHTTP} from "express-graphql";
import cors from 'cors';
import schema from "./schema.js";

const users = [{
    id: '1',
    username: 'Vasya',
    age: 25,
    posts: []
}];

const app = express();
app.use(cors());

// на практике внизу должны быть запросы к БД
const root = {
    getAllUsers: () => {
        // query {
        //   getAllUsers {
        //     id, username, age
        //   }
        // }
        return users;
    },
    getUser: ({id}) => {
        return users.find((user) => user.id === id)
    },
    createUser: (({input}) => {
        // mutation {
        //   createUser(input: {
        //     username: "UsernameWithPPosts",
        //     age: 35,
        //     posts: [
        //       {
        //         title: "PostTitle",
        //         content: "PostContent"
        //       }
        //     ]
        //   }) {
        //     username, posts {
        //       title
        //     }
        //   }
        // }
        const user = {
            id: Date.now(),
            ...input
        };
        users.push(user);
        return user;

    })
}

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root
}))

app.listen(5000, () => console.log('App running on 5000 port'))