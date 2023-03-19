import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Global from '../images/global.png'
import Navbar from './Navbar'
import Footer from './Footer'
import classroom from '../images/classroom.png'

const Home = () => {
    const navigate = useNavigate()
    return (
        <>
            <Navbar />
            <div className="hero">
                <div id='HeroID' className='d-flex flex-column align-items-center rounded'>
                    <div>
                        <p>Welcome</p>
                    </div>
                    <div>
                        <h1>Find Online Teachers for Free !</h1>
                    </div>
                </div>
            </div>
            <div className="container d-flex flex-row justify-content-center align-items-center my-4">
                <div>
                    <img src={classroom} alt="" />
                </div>
                <div className="container d-flex flex-column justify-content-center align-items-center my-4">
                    <div>
                        <h2>About Studology</h2>
                    </div>
                    <div className="d-flex justify-content-center align-item-center mx-4">
                        <p className='text-center'>Studology.com is a free website, trusted by thousands of students and teachers, throughout the world.
                            We are not the biggest, but we care the most. Even though you will visit other websites for similar services, we want you to remember us and tell your friends about us. We put the work to be that awesome for you.</p>
                    </div>
                    <button className='formbtn' onClick={() => { navigate('/about') }}>Read More</button>
                </div>
            </div>

            <div className="HBanners d-flex flex-column justify-content-center align-items-center bg-dark">
                <h2 className="text-white text-center">High Quality Teachers</h2>
                <h4 className="text-white text-center">ONLY 55.1% OF TEACHERS THAT APPLY MAKE THROUGH OUR APPLICATION PROCESS</h4>
            </div>
            <div className="container w-75">
                <div className="d-flex flex-row justify-content-between mt-4">
                    <div className='d-flex-row justify-content-center align-items-center'>
                        <p className='text-center'>9500+</p>
                        <h5 className='text-center'>Subject</h5>
                    </div>
                    <div className='d-flex-row justify-content-center align-items-center'>
                        <p className='text-center'>1500+</p>
                        <h5 className='text-center'>Skills</h5>
                    </div>
                    <div className='d-flex-row justify-content-center align-items-center'>
                        <p className='text-center'>1000+</p>
                        <h5 className='text-center'>Languages</h5>
                    </div>
                </div>
                <div>
                    <div className="container teacherLink d-flex flex-column justify-content-center align-items-center my-4 BHbanner">
                        <h2>What we do?</h2>
                        <p className='text-center'>Studology.com is a free website, trusted by thousands of students and teachers, all over the world.<br />
                            You can find local tutors, online teachers, and teachers to help with tutoring, coaching, assignments, academic projects, and dissertations for over 9500 subjects.</p>
                    </div>
                </div>
            </div>
            <div className="global d-flex flex-column p-3">
                <div className="d-flex justify-content-center align-item-center">
                    <h3 className="text-white text-center">Teachers from over 170 countries</h3>
                </div>
                <div className="d-flex justify-content-center align-item-center">
                    <img src={Global} alt="" srcSet="" />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home