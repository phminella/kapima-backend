import type { KeystoneContext } from '@keystone-6/core/types';

async function addToCart(
    root: any,
    { productId }: { productId: string },
    context: KeystoneContext
) {
    const sesh = context.session;
    if (!sesh.itemId) {
        throw new Error('You must be logged in to do this');
    }
    const allCartItems = await context.query.CartItem.findMany({
        where: {
            user: { id: { equals: sesh.itemId } }, product: { id: { equals: productId } }
        },        
        query: 'id quantity'
    });
    const [existingCartItem] = allCartItems;
    if (existingCartItem) {
        return await context.query.CartItem.updateOne({
            where: { id: existingCartItem.id },
            data: { quantity: existingCartItem.quantity + 1 }
        });
    }
    return await context.query.CartItem.createOne({
        data: {
            product: { connect: { id: productId } },
            user: { connect: { id: sesh.itemId } }
        }
    })
}
export default addToCart;