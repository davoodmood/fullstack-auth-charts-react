import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export interface NodeDocument extends mongoose.Document {
    _id?:string;
    graphDataId?: string;
    label: string;
};

const NodeSchema = new mongoose.Schema(
    {
      _id: {
        type: String,
        required: true,
        unique: true,
        default: () => uuidv4(),
      },
      label: {
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

const Node = mongoose.model<NodeDocument>("Node", NodeSchema);

export default Node;