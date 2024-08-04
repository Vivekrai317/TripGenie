import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({trip}){
    return(
        <div>
            <h2 className="font-bold text-3xl mt-5 mb-3">Places To Visit</h2>
            <div className="">
                {trip.tripData?.itinerary.map((item,index)=>(
                    <div>
                        <h2 className="font-bold text-lg">Day: {item?.day}</h2>
                        {item.places.map((place,index)=>(
                            <div className="my-3">
                                <h2 className="font-medium text-sm text-orange-600">{place.timeToVisit}</h2>
                                <PlaceCardItem place={place}/>
                                {/* <h2>{place.placeName}</h2> */}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlacesToVisit;