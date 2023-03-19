import React from 'react'
import { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import Navbar from './Navbar'
import Footer from './Footer'

const Contact = () => {
    const [FullName, setFullName] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const [Message, setMessage] = useState("");
    // let ContactFormData = {
    //     Name: FullName,
    //     Email: Email,
    //     Phone: Phone,
    //     Message: Message
    // }
    // console.log(ContactFormData);
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        const email = emailjs.sendForm('studology_project', 'template_z9c0uy9', form.current, 'f_FCkNvrppdzZAlCz')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        if (email) {
            window.alert('Email sent successfully.');
            setFullName('')
            setEmail('')
            setPhone('')
            setMessage('')
        } else {
            window.alert('Email is not sent successfully.');
        }
    };
    return (
        <>
            <Navbar />
            <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3399.599150691998!2d74.30197171499708!3d31.56261378135552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39191cac3aaf46b9%3A0xc68fa8c8500e1e45!2sGovt.%20M.A.O.%20Graduate%20College!5e0!3m2!1sen!2s!4v1659880865553!5m2!1sen!2s" width="100%" height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title='Map' />
            </div>
            <div className="container d-flex mx-2 d-flex justify-content-between aligned-center contactpage">
                <div className="Auth-form-container py-4">
                    <form className="contact-form" ref={form} onSubmit={sendEmail}>
                        <div className="Auth-form-content">
                            <h3 className="Auth-form-title">Contact Us</h3>
                            <div className="mx-2 d-flex justify-content-between">
                                <div className="form-group mx-2">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control mt-1"
                                        placeholder="e.g Jane Doe"
                                        name="name"
                                        value={FullName}
                                        onChange={(event) => setFullName(event.target.value)}
                                    />
                                </div>
                                <div className="form-group mx-2">
                                    <label>Phone</label>
                                    <input
                                        type="number"
                                        className="form-control mt-1"
                                        placeholder="Phone Number"
                                        name="phone"
                                        value={Phone}
                                        onChange={(event) => setPhone(event.target.value)}
                                    />
                                </div>
                                <div className="form-group mx-2">
                                    <label>Email address</label>
                                    <input
                                        type="email"
                                        className="form-control mt-1"
                                        placeholder="Email Address"
                                        name="email"
                                        value={Email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mx-2">
                                <div className="form-group mx-2">
                                    <label>Message</label>
                                    <textarea className="form-control mt-1" placeholder="Your Message" name="message" id="" cols="65" rows="10" value={Message} onChange={(event) => setMessage(event.target.value)}></textarea>
                                </div>
                            </div>
                            <div className="d-grid gap-2 mt-3 mx-3">
                                <button type="submit" className="formbtn">
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="contactdetails py-4">
                    <div>
                        <h3 className='Auth-form-title'>Contact details</h3>
                    </div>
                    <div className="Contactdata p-4 m-1">
                        <h6><i className="fa-solid fa-envelope-circle-check"></i> Studology@gmail.com</h6>
                    </div>
                    <div className="Contactdata p-4 m-1">
                        <h6><i className="fa-solid fa-mobile-screen"></i> (+92) 300 1234567</h6>
                    </div>
                    <div className="Contactdata p-4 m-1">
                        <h6><i className="fa-solid fa-location-crosshairs"></i> Govt. M.A.O College Lahore.</h6>
                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}

export default Contact