const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User{
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]!
    }

    type Book{
        bookId: ID
        authors: [String]
        description: String
        bookId: String
        title: String
        link: String
        image: String
    }
    type Auth{
        token: ID!
        user: User
    }

    input savedBook{
        authors: [String]
        description: String
        bookId: String
        title: String
        link: String
        image: String
    }

    type Query{
        me: User
    }

    type Mutation{
        addUser(username: String!, email: String!, password: String!):Auth
        login(email: String!, password: String!): Auth
        saveBook(input: savedBook!): User
        deleteBook(bookId: ID): User
    }
`
module.exports = typeDefs;