import { list } from '@keystone-6/core';
import { text, relationship, integer, timestamp } from '@keystone-6/core/fields';

export const Order = list({
    fields: {
        total: integer(),
        products: relationship({ ref: 'OrderProduct.order', many: true }),
        user: relationship({ ref: 'User.orders' }),
        charge: text({ isIndexed: 'unique' }),
        brand: text(),
        last4: text(),
        exp: text(),
        createdAt: timestamp()
    },
});
