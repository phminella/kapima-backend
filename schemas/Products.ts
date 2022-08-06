import { list } from '@keystone-6/core';
import { text, relationship, select, integer } from '@keystone-6/core/fields';

export const Product = list({
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
            ref: 'ProductImage.product'
        }),
        status: select({
            options: [
                { label: 'Draft', value: 'DRAFT' },
                { label: 'Available', value: 'AVAILABLE' },
                { label: 'Unavailable', value: 'UNAVAILABLE' },
            ],
            defaultValue: 'DRAFT',
            ui: {
                displayMode: 'segmented-control',
            },
        }),
        price: integer(),        
        cart: relationship({ ref: 'CartItem' }),
    },
});
