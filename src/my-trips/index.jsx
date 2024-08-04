import { db } from "@/Service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import UserTripCard from "./components/UserTripCard";
import Footer from "@/view-trip/components/Footer";

function MyTrips(){
    const navigate=useNavigate();
    const [userTrips,setUserTrips]=useState([]);
    useEffect(()=>{
        GetUserTrips();
    },[])


    const GetUserTrips=async()=>{
        const user=JSON.parse(localStorage.getItem('user'));
        if(!user){
            navigate('/');
            return;
        }

        const q=query(collection(db,'AITrips'),where('userEmail','==',user?.email))
        const querySnapShot=await getDocs(q);
        setUserTrips([]);
        querySnapShot.forEach((doc)=>{
            console.log(doc.id,"=>",doc.data());
            setUserTrips(prevVal=>[...prevVal,doc.data()])
        })
    }
    return(
        
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-32 px-5 mt-10 items-center">
            <h2 className="font-bold text-3xl text-center">My Trips</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
                {userTrips.map((trip,index)=>(
                    <UserTripCard className='' trip={trip}/>
                ))}
            </div>
            <Footer/>
        </div>
    )
}

export default MyTrips;