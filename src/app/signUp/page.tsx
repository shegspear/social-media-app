"use client"

import {
  useState
} from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

import CustomInput from "@/components/CustomInput/CustomInput"
import CustomButton from '@/components/CustomButton/CustomButton';
import Link from 'next/link';
import api from '@/utils/api';

export default function Home() {
  const [form, setForm] = useState<any>({})
  const [errors, setErrors] = useState<any>({})
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter();

  const onEnterValue = ({ name, value }:{name:string, value:string}) => {
    setForm({ ...form, [name]: value });

    if (value !== '') { 
      if (name === 'email') {
        const regex = new RegExp(/\S+@\S+\.\S+/);
        const isEmailValid = regex.test(value);

        if (!isEmailValid) {
          setErrors((prev:any) => {
            return {
              ...prev,
              [name]: `Please a valid email.` ,
            };
          });
        } else {
          setErrors((prev:any) => {
            return { ...prev, [name]: null };
          });
        }
      } else if (name === 'password') {
        if (value.length < 5) {
          setErrors((prev:any) => {
            return {
              ...prev,
              [name]:  `Please enter a strong password.`,
            };
          });
        } else {
          setErrors((prev:any) => {
            return { ...prev, [name]: null };
          });
        }
      }
    } else {
      setErrors((prev:any) => {
        return { ...prev, [name]: 'This field is required.' };
      });
    }

  }

  const togglePassword = () => setIsVisible(!isVisible)

  const register = async() => {
    setIsLoading(true)
    try {
      const {data: {message}} = await api.post(
        '/register',
        {
          username: form.email,
          password: form.password
        }
      )
      localStorage.setItem('user_email', JSON.stringify(form.email));
      toast.success(`${message}`)
      setIsLoading(false)
      router.push('/home');
    }catch(err:any) {
      setIsLoading(false)
      toast.error(`Network error.`)
      console.log(`Register error ${err}`)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <ToastContainer />
      <div
          className="flex flex-col justify-center items-center max-w-xl w-8/12 h-full p-8 bg-gray-300 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10"
      >
        {
          errors.email || errors.password ? (
            <p 
              className="text-center text-2xl font-medium mb-10"
            >
              Please fix the input error 😰
            </p>
          ) : (
            <p 
              className="text-center text-2xl font-medium mb-10"
            >
              Its you again 😋
            </p>
          )
        }

        <CustomInput 
          label={''}
          disableInput={false}
          inputHt={48}
          wrapperBgColor='transparent'
          type='text'
          placeholder={'Email'}
          iconDirection={'row'}
          value={form.email}
          onChange={(e:any) => {
              const value = e.target.value;
              onEnterValue({ name: 'email', value });
          }}
          error={errors.email}
          textArea={false}
          marginTop={0}
          marginBottom={40}
          inputBg='transparent'
        />

        <CustomInput 
          label={''}
          disableInput={false}
          inputHt={48}
          wrapperBgColor='transparent'
          type={isVisible ? 'text' : 'password'}
          placeholder={'Password'}
          iconDirection={'row'}
          value={form.password}
          onChange={(e:any) => {
              const value = e.target.value;
              onEnterValue({ name: 'password', value });
          }}
          error={errors.password}
          textArea={false}
          marginTop={0}
          marginBottom={40}
          inputBg='transparent'
          icon={isVisible ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
          iconClick={togglePassword}
        />

        <CustomButton 
          disabled={isLoading}
          onClick={register}
          bgColor={'#8A2BE2'}
          disabledColor='grey'
          btnHeight={44}
          textColor='#fff'
          btnFontSize={20}
          title={'sign up'}
          loader={
            <svg className="animate-spin h-5 w-5 mr-3 border-2 border-blue-300 rounded-full" viewBox="0 0 24 24"></svg>
          }
          isLoading={isLoading}
          borderColor='transparent'
        />

        <p 
          className='text-md mt-8 text-grey-300'
        >
          Already have an account ? 
          <Link
            href={'/'}
          >
            <span
                className={`cursor-pointer text-signUpColor font-bold`}
            > 
                Login
            </span>
          </Link>
        </p>

      </div>
    </main>
  )
}
