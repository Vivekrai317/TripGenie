import React, { useEffect, useState } from "react";
import { BsCalendarDate } from "react-icons/bs";
import { TbPigMoney } from "react-icons/tb";
import { MdPeople } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { RiShareForwardFill } from "react-icons/ri";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/Service/GlobalAPI";
import axios from "axios";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function InfoSection({trip}){
    const [photoURL,setPhotoURL]=useState();
    useEffect(()=>{
        trip&&GetPlacePhoto();
    },[trip])

    const GetPlacePhoto=async()=>{
        const data={
            textQuery:trip?.userSelection?.location?.label
        }
        const result = await GetPlaceDetails(data).then(res=>{
            // console.log(res.data.places[0].photos[4].name);
            const PhotoURL=PHOTO_REF_URL.replace('{NAME}',res.data.places[0].photos[1].name)
            setPhotoURL(PhotoURL);
        })
    }
    return(
        <div>
            <img className="h-[380px] w-full object-cover rounded-lg"
            src={photoURL}/>
            <div className="flex items-center justify-between">
                <div className="my-5 flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">{trip?.userSelection?.location?.label}</h2>
                    <div className="flex gap-5">
                        <h2 className="flex items-center gap-2 p-1 px-3 bg-gray-200 rounded-full text-gray-500"><BsCalendarDate /> {trip?.userSelection?.noOfDays} Days</h2>
                        <h2 className="flex items-center gap-2 p-1 px-3 bg-gray-200 rounded-full text-gray-500"><TbPigMoney /> {trip?.userSelection?.budget} Budget</h2>
                        <h2 className="flex items-center gap-2 p-1 px-3 bg-gray-200 rounded-full text-gray-500"><MdPeople /> No. of travelers: {trip?.userSelection?.traveler} </h2>
                    </div>
                </div>
                <Button><RiShareForwardFill /></Button>
            </div>
        </div>
    )
}
export default InfoSection