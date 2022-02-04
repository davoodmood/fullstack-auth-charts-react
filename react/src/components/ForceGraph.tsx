import React from 'react'
import dynamic from 'next/dynamic'

const NoSSRForceGraph = dynamic(() => import('../lib/NoSSRForceGraph'), {
    ssr: false
});

function ForceGraph({data, width, height}: any) {
    return (
        <div className='z-0 border-2 border-slate-800'>
            <NoSSRForceGraph 
                graphData={data} 
                nodeId="_id" 
                nodeLabel="label"
                nodeColor={() => '#fda529'} 
                nodeAutoColorBy="group"
                linkWidth={2}
                width={width}
                height={height}
            />
        </div>
    )
}

export default ForceGraph
