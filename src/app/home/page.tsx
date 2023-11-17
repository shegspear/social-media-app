"use client"
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from '@/components/Layout/Layout'
import PageHeader from '@/components/PostHeader/PageHeader'
import PostModal from '@/components/Modal/PostModal'
import api from '@/utils/api';
import Posts from '@/components/Posts/Posts';

const Home = () => {
  const [show, setShow] = useState<boolean>(false)
  const [user, setUser] = useState<string>('')
  const [postMsg, setPostMsg] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [posts, setPosts] = useState<any>([])
  const [errMsg, setErrMsg] = useState<string>('');

  const giveFeedback = () => {
    if(errMsg === '') {
        toast.success(`${postMsg}`)
    } else [
        toast.error(`${errMsg}`)
    ]
  }

  const getAllPosts = async(data:string) => {
    setIsLoading(true)
    try {
      const res = await api.get(`/posts/${data}`)
      setPosts(res.data.data)
      console.log(res.data.data)
      setIsLoading(false)
    }catch(err:any) {
      setIsLoading(false)
      console.log(`Get posts error ${err}`)
    }
  }

  useEffect(() => {
    const data:any = JSON.parse(localStorage.getItem('user_email') || '');
    if (data) {
        setUser(data);
        getAllPosts(data)
    }
  }, [])

  useEffect(() => {
    giveFeedback()
    getAllPosts(user)
  }, [postMsg, errMsg])
  return (
    <div
        className='flex min-h-screen flex-col'
    >
        <ToastContainer />

        <PostModal
            show={show}
            setShow={setShow}
            username={user} 
            setPostMsg={setPostMsg}
            setErrMsg={setErrMsg}
        />


        <div
            className='max-w-[1600px]'
        >
            <Layout
                show={show}
                setShow={setShow}
            >
                <PageHeader />
                <Posts posts={posts} isLoading={isLoading} />
            </Layout>
        </div>
    </div>
  )
}

export default Home