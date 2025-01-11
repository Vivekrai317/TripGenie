import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin } from 'lucide-react';
import { GetPlaceDetails, PHOTO_REF_URL } from "@/Service/GlobalAPI";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Telescope } from 'lucide-react';

function PlaceCardItem({place}){
    const [photoURL,setPhotoURL]=useState();
    useEffect(()=>{
        place&&GetPlacePhoto();
    },[place])

    const GetPlacePhoto=async()=>{
        const data={
            textQuery:place.placeName
        }
        const result = await GetPlaceDetails(data).then(res=>{
            console.log(res.data.places[0].photos[4].name);
            const PhotoURL=PHOTO_REF_URL.replace('{NAME}',res.data.places[0].photos[4].name)
            setPhotoURL(PhotoURL);
        })
    }
    return(
        <div className="border justify-start rounded-xl shadow-md p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
            <LazyLoadImage effect="blur" src={photoURL}
            className="w-[350px] h-[200px] rounded-xl object-cover"
            />
            <div className="flex flex-col w-full">
                <div className="w-full">
                <h2 className="font-bold text-lg">{place.placeName}</h2>
                <p className="text-sm text-gray-500">{place.placeDetails}</p>
                <span className="font-semibold text-sm text-gray-500 mt-2">Recommended Activities: </span>
                {place.activities.map((item,index)=>(
                    <li className="text-sm list-['-'] text-gray-500"> {item}</li>
                ))}
                <p className="text-sm text-gray-500 mt-2"><span className="font-medium">Ticket Pricing: </span>{place.ticketPricing}</p>
                </div>
                <div className="flex gap-10 justify-evenly mt-4">
                    <Link to={'https://en.wikipedia.org/wiki/'+place.placeName} target="_blank">
                    <Button className="hover:bg-[#e9a27c] hover:border-black mt-2 w-full" variant="outline">
                    <Telescope className="mr-2 h-4 w-4"/>Explore this place
                    </Button>
                    </Link>
                    <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placeName} target="_blank">
                    <Button className="hover:bg-[#8cb6bc] hover:border-black mt-2 w-full" variant="outline">
                    <MapPin className="mr-2 h-4 w-4"/>View on Google Maps
                    </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PlaceCardItem