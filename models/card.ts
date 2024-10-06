import mongoose, { ObjectId, Schema } from "mongoose";

interface ICard {
  name: string;
  link: string;
  owner: ObjectId;
  likes?: ObjectId[];
  createdAt?: Date;
}

const cardSchema = new mongoose.Schema<ICard>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

export default mongoose.model("card", cardSchema);
