import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const baseUrl = process.env.SITE_URL || 'http://localhost:3000';

    if (!stripeKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Stripe secret key is not configured',
      });
    }

    const stripe = new Stripe(stripeKey, {});

    const body = await readBody(event);
    if (!body?.items || !Array.isArray(body.items) || body.items.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No items provided for checkout',
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: body.items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${item.product.brand} - ${item.product.name}`,
          },
          unit_amount: item.product.discountedPrice ?? item.product.price,
        },
        quantity: item.quantity,
      })),
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cart`,
    });

    return { id: session.id };
  } catch (e: any) {
    if (e?.statusCode) {
      throw e;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create checkout session',
    });
  }
});
