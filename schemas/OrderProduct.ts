import { list } from '@keystone-6/core';
import { text, relationship, integer } from '@keystone-6/core/fields';

export const OrderProduct = list({
    // access:
    // ui:
    fields: {
        name: text({
            validation: {
                isRequired: true,
            },
            
        }),
        description: text({
            ui: {
                displayMode: 'textarea',
            },
        }),
        image: relationship({
            many: true,
            ref: 'ProductImage'
        }),
        price: integer(),
        quantity: integer(),
        order: relationship({ref: 'Order.products'})
    },
});
