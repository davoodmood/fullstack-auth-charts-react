import React, { useState, SyntheticEvent } from 'react'
import { baseURL } from '../backend.config';

function CreateGraph({create}: {create: Function}) {
    const [name, setName] = useState('');
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            const token = await localStorage.getItem('accessToken')
            if (token) {
                const response = await fetch(`${baseURL}/api/graphs`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : token
                    },
                    body: JSON.stringify({
                        name,
                        data: {}
                    })
                })
                const content = await response.json();
                console.log(content)
                create(content)
            }
        } catch (err) {
            return err
        }
    }

    return (
            <div className="bg-white md:shadow-lg shadow-none rounded p-6 grid-cols-2 w-full" >
                <form className="flex space-x-2" onSubmit={submit}>
                    <div className="relative flex">
                        <input 
                            id="name"
                            className={`${name && 'filled'} w-full rounded px-3 border border-gray-500 pt-5 pb-2 focus:outline-none input active:outline-none`} 
                            type="text"
                            required
                            onChange={e => setName(e.target.value)}
                        />
                        <label htmlFor="name" className="label absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-500 text-base cursor-text">Name</label>
                    </div>
                    <div className="relative flex">
                    <button type="submit" className=" inline px-4 border border-yellow-600 text-center bg-slate-800 hover:bg-yellow-500 hover:text-slate-800 text-white py-3 font-medium rounded">Create Graph</button>
                    </div>
                    
                </form>
            </div>
    )
}

export default CreateGraph
