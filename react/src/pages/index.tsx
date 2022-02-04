import type { NextPage } from 'next'
import Layout from '../layouts/Layout';
import { useEffect, useState } from 'react';
import { baseURL } from '../backend.config';
import { useRouter } from 'next/router';
import Card from '../components/Card';
import { useAuth } from '../context/AuthContext';
import { useSearch } from '../context/SearchContext'
import CreateGraph from '../components/CreateGraph';
import { graphData } from '../components/Card';

const Home: NextPage = () => {
  const { search } = useSearch();
  const {auth, user} = useAuth();
  const router = useRouter();
  const [welcomeMsg, setWelcomeMsg] = useState('');
  const [graphs, setGraphs] = useState([])
  useEffect(() => {
    let controller = new AbortController();
    (
     async () => {
       try {
        const token = await localStorage.getItem('accessToken')
        if (token) {
          const graphApiResponse = await fetch(`${baseURL}/api/graphs`, {
            headers: {
              'Authorization' : token
            }
          });
          setGraphs(await graphApiResponse.json());
          setWelcomeMsg(`${await user.user ? `Welcome back, ${user?.user}` : `Create your new graph!`}`)
          controller = null;
        } else {
          router.push('/signin')
        }
       } catch (err) {
          router.push('/signin')
       }
     }
    )();
    return () => controller?.abort();
  }, [])

  const deleteGraphItem : Function = (id): void => {
    const deletedItemIndex = graphs.findIndex((graph) => graph._id === id);
    const updatedGraphsArray = graphs.filter((graph) => graph !== graphs[deletedItemIndex]);
    setGraphs(updatedGraphsArray);
  }
  const createGraphItem : Function = (graph: graphData): void => {
    setGraphs([
      ...graphs,
      graph
    ]);
  }

  return (
    <Layout>
      <div className={`${!auth && 'hidden'} align-top justify-center text-center my-3`}>
        <p className=''>{welcomeMsg}</p>
        <CreateGraph create={createGraphItem} />
        <p className='font-bold mb-4 mt-6'>or view your available graphs:</p>
      </div>
      <div className="flex-1 align-top bg-white rounded">
        <div className=" justify-center">
          { 
            search.length > 0 ?
              graphs
              .filter((graph) => graph.name
                                .trim()
                                .replace( /\s/g, '')
                                .toLowerCase()
                                .includes(search.trim().replace( /\s/g, '').toLowerCase())).length > 0 
                                ?
                graphs
                .filter((graph) => graph.name
                                  .trim()
                                  .replace( /\s/g, '')
                                  .toLowerCase()
                                  .includes(search.trim().replace( /\s/g, '').toLowerCase()))
                .map(graphItem => <Card key={graphItem._id} graph={graphItem} remove={deleteGraphItem}/>)
              :
                'No Graph Found.'
            :
              graphs
              .map(graphItem => <Card key={graphItem._id} graph={graphItem} remove={deleteGraphItem}/>)
          }
        </div>
      </div>
    </Layout>
  )
}

export default Home
