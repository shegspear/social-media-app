"use client"
import {useState} from 'react'
import Image from 'next/image';
import Link from 'next/link'
import {useEffect} from 'react'
import { IoHome } from "react-icons/io5";
import { FaRegPlusSquare } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useRouter } from 'next/navigation';

import { celebData } from '@/utils/localData';

const Layout = ({
    children, 
    show, 
    setShow
}: {
    children:any
    show:boolean
    setShow:any
}) => {
  const router = useRouter();
  const [user, setUser] = useState<string>('')

  const logout = () => {
    localStorage.removeItem('user_email')
    router.push('/');
  }

  useEffect(() => {
    const data:any = JSON.parse(localStorage.getItem('user_email') || '');
    if (data) {
        setUser(data);
    } else {
        router.push('/');
    }
  }, [])
  return (
    <div
        className='w-full flex lg:flex-row flex-col'
    >

        <div 
            className='lg:mb-0 mb-2 flex lg:flex-col flex-row lg:item-start lg:justify-start justify-center lg:pl-6 pl-0 lg:pt-6 pt-2 lg:w-2/12 w-full lg:h-screen h-[80px]'
        >
            <div
                className='flex lg:flex-col flex-row lg:items-start items-center lg:justify-start justify-between lg:w-full md:w-3/12 w-11/12'
            >
                <p
                    className='lg:flex hidden font-bold text-xl mb-10'
                >
                    Instapost
                </p>

                <Link
                    href={'/home'}
                    className='my-4 text-lg w-auto flex flex-row justify-between items-center'
                >
                    <IoHome className="text-white mr-2" />
                    <span className='ml-0 lg:flex hidden'>
                    Home
                    </span>
                </Link>

                <p
                    onClick={() => setShow(!show)}
                    className='cursor-pointer my-4 text-lg w-auto flex flex-row justify-between items-center'
                >
                    <FaRegPlusSquare className="text-white mr-2" />
                    <span className='ml-0 lg:flex hidden'> 
                        Post
                    </span>
                </p>

                <Link
                    href={'/'}
                    onClick={logout}
                    className='my-4 text-lg w-auto flex flex-row justify-between items-center'
                >
                    <CiLogout className="text-white mr-2 font-bold" />
                    <span className='ml-0 lg:flex hidden'> 
                    Logout
                    </span>
                </Link>
            </div>
        </div>

        <div
            className='flex lg:flex-row flex-col lg:justify-center lg:w-10/12 w-full lg:p-8 p-4'
        >
            <div
                className='lg:w-9/12 w-full'
            >
                {children}
            </div>

            <div 
                className='w-3/12 lg:flex flex-col hidden'
            >
                <div
                    className='mb-10 h-[100px] w-full flex flex-row justify-between items-center'
                >
                    <div
                        className='w-auto flex flex-row justify-between items-center h-[90px]'
                    >
                        <Image 
                            src={'/assets/avatar.png'}
                            width={50}
                            height={50}
                            alt={'avatar'}
                            className='rounded-full mr-2'
                        />

                        <div>
                            <p className='font-semibold'>
                                {user === '' ? 'User' : user}
                            </p>

                            <p className='font-normal'>
                                Instapost account
                            </p>
                        </div>
                    </div>

                    <p className='font-medium'>
                        Switch
                    </p>
                </div>

                <div
                    className='w-full flex flex-col'
                >
                    <p className='mb-4'>
                        Suggested for you
                    </p>

                    {
                        celebData.map((cur:any, idx:number) => (
                            <div
                                key={idx}
                                className='h-[60px] w-full flex flex-row justify-between items-center'
                            >
                                <div
                                    className='w-auto flex flex-row justify-between items-center h-[90px]'
                                >
                                    <Image 
                                        src={cur.img}
                                        width={40}
                                        height={40}
                                        alt={cur.img}
                                        className='rounded-full mr-2'
                                    />

                                    <div>
                                        <p className='font-semibold'>
                                            {cur.name}
                                        </p>
                                    </div>
                                </div>

                                <p className='font-medium'>
                                    Follow
                                </p> 
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Layout