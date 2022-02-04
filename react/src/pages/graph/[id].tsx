import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { baseURL } from '../../backend.config';
import Layout from '../../layouts/Layout';
import ForceGraph from '../../components/ForceGraph';
import { useWindowSize } from '@react-hook/window-size'
import { ArrowCircleLeftIcon } from "@heroicons/react/solid";

function Graph(props) {
    const router = useRouter();
    const graphId = router.query.id
    console.log(router.query.id);
    const [graph, setGraph] = useState<any>({})
    const [width, height] = useWindowSize()

    
    useEffect(() => {
        let controller = new AbortController();
        (
         async () => {
           try {
            const token = await localStorage.getItem('accessToken')
            if (!token) return false && router.push('/signin')
            const graphResponse = await fetch(`${baseURL}/api/graphs/${graphId}`, {
              headers: {
                'Authorization' : token
              }
            });
            const content = await graphResponse.json();
            
            if (content && content?._id) {
                console.log('Graph: ', content)
                setGraph(content);
            } else {
              router.push('/');
            }
            controller = null;
           } catch (err) {
              router.push('/signin')
           }
         }
        )();
        return () => controller?.abort();
      }, [])

    return (
        <Layout>
            <div className='grid grid-rows-2 z-1'>
              <ArrowCircleLeftIcon 
                  className={`hover:text-slate-700 h-6 cursor-pointer`} 
                  onClick={() => router.push('/')}
              />
              <h3 className=' font-bold -top-5 -left-5'>{graph.name}</h3>
              <div className=' flex z-0'>
              {Object.keys(graph).length > 0 && width && height && (
                  <ForceGraph 
                    data={graph.data}
                    width={0.7 * width }
                    height={0.7 * height }
                  />
                )}
              </div>
            </div>
        </Layout>
    )
}

export default Graph
