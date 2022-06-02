const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        Users : async () =>{
            return User.find().populate('books');
        },
        me: async (_parent, _arg, context) => {
            if(context.user){
                return User.findOne({_id: context.user._id}).populate('books');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        addUser: async (parent, {username, email, password})=>{
            const user = await User.create({username, email, password});
            const token = signToken(user);
            return { token, user};
        },
        login: async (parent, { email, password })=>{
            const user = await User.findOne({ email });
            if(!user){
                throw new AuthenticationError('No user found with this email address');
            }
            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw){
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user};
        },
        saveBooks: async (parent, args, context) =>{
            if(context.user){
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: args.input } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        deleteBook: async (parent, args, context) =>{
            if(context.user){
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: { savedBooks: args.input } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            throw AuthenticationError('You need to be logged in!')
        }

    }
}

module.exports = resolvers;