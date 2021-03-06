import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            user{
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password){
            token
            user{
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($input: savedBook!){
        saveBook(input: $input){
            _id
            username
            email
            bookCount
            savedBooks{
                description
                bookId
                title
                link
                authors
                image
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation deleteBook($bookId: Id!){
        deleteBook(bookId: $bookId){
            _id
            username
            email
            bookCount
            savedBooks{
                description
                bookId
                title
                link
                authors
                image
            }
        }
    }
`;

