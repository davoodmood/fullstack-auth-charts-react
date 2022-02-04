import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { string } from "yup/lib/locale";
import { UserDocument } from "./user.model";
import { GraphDataDocument } from "./graphData.model";

export interface GraphDocument extends mongoose.Document {
  _id: string;
  user: UserDocument["_id"];
  name: string;
  data: GraphDataDocument["_id"];
  createdAt?: Date;
  updatedAt?: Date;
}

const GraphSchema = new mongoose.Schema(
  {
    graphId: {
      type: String,
      required: true,
      unique: true,
      default: () => uuidv4(),
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, default: true },
    data: { type: mongoose.Schema.Types.ObjectId, ref: "GraphData" },
  },
  { timestamps: true }
);

const Graph = mongoose.model<GraphDocument>("Graph", GraphSchema);

export default Graph;