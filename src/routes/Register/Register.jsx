import React, {useState} from 'react'
import "./Register.scss"
import axios from 'axios'
import Navbar from '../../components/navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import { error } from 'jquery'
const Register = () => {
    const [name, setName] = useState("");
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("")
    const [msg,setMsg] = useState("");
    const navigate = useNavigate();

    const Register = async (e) => {
        e.preventDefault();
        try{
            await axios.post("https://vercelhs.vercel.app/api/register", {
                name:name,
                email: email,
                password:password,
                confPassword:confPassword,
            })
            console.log("success")
            navigate('/login')
        } catch(error){
            if(error.response){
                setMsg(error.response.data.msg)
            }
        }   
    }
  return (
    <>
    <Navbar/>
    <div class="min-w-screen min-h-screen  flex  justify-center px-5 py-5">
    <div class="maxii bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full h-full overflow-hidden" >
        <div class="md:flex w-full">
            <div class="hidden md:block w-1/2 bg-cyan-300 py-10 px-10">
                <img src="/public/Untitled design (7).png" alt="" />
            </div>
            <div class="w-full md:w-1/2 py-10 px-5 md:px-10">
                <div class="text-center mb-10">
                    <h1 class="font-bold text-3xl text-gray-900">REGISTER</h1>
                    <p>Enter your information to register</p>
                </div>
                <form action="" onSubmit={Register}>
                <div>
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-5">
                            <label for="" class="text-xs font-semibold px-1">Username</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                <input type="text" class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="John" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
                       
                    </div>
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-5">
                            <label for="" class="text-xs font-semibold px-1">Email</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                <input type="email" class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="johnsmith@example.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-5">
                            <label for="" class="text-xs font-semibold px-1">Password</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                <input type="password" class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-12">
                            <label for="" class="text-xs font-semibold px-1">Password</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                <input type="password" class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************"value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-5">
                            <button class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold" type='submit'>REGISTER NOW</button>
                        </div>
                    </div>
                    {error && <p className='text-red-500 text-center'>{msg}</p>}
                </div>
                </form>
            </div>
        </div>
    </div>
</div>
</>
  )
}

export default Register