import React from 'react'
import { ArrowCircleRightIcon, XCircleIcon } from "@heroicons/react/solid";
import { useRouter } from 'next/router';
import { baseURL } from '../backend.config';

interface edge {
    _id: string;
    source: string;
    target: string;
    graphDataId?: string;
}

interface node {
    _id?: string;
    graphDataId?: string;
    label: string;
}
interface graph {
    nodes: Array<node>;
    edges: Array<edge>;
}

interface graphUser {
    _id: string;
}

export interface graphData {
    _id: string;
    user?: graphUser;
    name: string;
    data: graph;
    createdAt?: Date;
    updatedAt?: Date;
}

function Card({ graph, remove } : { graph: graphData, remove: Function}) {
    const router = useRouter();
    const deleteGraph = async () => {
        try {
            const token = await localStorage.getItem('accessToken')
            if (!token) return false && router.push('/signin')
            const response = await fetch(`${baseURL}/api/graphs/${graph._id}`,{
                method: 'DELETE',
                headers: {
                    'Authorization' : token
                }
            })
            if (response.status === 200 ) remove(graph._id)
        } catch (err) {
            return err
        }
    }

    return (
        <div className="my-2">
            <div className='rounded px-4 py-4 grid grid-cols-3 w-200 my-auto space-x-2 border bg-amber-100 border-amber-500'>
                <div className='flex px-5 my-auto justify-start'>Graph Name: <strong className='mx-2 my-auto'>{graph?.name}</strong></div>
                <div className='flex px-5 my-auto justify-center'>Node Count: <strong className='mx-2 my-auto'>{graph?.data?.nodes?.length}</strong></div>
                <div className='flex px-5 my-auto justify-end'>
                <XCircleIcon 
                    className={` h-6 hover:text-red-700 cursor-pointer my-auto`} 
                    onClick={deleteGraph}
                />
                <ArrowCircleRightIcon 
                    className={`hover:text-green-700 h-6 cursor-pointer my-auto pl-1 pr-4`} 
                    onClick={() => router.push(`/graph/${graph._id}`)}
                />
                </div>
                
            </div>
        </div>
    )
}

export default Card
