import { gql } from '@apollo/client';


export const getAllUsers = gql`
query{
    getAllUsers{
        id, username, age
    }
}
`

export const getUser = gql`
query getUser($id: ID){
    getUser(id: $id){
        id, username, age
    }
}
`