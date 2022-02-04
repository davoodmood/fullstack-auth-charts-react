import React, {SyntheticEvent, useState} from 'react'
import Layout from '../../layouts/Layout'
import Link from 'next/Link';
import { useRouter } from 'next/router';
import {baseURL} from '../../backend.config';

function register() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            await fetch(`${baseURL}/api/users`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            await router.push('/signin');
        } catch (err) {
            return err
        }
    }

    return (
        <Layout>
            <div className="bg-white relative flex flex-col space-y-10 justify-center items-center">
                <div className="bg-white md:shadow-lg shadow-none rounded p-6 w-96" >
                    <h1 className="text-3xl font-bold leading-normal" >Sign Up</h1>
                    <p className="text-sm leading-normal mt-5">Investigate & Discover with Graphs</p>
                    <form className="space-y-5 mt-5" onSubmit={submit}>
                        <div className="mb-4 relative">
                            <input 
                                id="name"
                                className={`${name && 'filled'} w-full rounded px-3 border border-gray-500 pt-5 pb-2 focus:outline-none input active:outline-none`} 
                                type="text"
                                required
                                onChange={e => setName(e.target.value)}
                            />
                            <label htmlFor="name" className="label absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-500 text-base cursor-text">Name</label>
                        </div>
                        <div className="mb-4 relative">
                            <input 
                                id="email" 
                                className={`${email && 'filled'} w-full rounded px-3 border border-gray-500 pt-5 pb-2 focus:outline-none input active:outline-none`} 
                                type="email"
                                required
                                onChange={e => setEmail(e.target.value)}
                            />
                            <label htmlFor="email" className="label absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-500 text-base cursor-text">Email</label>
                        </div>
                        <div className="relative flex items-center border border-gray-500 focus:ring focus:border-blue-500 rounded">
                            <input 
                                id="password" 
                                className={`${password && 'filled'} w-full rounded px-3 pt-5 outline-none pb-2 focus:outline-none active:outline-none input`} 
                                type={showPassword ? 'text': 'password'}
                                required
                                onChange={e => setPassword(e.target.value)}
                            />
                            <label htmlFor="password" className="label absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-500 text-base cursor-text">Password</label>
                            <div 
                                className="text-sm font-bold text-slate-800 hover:bg-slate-600 hover:underline hover:text-white rounded-full px-2 py-1 mr-1 leading-normal cursor-pointer"
                                onClick={()=> setShowPassword(!showPassword)}
                            >{showPassword? 'hide' : 'show'}</div>
                        </div>
                        <button type="submit" className=" w-full border border-yellow-600 text-center bg-yellow-500 hover:bg-slate-800 hover:text-white text-slate-800 py-3 font-medium rounded">Register</button>
                    </form>
                </div>
                <p>Already a Maltego user?
                    <Link href={"/signin"}>
                    <a className="cursor-pointer mx-5 text-slate-800 font-bold hover:bg-slate-600 hover:underline hover:text-white px-4 py-3 rounded-full">Login</a>
                    </Link>
                </p>
            </div>
        </Layout>
    )
}

export default register
