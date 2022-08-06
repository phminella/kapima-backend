import { list } from '@keystone-6/core';
import { integer, relationship } from '@keystone-6/core/fields';

export const CartItem = list({
    // access:
    ui: {
        listView: {
            initialColumns: ['user', 'product', 'quantity']
        }
    },
    fields: {
        user: relationship({
            ref: 'User.cart'
        }),
        product: relationship({ ref: 'Product' }),
        quantity: integer({
            defaultValue: 1,
            validation: {
                isRequired: true
            }
        }),
        // TODO cart, orders, blabla
    },
});
