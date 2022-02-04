// For a quick mock testing purpose only. Not production recommended.

import { baseURL } from "../backend.config";

export const getGraphs = async (token : string) => {
    try {
        return await fetch(`${baseURL}/api/graphs`, {
            headers: {
              'Authorization' : token
            }
          });
    } catch(err) {
        return err
    }
}

export const getGraph = async (id, token) => {
    try {
        return await fetch(`${baseURL}/api/graphs/${id}`, {
            headers: {
              'Authorization' : token
            }
          });
    } catch(err) {
        return err
    }
}

export const deleteGraph = async (id, token) => {
  try {
      return await fetch(`${baseURL}/api/graphs/${id}`,{
        method: 'DELETE',
        headers: {
            'Authorization' : token
        }
      });
  } catch(err) {
      return err
  }
}

export default {
  getGraphs,
  getGraph,
  deleteGraph,
}