import { GetPlaceDetails, PHOTO_REF_URL } from "@/Service/GlobalAPI";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function UserTripCard({trip}){
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
        <Link to={'/view-trip/'+trip?.id}>
        <div className="hover:scale-105 transition-all hover:shadow-sm ">
            <div className="flex flex-col">
                <LazyLoadImage 
                effect="blur"
                className="w-[250px] h-[200px] object-cover rounded-xl" src={photoURL}/>
                <div>
                    <h2 className="font-bold text-lg">{trip?.userSelection?.location?.label}</h2>
                    <h2 className="text-sm text-gray-500">{trip?.userSelection?.budget} {trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.traveler} travelers.</h2>
                </div>
            </div>
        </div>
        </Link>
    )
}
export default UserTripCard;