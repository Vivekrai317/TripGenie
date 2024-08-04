import { GetPlaceDetails, PHOTO_REF_URL } from "@/Service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCardItem({hotel}){

    const [photoURL,setPhotoURL]=useState();
    useEffect(()=>{
        hotel&&GetPlacePhoto();
    },[hotel])

    const GetPlacePhoto=async()=>{
        const data={
            textQuery:hotel?.hotelName
        }
        const result = await GetPlaceDetails(data).then(res=>{
            // console.log(res.data.places[0].photos[4].name);
            const PhotoURL=PHOTO_REF_URL.replace('{NAME}',res.data.places[0].photos[3].name)
            setPhotoURL(PhotoURL);
        })
    }
    return(
        <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName+","+hotel?.hotelAddress} target="_blank">
        <div className="hover:scale-105 transition-all cursor-pointer">
            <img src={photoURL?photoURL:"/placeholder.jpg"} className="rounded-xl h-[200px] w-full object-cover" />
            <div className="my-2 flex flex-col gap-1">
                <h2 className="font-medium">{hotel?.hotelName}</h2>
                <h2 className="flex text-xs text-gray-500">📍 {hotel?.hotelAddress}</h2>
                <h2 className="text-sm">💰 {hotel?.priceRange} per night</h2>
                <h2 className="text-sm">⭐ {hotel?.rating} stars</h2>
            </div>
        </div>
        </Link>
    )
}

export default HotelCardItem