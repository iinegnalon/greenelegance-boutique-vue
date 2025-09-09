import Stripe from 'stripe';

const stripe = new Stripe(process.env.VITE_STRIPE_SK!, {});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const baseUrl = process.env.SITE_URL || 'http://localhost:3000';

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
});
