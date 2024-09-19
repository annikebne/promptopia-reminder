
import { connectToDB } from "@utils/database";
import Item from "@models/item"

export const POST = async (request) => {
  const { userId, description } = await request.json();

  try {
    await connectToDB()
    const newItem = new Item({ creator: userId, description })

    await newItem.save()
    return new Response(JSON.stringify(newItem), { status: 201 })

  } catch (error) {
    return new Response('Failed to create a new item', { status: 500 })
  }
}