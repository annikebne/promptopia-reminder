import { connectToDB } from '@utils/database'
import Item from '@models/item'

export const GET = async (request) => {
  try {
    await connectToDB()

    const items = await Item.find({}).populate('creator')

    return new Response(JSON.stringify(items), { status: 200 })
  } catch (error) {
    return new Response("Unable to fetch todo items", { status: 500 })
  }
}