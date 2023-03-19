import { React, useEffect, useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
const Books = () => {
  useEffect(() => {
    GetBook();
  }, []);
  const params = useParams();
  const { ClassName } = params;
  console.log(ClassName);
  const [ListOfBooks, setListOfBooks] = useState([]);
  const GetBook = async function () {
    const Class = ClassName;
    try {
      Axios.get(`http://localhost:3001/class-book/${Class}`).then((response) => {
        const allBooks = response.data;
        // console.log(allBooks);
        setListOfBooks(allBooks);

      }).catch((errors) => {
        console.log(errors);
      });
    } catch (error) {
      console.error(error);
    }
  };

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
              ListOfBooks.map((Book) => {
                return (
                  <div key={Book._id} className="card col-xs-12 col-sm-6 col-md-3 col-lg-3">
                    <div className="card-body">
                      <div className="text-box">
                        <a href={Book.FilePath} target='_blank'>
                          <div className="image-box">
                            <img
                              width="300"
                              height="300"
                              src={Book.ThumbnailPath}
                              alt=""
                            />
                          </div>
                        </a>
                        <div className="text-container mt-3">
                          <h6 className="text-center">{Book.BookName}</h6>
                          <p className="text-center">Class : {Book.Class}</p>
                          {Book.Semester ? <p className="text-center">Semester : {Book.Semester}</p> : ""}
                        </div>
                      </div>
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

export default Books



