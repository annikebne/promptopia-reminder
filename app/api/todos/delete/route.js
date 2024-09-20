import { connectToDB } from "@utils/database";
import Item from '@models/item'

export const POST = async (request) => {
  const { ids } = await request.json();

  try {
    await connectToDB();

    ids.forEach(async (id) => {
      await Item.findByIdAndRemove(id)
    })

    return new Response("Item deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting item", { status: 500 });
  }
};
