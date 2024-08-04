import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import './Hero.css'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
export function Hero() {
    
    useGSAP(()=>{
        gsap.from(".img1",{
            delay:0.4,
            opacity:0,
            duration:1,
            y:60
        })
        gsap.from(".img2",{
            delay:0.4,
            opacity:0,
            duration:1,
            x:60
        })
        gsap.from(".img3",{
            delay:0.4,
            opacity:0,
            duration:1,
            y:-60
        })
        gsap.from(".txt",{
            delay:0.4,
            opacity:0,
            duration:1,
        })
    })
    return (
        <>
            <div className='flex flex-col items-center mx-56 gap-9'>
                <h1 className='txt font-extrabold text-[54px] text-center mt-12'>
                <span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips</h1>
                <p className='txt text-xl text-gray-800 text-center'>Build, personalize, and optimize your itineraries with our free AI trip planner. Designed for vacations, workations, and everyday adventures.</p>
                <Link to={'/create-trip'}>
                    <Button className='txt'>Get started</Button>
                </Link>
                <img className='img1' src='https://images.unsplash.com/photo-1512757776214-26d36777b513?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
                <img className='img2' src='https://img.freepik.com/free-photo/travel-concept-with-worldwide-landmarks_23-2149153263.jpg?3&w=740&t=st=1722597969~exp=1722598569~hmac=4cb9ed363d6ec37c38be8e2a4a0518fe79290b364b71d56daa12671553579292'/>
                <img className='img3' src='https://img.freepik.com/free-photo/travel-concept-with-baggage_23-2149153260.jpg?2&w=740&t=st=1722597822~exp=1722598422~hmac=bcb8cfe6a25a60f36e976642151314ca3febf59b0f30f077024849249b52bc8e'/>
            </div>
        </>
    )
}
