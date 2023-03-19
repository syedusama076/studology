import { React, useEffect, useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import img1 from '../../images/11.png';
import img2 from '../../images/12.png';
import img3 from '../../images/13.png';
import img4 from '../../images/14.png';
import img5 from '../../images/15.png';
const LibraryPage = () => {
    useEffect(() => {
    }, []);
    const [ListOfClass, setListOfClass] = useState([
        { _id: 1, Name: '9th', img: img1 },
        { _id: 2, Name: '10th', img: img2 },
        { _id: 3, Name: '11th', img: img3 },
        { _id: 4, Name: '12th', img: img4 },
        { _id: 5, Name: 'University Level', img: img5 }
    ]);
    return (
        <>
            <div><Navbar /></div>
            <div className="LibraryBanner">
                <h1 className="text-center text-white">Our Library</h1>
            </div>
            <div id="cards_landscape_wrap-2">
                <div className="container">
                    <div className="row">
                        {
                            ListOfClass.map((Class) => {
                                const route = '/library/' + Class.Name;
                                return (
                                    // <div key={Class._id} className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                                    //     <div className="card-flyer">
                                    //         <div className="text-box">
                                    //             <a href={route}>
                                    //                 <div className="image-box">
                                    //                     <img
                                    //                         width="300"
                                    //                         height="300"
                                    //                         src={Class.img}
                                    //                         alt=""
                                    //                     />
                                    //                 </div>
                                    //             </a>
                                    //             <div className="text-container">
                                    //                 <h6 className="text-center">{Class.Name}</h6>
                                    //             </div>
                                    //         </div>
                                    //     </div>
                                    // </div>
                                    <div key={Class._id} class="card mx-2" style={{ width: "22rem", height: "450px", margin: "5px" }}>
                                        <img src={Class.img} class="card-img-top" alt="..." />
                                        <div class="card-body">
                                            <h5 class="card-title">{Class.Name}</h5>
                                            <a href={route} class="btn btn-primary text-white">Check books</a>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
            <div><Footer /></div>
        </>
    );
};

export default LibraryPage;
