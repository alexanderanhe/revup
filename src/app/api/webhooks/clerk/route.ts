import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { clerkClient, WebhookEvent } from '@clerk/nextjs/server'
import { on } from 'events'
import { createUser } from '@/lib/data'

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  console.log(`Webhook with and ID of ${evt.data.id} and type of ${evt.type}`)
  console.log('Webhook body:', body)

  const clerk = await clerkClient()
  switch (evt.type) {
    case 'user.created':
      await clerk.users.updateUser(evt.data.id, {
        publicMetadata: {
          roles: ['user'],
          onboarded: false,
          assessment: false,
        },
        unsafeMetadata: {
          theme: 'light',
          dashboard: [
            "Recommendations",
            "MyWeight"
          ]
        },
      });
      const user = await clerk.users.getUser(evt.data.id)
      console.log('User created:', user)
      await createUser(user);
      break
    // case 'user.updated':
    //   const user = await clerk.users.getUser(id)
    //   console.log('User updated:', user)
    //   break
    default:
      console.log('Unhandled webhook event:', evt.type)
  }

  return new Response('', { status: 200 })
}