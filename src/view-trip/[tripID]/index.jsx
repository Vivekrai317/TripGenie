import { toast } from "@/components/ui/use-toast";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoSection from "../components/InfoSection";
import { db } from "@/Service/firebaseConfig";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

function ViewTrip(){
    const {tripId}=useParams();
    const [trip,setTrip]=useState([]);
    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId])

    // Fetch info from firebase
    const GetTripData=async()=>{
        const docRef=doc(db,'AITrips',tripId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Document : ",docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log("No such document");
            toast('No trip found')
        }
    }
    return(
        <div className="p-10 md:px-20 lg:px-44">
            {/* Information */}
            <InfoSection trip={trip}/>
            {/* Recommended hotels */}
            <Hotels trip={trip}/>
            {/* Itinerary */}
            <PlacesToVisit trip={trip}/>
            {/* Footer */}
            <Footer trip={trip}/>
        </div>
    )
}

export default ViewTrip