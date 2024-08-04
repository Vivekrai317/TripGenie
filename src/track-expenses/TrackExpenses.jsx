import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
function TrackExpenses(){
    return(
        <div className="flex flex-col items-center gap-9 mx-56">
            <h1 className="text-[54px] font-extrabold text-center mt-14">
                <span className="text-[#8cb6bc]">Travel smart and stay on budget</span>
                - track every trip expense with ease using our Expense Tracker App!</h1>
            <p className="text-gray-500 text-xl text-center">Get detailed insights into your spending habits and make informed decisions for future trips.</p>
            <Link to={'https://github.com/Vivekrai317/Batua'} target='_blank'>
                <Button className='txt'>Click Here</Button>
            </Link>
        </div>
    )
}
export default TrackExpenses;