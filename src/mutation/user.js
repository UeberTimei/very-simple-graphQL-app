import { gql } from '@apollo/client';


export const createUser = gql`
    mutation createUser($input: UserInput){
        createUser(input: $input) {
            id
            username
            age
        }
    }
`