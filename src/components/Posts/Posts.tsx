import Image from "next/image"

const Posts = ({
    posts, 
    isLoading
}:{
    posts:any
    isLoading:boolean
}) => {
  return (
    <div
        className='flex flex-col items-start lg:w-11/12 w-full'
    >
        {
            isLoading ? (
                <svg className="animate-spin h-10 w-10 mr-3 border-2 border-blue-300 rounded-full" viewBox="0 0 24 24"></svg>  
            ) :
            (!isLoading && posts.length === 0) ? (
                <p>
                    Sorry, you don't have any posts yet.
                </p>
            ) :
            (!isLoading && posts.length > 0) ? (
                posts.map((cur:any, idx:number) => (
                    <div
                        key={idx}
                        className='border-2 rounded-xl p-2 lg:w-7/12 w-full flex flex-row items-start justify-start mb-10'
                    >
                        <Image 
                            src={'/assets/avatar.png'}
                            width={50}
                            height={50}
                            alt={'avatar'}
                            className='rounded-full mr-4'
                        />

                        <div>
                            <p 
                                className="font-medium mb-4"
                            >
                                {cur.username}
                            </p>

                            <p
                                className="font-semibold mb-4"
                            >
                                {cur.post}
                            </p>

                            {
                                cur.base64str !== null && (
                                    <Image 
                                        src={cur.base64str}
                                        width={150}
                                        height={150}
                                        alt={'post'}
                                        className='mt-2'
                                    />
                                )
                            }
                        </div>
                    </div>
                ))
            ) : null
        }
    </div>
  )
}

export default Posts