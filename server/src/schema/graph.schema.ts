import { object, string, array } from "yup";

const payload = {
  body: object({
    name: string().required("Name is required"),
    data: object()
    // .shape({
    //     nodes: array().of(object({
    //         _id: string().required(),
    //         label: string()
    //     })),
    //     edges: array().of(object({
    //         _id: string(),
    //         source: string(),
    //         target: string()
    //     }))
    // })
    .required("Data object is required"),
  }),
};

const params = {
  params: object({
    graphId: string().required("graphId is required"),
  }),
};

export const createGraphSchema = object({
  ...payload,
});

export const updateGraphSchema = object({
  ...params,
  ...payload,
});

export const deleteGraphSchema = object({
  ...params,
});