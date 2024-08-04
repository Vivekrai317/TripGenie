import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import axios from 'axios'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import './Header.css'

export function Header() {

    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        console.log(user);
    }, [])
    const [openDialog, setOpenDialog] = useState(false);
    // const navigate=useNavigate();
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => getUserProfile(codeResponse),
        onError: (error) => console.log(error),
    })

    const getUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((res) => {
            console.log(res);
            localStorage.setItem('user', JSON.stringify(res.data));
            setOpenDialog(false);
            window.location.reload()
        })
    }
    return (
        <>
            <div className='p-3 shadow-sm flex justify-between items-center px-5'>
                <a href='/'>
                <div 
                    className='flex items-center'>
                    <img className='h-16' src='logo.svg' />
                    <h1 className='font-semibold text-3xl'>TripGenie</h1>
                </div>
                </a>
                <div className=''>
                    {user ?
                        <div className='flex items-center gap-5 '>
                            <a href='/create-trip'>
                            <Button variant='outline' className='my-btn rounded-full border-black hover:bg-[#e9a27c]'>Create Trip </Button>
                            </a>
                            <a href='/my-trips'>
                            <Button variant='outline' className='my-btn rounded-full border-black hover:bg-[#e9a27c]'>My Trips</Button>
                            </a>
                            <a href='/track-expenses'>
                            <Button variant='outline' className='my-btn rounded-full border-black hover:bg-[#8cb6bc]'>Track Expenses</Button>
                            </a>
                            <Popover>
                                <PopoverTrigger>
                                    <img src={user?.picture} className='h-[35px] w-[35px] rounded-full' />
                                </PopoverTrigger>
                                <PopoverContent className='w-48'>
                                    <div className='flex flex-col items-center'>
                                        <h2 className='text-center'>Click here to log out from your account.</h2>
                                        {/* <Button variant='link'className='w-full font-medium'>My Account</Button> */}
                                        <div onClick={() => {
                                            googleLogout();
                                            localStorage.clear();
                                            window.location.reload();
                                        }}>
                                            <Button
                                                variant='outline' className='w-full font-medium hover:bg-gray-300'>LogOut</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>

                        </div>
                        :
                        <div onClick={() => setOpenDialog(true)} >
                            <Button>Sign in</Button>
                        </div>
                    }
                </div>
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogDescription>
                                <div className='flex'>
                                    <img src='/logo.svg' />
                                    <div className='flex flex-col'>
                                        <h2 className='font-bold text-lg mt-7'>Sign in with Google</h2>
                                        <p>Sign in to the app with Google authentication securely.</p>
                                    </div>
                                </div>
                                <Button
                                    onClick={login}
                                    className='w-full mt-5 flex gap-3 items-center'>
                                    <FcGoogle className='h-6 w-6' />
                                    Sign in with Google
                                </Button>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}
