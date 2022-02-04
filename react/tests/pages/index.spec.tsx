import React from 'react';
// @ts-ignore
import sdk from '../services/api';


const MOCK_GRAPHS = [{
    "_id": "grph_2",
    "name": "Graph 2",
    "user": {
        "_id": "demo"
    },
    "data": {
        "nodes": [{
            "_id": "nd_1",
            "label": "Node 1"
        }, {
            "_id": "nd_2",
            "label": "Node 2"
        }],
        "links": [{
            "source": "nd_1",
            "target": "nd_2"
        }]
    }
}];

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(MOCK_GRAPHS)
})) as unknown as jest.Mock;

describe('The dashboard page', () => {
    it('respondes to get graph api', async () => {
        jest.spyOn(sdk, 'getGraphs').mockImplementation(async () => (
            MOCK_GRAPHS
        ));
        const graphs = await sdk.getGraphs(`__token__`);
        expect(sdk.getGraphs).toHaveBeenCalled();
        expect(graphs).toEqual(MOCK_GRAPHS);
    })
    it('Unauthorized response for wrong accessToken', async () => {
        jest.spyOn(sdk, 'getGraphs').mockImplementation(async () => (
            new Error('401')
        ));
        const graphs = await sdk.getGraphs(`__Wrong__token__`);
        expect(sdk.getGraphs).toHaveBeenCalled();
        expect(graphs).not.toBe(MOCK_GRAPHS);
    })
});