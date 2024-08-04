import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from '@/components/ui/use-toast';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
// import { message } from "antd";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from '@/components/ui/use-toast';
import { chatSession } from '@/Service/AIModel';
import { useGoogleLogin } from '@react-oauth/google';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/Service/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlass } from 'react-loader-spinner'
import Footer from '@/view-trip/components/Footer';

export function CreateTrip() {
    const [place, setPlace] = useState();
    const [formData, setFormData] = useState([]);
    const [loading,setLoading]=useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }
    
    const navigate=useNavigate();

    useEffect(() => {
        console.log(formData);
    }, [formData])

    
    const login=useGoogleLogin({
        onSuccess:(codeResponse)=>getUserProfile(codeResponse),
        onError:(error)=>console.log(error),
    })


    const onGenerateTrip = async () => {

        const user = localStorage.getItem('user');
        if (!user) {
            setOpenDialog(true);
            return;
        }

        if (formData?.noOfDays > 10 ||formData?.noOfDays==undefined || !formData?.location || !formData?.budget || !formData.traveler) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Invalid Input.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
            return;
        }
        setLoading(true);
        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location?.label)
            .replace('{totalDays}', formData?.noOfDays)
            .replace('{traveler}', formData?.traveler)
            .replace('{budget}', formData?.budget)
            .replace('{totalDays}', formData?.noOfDays)
        // console.log(FINAL_PROMPT);
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log(result?.response?.text());
        setLoading(false)
        SaveAITrip(result?.response?.text());
    }

    const getUserProfile=(tokenInfo)=>{
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
            headers:{
                Authorization:`Bearer ${tokenInfo?.access_token}`,
                Accept:'Application/json'
            }
        }).then((res)=>{
            console.log(res);
            localStorage.setItem('user',JSON.stringify(res.data));
            setOpenDialog(false);
            onGenerateTrip();
        })
    }

    const SaveAITrip=async(TripData)=>{
        setLoading(true)
        const user=JSON.parse(localStorage.getItem('user'));
        const docID = Date.now().toString()
        await setDoc(doc(db,"AITrips",docID),{
            userSelection:formData,
            tripData:JSON.parse(TripData),
            userEmail:user?.email,
            id:docID
        });
        setLoading(false);
        navigate('/view-trip/'+docID)
    }
    return (
        <>
            <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 items-center'>
                <h2 className='font-bold text-3xl text-center'>Plan your next adventure</h2>
                <p className='mt-3 text-gray-500 text-xl text-center'>Just provide some basic information, and TripGenie will generate a customized itinerary based on your preferences.</p>

                <div className='mt-10 flex flex-col gap-8'>
                    <div>
                        <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
                        <GooglePlacesAutocomplete
                            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                            selectProps={{
                                place,
                                onChange: (v) => {
                                    setPlace(v);
                                    handleInputChange('location', v)
                                }
                            }}
                        />
                    </div>
                    <div>
                        <h2 className='text-xl my-3 font-medium'>For how many days are you planning your trip?</h2>
                        <Input placeholder={'Please enter a number between 1-10'} type="number"
                            onChange={(e) => { handleInputChange('noOfDays', e.target.value) }} />
                    </div>
                </div>
                <div>
                    <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectBudgetOptions.map((item, index) => (
                            <div key={index}
                                onClick={() => handleInputChange('budget', item.title)}
                                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget == item.title && `shadow-xl border-black border-2 bg-[#FAF9F6]`}`}>
                                <h2 className='text-4xl'>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectTravelesList.map((item, index) => (
                            <div key={index}
                                onClick={() => handleInputChange('traveler', item.people)}
                                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.traveler == item.people && `shadow-xl border-black border-2 bg-[#FAF9F6]`}`}>
                                <h2 className='text-4xl'>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='my-10 justify-end flex'>
                    <Button
                    disabled={loading}
                    onClick={onGenerateTrip}>
                    {loading?<TbFidgetSpinner className='h-7 w-7 animate-spin'/>:
                    'Generate Trip'
                    }
                    </Button>
                </div>
                {/* can use modal */}
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogDescription>
                                <div className='flex'>
                                    <img src='/logo.svg'/>
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
            <Footer/>
        </>
    )
}
