import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export interface EdgeDocument extends mongoose.Document {
    _id: string;
    source: string;
    target: string;
    graphDataId?: string;
};

const EdgeSchema = new mongoose.Schema(
    {
      _id: {
      type: String,
      required: true,
      unique: true,
      default: () => uuidv4(),
      },
      source: {
        type: String,
        required: true,
      },
      target: {
        type: String,
        required: true,
      },
      graphDataId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GraphData",
      },
    },
    { timestamps: true }
  );

const Edge = mongoose.model<EdgeDocument>("Edge", EdgeSchema);

export default Edge;