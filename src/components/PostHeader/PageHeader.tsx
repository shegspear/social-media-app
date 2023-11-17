import Image from 'next/image'

import { celebData } from '@/utils/localData'


const PageHeader = () => {
  return (
    <div
        className='flex flex-row mb-10 lg:w-11/12 h-[150px] w-full overflow-x-auto'
    >
        {
            celebData.map((cur:any, idx:number) => (
                <div
                    className='h-[100px] w-[100px] mr-4 flex flex-col items-center'
                    key={idx}
                >
                    <div
                        className='h-[81px] w-[81px] p-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
                    >
                        <Image 
                            src={cur.img}
                            height={80}
                            width={80}
                            className='rounded-full'
                            alt='artist image'
                        />
                    </div>

                    <p
                        className='text-center'
                    >
                        {cur.name}
                    </p>
                </div>
            ))
        }
    </div>
  )
}

export default PageHeader