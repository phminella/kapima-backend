import { list } from '@keystone-6/core';
import { text, relationship, } from '@keystone-6/core/fields';
import { cloudinaryImage } from '@keystone-6/cloudinary';

export const cloudinary = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "forTS",
    apiKey: process.env.CLOUDINARY_KEY || "forTS",
    apiSecret: process.env.CLOUDINARY_SECRET || "forTS",
};

export const ProductImage = list({
    fields: {
        image: cloudinaryImage({
            cloudinary,
            label: 'Source',
        }),
        altText: text(),
        product: relationship({ ref: 'Product.image', many: true }),
    },
});
