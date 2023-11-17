import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'


import CustomButton from '../CustomButton/CustomButton'
import CustomInput from '../CustomInput/CustomInput'
import api from '@/utils/api';

export default function Example({
    show,
    setShow,
    username,
    setPostMsg,
    setErrMsg
}: {
    show:boolean
    setShow:any
    username:string
    setPostMsg:any
    setErrMsg:any
}) {
  const [form, setForm] = useState<any>({})
  const [errors, setErrors] = useState<any>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [uploadImg, setUploadImg] = useState<any>(null)

  const cancelButtonRef = useRef(null)

  const onEnterValue = ({ name, value }:{name:string, value:string}) => {
    setForm({ ...form, [name]: value });

    if (value !== '') {
        if (name === 'post') {
    
            if (value.length < 5) {
              setErrors((prev:any) => {
                return {
                  ...prev,
                  [name]: `Please your post is small.` ,
                };
              });
            } else {
              setErrors((prev:any) => {
                return { ...prev, [name]: null };
              });
            }
        }
    }else {
      setErrors((prev:any) => {
        return { ...prev, [name]: 'This field is required.' };
      });
    }

  }

  const convertBase64 = (file:any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  const handleImage = async(e:any) => {
    const file = e.target.files[0]
    const base64:any = await convertBase64(file)
    setUploadImg(base64)
  }

  const post = async() => {
    setIsLoading(true)
    let res;
    try {
      if(uploadImg) {
        res = await api.post(
          '/createpost',
          {
            username: username,
            base64str: uploadImg,
            post: form.post
          }
        )
      } else {
        res = await api.post(
          '/posts',
          {
            username: username,
            post: form.post
          }
        )
      }
      
      setPostMsg(res.data.message)
      setIsLoading(false)
      setShow(false)
      setErrMsg('')
    }catch(err:any) {
      setIsLoading(false)
      console.log(`Posting error `, err)
      setErrMsg(err.message)
    }
  }

  const close = () => {
    setShow(false)
    setUploadImg('')
  }

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-transparent bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-tranparent px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="mb-4 text-base font-semibold leading-6 text-white">
                        Make a post 👍
                      </Dialog.Title>
                      <div className="mt-2">
                        <CustomInput 
                            label={''}
                            disableInput={false}
                            inputHt={48}
                            wrapperBgColor='transparent'
                            type={'text'}
                            placeholder={'Enter your post'}
                            iconDirection={'row'}
                            value={form.name}
                            onChange={(e:any) => {
                                const value = e.target.value;
                                onEnterValue({ name: 'post', value });
                            }}
                            error={errors.post}
                            textArea={true}
                            marginTop={0}
                            marginBottom={20}
                            inputBg={'#fff'}
                        />

                        <label 
                            htmlFor="imageUpload"
                            className='cursor-pointer font-semibold mb-4'
                        >
                            Upload image
                        </label>

                        {
                           uploadImg && (
                            <p
                                className='text-md text-green-300 font-semibold'
                            >
                                Successful upload
                            </p>
                           )
                        }

                        <input 
                            type='file'
                            id='imageUpload'
                            className='hidden'
                            onChange={handleImage}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-transparent px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => {setShow(!show), setUploadImg('')}}
                  >
                    Cancel
                  </button>
                  <CustomButton 
                    disabled={isLoading}
                    onClick={post}
                    bgColor={'#8A2BE2'}
                    disabledColor='grey'
                    btnHeight={44}
                    textColor='#fff'
                    btnFontSize={20}
                    title={'Post'}
                    loader={
                      <svg className="animate-spin h-5 w-5 mr-3 border-2 border-blue-300 rounded-full" viewBox="0 0 24 24"></svg>
                    }
                    isLoading={isLoading}
                    borderColor='transparent'
                    btnWidth={200}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
