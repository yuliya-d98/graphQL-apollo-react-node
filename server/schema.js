import {buildSchema} from "graphql/utilities/index.js";

// id будем генерировать на сервере
// input - мутации (типо post/patch для объектов)
// Query - запросы (типо описываем функции, которые будем вызывать)
// Mutation - мутации

const schema = buildSchema(`
    type User {
        id: ID
        username: String
        age: Int
        posts: [Post]
    }
    type Post {
        id: ID
        title: String
        content: String
    }
    
    input UserInput {
        id: ID
        username: String!
        age: Int!
        posts: [PostInput]
    }    
    input PostInput {
        id: ID
        title: String!
        content: String!
    }
    
    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
    }
    type Mutation {
        createUser(input: UserInput): User
    }
`);

export default schema;