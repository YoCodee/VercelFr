import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser, reset } from "../../Features/authSlice";
import Navbar from '../../components/navbar/Navbar';
import "./Login.scss";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user || isSuccess) {
            navigate("/");
        }

      
    }, [user, isSuccess, isError, navigate, dispatch]);

    const Auth = (e) => {
        e.preventDefault();
        dispatch(LoginUser({ email, password }))
        .unwrap()
        .then(() => {
            console.log('Logged in successfully');
        })
        .catch((message) => {
            console.error('Login failed:', message);
        });
    };

    return (
        <>
            <Navbar />
            <div className="min-w-screen min-h-screen flex justify-center px-5 py-5">
                <div className="maxii bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full h-full overflow-hidden">
                    <div className="md:flex w-full">
                        <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                            <div className="text-center mb-10">
                                <h1 className="font-bold text-3xl text-gray-900">LOGIN</h1>
                                <p>Enter your information to Login</p>
                                {isError && message && (
                                    <div className="mb-4 p-4 bg-red-200 text-red-800 rounded-md">
                                        <p>{message}</p>
                                    </div>
                                )}
                            </div>
                            <form onSubmit={Auth}>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <label className="text-xs font-semibold px-1">Email</label>
                                        <div className="flex">
                                            <input
                                                type="email"
                                                className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                                placeholder="johnsmith@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-12">
                                        <label className="text-xs font-semibold px-1">Password</label>
                                        <div className="flex">
                                            <input
                                                type="password"
                                                className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                                placeholder="************"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold" type='submit'>LOGIN NOW</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="hidden md:block w-1/2 bg-cyan-300 py-10 px-10">
                            <img src="/public/Untitled design (7).png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
