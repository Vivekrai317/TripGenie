export const SelectTravelesList=[
    {
        id:1,
        title:'Solo Travel',
        desc:'Embrace the journey: solo travel, limitless possibilities.',
        icon:'✈',
        people:'1'
    },
    {
        id:2,
        title:'Couple',
        desc:'Adventure awaits: travel together, cherish forever.',
        icon:'❤',
        people:'2'
    },
    {
        id:3,
        title:'Family',
        desc:'Family trips: where every mile brings us closer.',
        icon:'🏠',
        people:'3 to 5'
    },
    {
        id:4,
        title:'Friends',
        desc:'Unforgettable moments with the best crew.',
        icon:'⛵',
        people:'4 to 8'
    },
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Budget-Friendly',
        desc:'Affordable adventures, big experiences.',
        icon:'♟',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Smart spending, enriching travel.',
        icon:'🧠',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Sumptuous adventures, ultimate comfort.',
        icon:'💰',
    },
]

export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} people with a {budget} Budget, GIve me a Hotels options list with HotelName, HotelAddress, Price range per night in inr, hotel image url, geo coordinates, rating, descriptions, and suggest detailed itinerary with day, placeName, Place Details , Place image URL, Geo coordinates, ticket pricing, activities, time to visit each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'