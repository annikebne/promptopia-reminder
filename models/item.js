import { Schema, model, models } from 'mongoose'

const ItemSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  description: {
    type: String,
    required: [true, 'Providing a description of the item is required']
  }
})

const Item = models.Item || model('Item', ItemSchema)

export default Item