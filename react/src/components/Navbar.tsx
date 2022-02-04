import React from 'react';
import Image from 'next/image';
import Link from 'next/Link';
import { useRouter } from "next/router";
import { SearchIcon, LogoutIcon } from "@heroicons/react/solid";
import { baseURL } from '../backend.config';
import { useAuth } from '../context/AuthContext';
import { useSearch } from '../context/SearchContext';

export default function Navbar({position, placeholder}: {position?: number, placeholder?: string}) {
    const {search , onSearch} = useSearch();
    const {auth} = useAuth();
    const router = useRouter();

    const logout = async () => {
        try {
            const token = await localStorage.getItem('accessToken')
            if (!token) return false && router.push('/signin')
            const response = await fetch(`${baseURL}/api/sessions`,{
                method: 'DELETE',
                headers: {
                    'Authorization' : token
                }
            })
            if (response.status === 200 ) router.push('/signin')
        } catch (err) {
            return err
        }
    }

    return (
        <header className='bg-slate-900 w-full h-18 sticky top'>
            <div className="h-16 max-w-7xl mx-auto grid grid-cols-3 ">
                {/* Header Start */}
                <div className="relative flex h-10 my-auto cursor-pointer ml-2">
                    <Image 
                        priority
                        onClick={onClick => router.push('/')}
                        src="/vercel.svg"
                        alt="Logo"
                        layout="fill"
                        objectFit="contain"
                        objectPosition="left"
                    />
                </div>
                {/* Header Middle */}
                <div className={`w-full h-12 my-auto items-center`}>
                    <div className={`${!auth && 'hidden'} flex h-12 my-auto items-center mx-0 md:border-2 rounded md:shadow-sm`}>
                        <input
                            value={search}
                            onChange={onSearch}
                            className={`${position === 0 ? 'text-white': 'text-white'} flex-grow pl-5 bg-transparent outline-none`} 
                            type="text" 
                            placeholder={placeholder !== undefined ? placeholder : 'Find your graph...'}
                        />
                        <SearchIcon className="hidden md:inline-flex h-7 bg-yellow-500 text-white rounded-full p-1 cursor-pointer md:mx-2 hover:bg-yellow-600"/>
                    </div>
                </div>
                {/* Header End */}
                <div className={`flex mr-2 items-center justify-end space-x-4 ${position === 0 ? 'text-gray-200': 'text-gray-500'}`}>
                    <div className={`${auth && 'hidden'} space-x-2`}>
                        <Link href={"/signin"}>
                            <p className={`hidden md:inline cursor-pointer ${position === 0 ? 'hover:text-white': 'hover:text-gray-100'}`}>Login</p>
                        </Link>
                        <Link href={"/signup"}>
                            <p className={`hidden md:inline cursor-pointer ${position === 0 ? 'hover:text-white': 'hover:text-gray-100'}`}>Register</p>
                        </Link>
                    </div>
                    
                    <div className={`${!auth && 'hidden'} flex space-x-2 md:border-2 p-2 rounded`}>
                        <LogoutIcon 
                            className={` md:hidden ${position === 0 ? 'hover:text-white': 'hover:text-gray-100'} h-6 cursor-pointer`} 
                            onClick={() => logout()}
                        />
                        <a 
                            className={`hidden md:inline pr-2 cursor-pointer text-gray-400 ${position === 0 ? 'hover:text-white': 'hover:text-gray-100'}`}
                            onClick={() => logout()}>Logout</a>
                    </div>
                </div>
            </div>
        </header>
    )
}


