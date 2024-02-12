import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function checkout(request: NextApiRequest, response: NextApiResponse) {
  const { priceId } = request.body;

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' })
  }

  if (!priceId) {
    return response.status(400).json({ error: 'Price not found' })
  }

  const success_url = `${process.env.NEXT_URL}/success`
  const cancel_url = `${process.env.NEXT_URL}`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: success_url,
    cancel_url: cancel_url,
    mode: "payment",
    line_items: [ 
      {
        price: priceId,
        quantity: 1,
      }
    ],
  })

  return response.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
