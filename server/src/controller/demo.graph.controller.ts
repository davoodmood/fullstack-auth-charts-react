import { Request, Response } from "express";
import { get, findIndex } from "lodash";
import { v4 as uuidv4 } from 'uuid';
const demoJSON = require("../db/demo.json");
const graphsJSON = require("../db/demoGraphs.json");

export async function createDemoGraphHandler(req: Request, res: Response) {
  const body = req.body;
  const graph = { ...body, _id: uuidv4(), data: graphsJSON[Math.floor(Math.random() * graphsJSON.length )] }
  await demoJSON.push(graph);
  return res.send(graph);
}

export async function updateDemoGraphHandler(req: Request, res: Response) {
//   const userId = get(req, "user._id");
  const graphId = get(req, "params.graphId");
  const update = req.body;

  const graphIndex = await findIndex(demoJSON, ['_id', graphId]);

  if (graphIndex === -1) {
    return res.sendStatus(404);
  }

  const updatedGraph = { ...update, _id: graphId } 
  await demoJSON.splice(graphIndex, 1, updatedGraph)
  return res.send(updatedGraph);
}

export async function getDemoGraphHandler(req: Request, res: Response) {
  const graphId = await get(req, "params.graphId");
  let graphIndex;
  if (graphId) {
    graphIndex = await findIndex(demoJSON, ['_id', graphId]);
  } else {
    return res.send(demoJSON);
  }
  console.log("Graph index: ", graphIndex);
  if (graphIndex === -1) {
    return res.sendStatus(404);
  }
  return res.send(demoJSON[graphIndex]);
}

export async function deleteDemoGraphHandler(req: Request, res: Response) {
//   const userId = get(req, "user._id");
  const graphId = get(req, "params.graphId");
  const graphIndex = findIndex(demoJSON, ['_id', graphId]);

  if (graphIndex === -1) {
    return res.sendStatus(404);
  }

//   if (String(graph.user) !== String(userId)) {
//     return res.sendStatus(401);
//   }

  await demoJSON.splice(graphIndex, 1)

  return res.sendStatus(200);
}