import { graphQLSchemaExtension } from '@keystone-6/core';
import addToCart from './addToCart';
import checkout from './checkout';

const graphql = String.raw;
export const extendGraphqlSchema = graphQLSchemaExtension({
    typeDefs: graphql`
    type Mutation {
      addToCart(productId: ID): CartItem,
      checkout(token:String!): Order
    }
  `,
    resolvers: {
        Mutation: {
            addToCart,
            checkout
        }
    }
});
