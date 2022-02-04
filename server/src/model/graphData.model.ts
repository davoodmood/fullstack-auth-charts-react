import mongoose from "mongoose";
import { NodeDocument } from "./node.model"
import { EdgeDocument } from "./edge.model"
import { v4 as uuidv4 } from 'uuid';

export interface GraphDataDocument extends mongoose.Document {
    nodes: Array<NodeDocument>;
    edges: Array<EdgeDocument>;
}

const GraphDataSchema = new mongoose.Schema(
    {
      _id: {
      type: String,
      required: true,
      unique: true,
      default: () => uuidv4(),
      },
      node: [{ type: mongoose.Schema.Types.ObjectId, ref: "Node" }],
      edge: [{ type: mongoose.Schema.Types.ObjectId, ref: "Edge" }],
    },
    { timestamps: true }
  );

const GraphData = mongoose.model<GraphDataDocument>("Graph", GraphDataSchema);

export default GraphData;