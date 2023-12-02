"use client"
import {useMqtt} from "@/hooks/useMqtt";
import {ChangeEvent, useEffect, useState} from "react";
import {toast} from "react-toastify";

export default function Home() {
    const [, publishMessage] = useMqtt('login');
    const [successMessage] = useMqtt('login/success');
    const [failedMessage,] = useMqtt('login/failed');
    const [formState, setFormState] = useState({
        username: '',
        password: '',
        rememberMe: false,
    });
    const [loading, setLoading] = useState(false);
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormState(prevState => ({...prevState, [name]: value}));
    };

    const handleFormSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const payload = JSON.stringify({
            username: formState.username,
            password: formState.password,
        });
        publishMessage(payload);
    };

    useEffect(() => {
        if (successMessage) {
            toast.success("Login success!");
            setLoading(false);
        }

        if (failedMessage) {
            toast.error("Login failed!");
            setLoading(false);
        }
    }, [successMessage]);
    return (
        <>
            <div className="flex flex-1 w-full h-full">
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="/login-background.png"
                        alt=""
                    />
                </div>
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div className={'flex flex-col items-center'}>
                            <h2 className="mt-8 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign in
                            </h2>
                            <p className="mt-2 leading-6 text-gray-500 text-center">
                                Welcome to Romo, please enter your login details below to using.
                            </p>
                        </div>

                        <div className="mt-10">
                            <div>
                                <form
                                    onSubmit={handleFormSubmit}
                                    className="space-y-6"
                                >
                                    <div>
                                        <label htmlFor="email"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Username
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="username"
                                                name="username"
                                                onChange={handleInputChange}
                                                placeholder="Enter your username"
                                                type="text"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="password"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="password"
                                                onChange={handleInputChange}
                                                name="password"
                                                placeholder="Enter your password"
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                            <label htmlFor="remember-me"
                                                   className="ml-3 block text-sm leading-6 text-gray-700">
                                                Remember me
                                            </label>
                                        </div>

                                        <div className="text-sm leading-6">
                                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                                            disabled={loading}
                                        >
                                            {loading ? 'Loading...' : 'Sign in'}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="mt-10">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t border-gray-200"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
