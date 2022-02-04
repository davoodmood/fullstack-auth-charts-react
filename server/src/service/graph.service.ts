import {
    DocumentDefinition,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
  } from "mongoose";
  import Graph, { GraphDocument } from "../model/graph.model";
  
  export function createGraph(input: DocumentDefinition<GraphDocument>) {
    return Graph.create(input);
  }
  
  export function findGraph(
    query: FilterQuery<GraphDocument>,
    options: QueryOptions = { lean: true }
  ) {
    return Graph.findOne(query, {}, options);
  }

  export function findGraphAll() {
    return Graph.find({}).populate('name').populate('data').exec().then((graphs: Array<GraphDocument>) => {
        // TODO: use native MongoDB/Mongoose for mapping to array of _id's
        return graphs.map((graph:GraphDocument) => graph._id);
      });
  }
  
  export function findAndUpdate(
    query: FilterQuery<GraphDocument>,
    update: UpdateQuery<GraphDocument>,
    options: QueryOptions
  ) {
    return Graph.findOneAndUpdate(query, update, options);
  }
  
  export function deleteGraph(query: FilterQuery<GraphDocument>) {
    return Graph.deleteOne(query);
  }