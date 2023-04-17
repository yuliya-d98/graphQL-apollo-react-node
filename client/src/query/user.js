import {gql} from "@apollo/client";

export const GET_ALL_USERS = gql`
    query {
        getAllUsers {
            id, username, age
        }
    }
`

export const GET_ONE_USER = gql`
    fragment UserWithoutAge on User {
        id, username, posts {
            title, content
        }
    }
    
    query getUser($id: ID) {
        getUser(id: $id) {
            ...UserWithoutAge
        }
    }
`