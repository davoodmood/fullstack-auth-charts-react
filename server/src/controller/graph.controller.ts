import { Request, Response } from "express";
import { get } from "lodash";
import {
  createGraph,
  findGraph,
  findGraphAll,
  findAndUpdate,
  deleteGraph,
} from "../service/graph.service";

export async function createGraphHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const body = req.body;

  const graph = await createGraph({ ...body, owner: userId });

  return res.send(graph);
}

export async function updateGraphHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const graphId = get(req, "params.graphId");
  const update = req.body;

  const graph = await findGraph({ graphId });

  if (!graph) {
    return res.sendStatus(404);
  }

  if (String(graph.user) !== userId) {
    return res.sendStatus(401);
  }

  const updatedGraph = await findAndUpdate({ graphId }, update, { new: true });

  return res.send(updatedGraph);
}

export async function getGraphHandler(req: Request, res: Response) {
  const graphId = await get(req, "params.graphId");
  let graph;
  if (graphId) {
    graph = await findGraph({ graphId });
  } else {
    graph = await findGraphAll();
  }
  if (!graph) {
    return res.sendStatus(404);
  }
  return res.send(graph);
}

export async function deleteGraphHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const graphId = get(req, "params.graphId");

  const graph = await findGraph({ graphId });

  if (!graph) {
    return res.sendStatus(404);
  }

  if (String(graph.user) !== String(userId)) {
    return res.sendStatus(401);
  }

  await deleteGraph({ graphId });

  return res.sendStatus(200);
}