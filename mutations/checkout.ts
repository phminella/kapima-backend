import type { KeystoneContext } from '@keystone-6/core/types';
import stripeConfig from '../lib/stripe';

async function checkout(
    root: any,
    { token }: { token: string },
    context: KeystoneContext
) {
    const userId = context.session.itemId;
    if (!userId) {
        throw new Error('You must be logged in to do this');
    }
    const user = await context.query.User.findOne({
        where: { id: userId },
        query: `
        id
        name
        email
        cart {
            id
            quantity
            product {
                id
                name
                description
                price
                image {
                    id
                    image {
                    publicUrlTransformed
                }
                altText
              }
           }
        }
        `
    })
    const cartProducts = user.cart.filter((cartProduct: any) => cartProduct.product)
    const amount = cartProducts.reduce((total: any, product: any) => {
        return total + (product.quantity * product.product.price);
    }, 0);

    const charge = await stripeConfig.paymentIntents.create({
        amount,
        currency: 'USD',
        confirm: true,
        payment_method: token
    }).catch(err => {
        console.log(err);
        throw new Error(err.message)
    });
    const orderProducts = cartProducts.map((product: any) => {
        const orderProduct = {
            name: product.product.name,
            description: product.product.description,
            price: product.product.price,
            quantity: product.quantity,
            image: { connect: { id: product.product.image[0].id } }
        }
        return orderProduct;
    })
    const createdAt = new Date(Date.now()).toISOString();
    const order = await context.query.Order.createOne({
        data: {
            total: charge.amount,
            charge: charge.id,
            brand: charge.charges.data[0].payment_method_details?.card?.brand,
            last4: charge.charges.data[0].payment_method_details?.card?.last4,
            exp: `${charge.charges.data[0].payment_method_details?.card?.exp_month}/${charge.charges.data[0].payment_method_details?.card?.exp_year}`,
            products: { create: orderProducts },
            user: { connect: { id: userId } },
            createdAt
        },
        query: `
        id
        charge
        brand
        last4
        exp
        total
        products {
            id
            name
            description
            quantity
            price
                image {
                    id
                    image {
                    publicUrlTransformed
                }
                altText
            }
        }
        `
    });
    await cartProducts.map((product: any) => {
        context.query.CartItem.deleteOne({
            where: { id: product.id }
        })
    });
    return order;
}
export default checkout;