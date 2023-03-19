import { React, useState, useEffect } from 'react'
import { Sidebar } from './Sidebar'
import Axios from 'axios'
import { AdminFooter } from './AdminFooter';

const Library = () => {
    const [File, setFile] = useState()
    const [BookName, setBookName] = useState('')
    const [Class, setClass] = useState('')
    const [Semester, setSemester] = useState('')
    const [ListOfBooks, setListOfBooks] = useState([])
    const [Image, setImage] = useState()
    useEffect(() => {
        ListOfAllBooks()
    }, [])
    const ListOfAllBooks = async function () {
        try {
            Axios.get('http://localhost:3001/all-book').then((results) => {
                let Books = results.data;
                setListOfBooks(Books);
            })
        } catch (error) {
            console.error(error)
        }
    }



    const save = (e) => {
        e.preventDefault();
        const bookData = new FormData();
        bookData.append('BookName', BookName);
        bookData.append('Class', Class);
        bookData.append('Semester', Semester);
        bookData.append("image", Image)
        bookData.append("file", File)
        if (File) {
            try {
                Axios.post("http://localhost:3001/add-book", bookData).then((response) => {
                    if (response.status === 200) {
                        setBookName('')
                        setClass('')
                        setSemester('')
                        window.alert('Your Book is Successfully Uploaded !')
                    } else {
                        return window.alert("Your Book is not upload");
                    }
                }).catch((error) => {
                    console.error(error);
                })
            } catch (e) {
                console.error(e);
            }
        } else {
            window.alert("Do you Upload Your Book File ?")
        }
    }
    return (
        <>
            <div className='d-flex'>
                <Sidebar />
                <div className='container'>
                    <div className='THeading d-flex align-items-center justify-content-center text-white'>
                        <h4>Library</h4>
                    </div>
                    <div className="containers py-4">
                        <div className="screen">
                            <div className="screen__content">
                                <form className="loginL">
                                    <h3 className="Auth-form-title">Add a Book</h3>
                                    <div className="login__field">
                                        <i className="login__icon fa-regular fa-user"></i>
                                        <input
                                            type="text"
                                            className="login__input"
                                            placeholder="Book Name"
                                            name="BookName"
                                            value={BookName}
                                            onChange={(event) => setBookName(event.target.value)}
                                        />
                                    </div>
                                    <div className="login__field">
                                        <i className="login__icon fa-solid fa-map-pin"></i>
                                        <input
                                            type="text"
                                            className="login__input"
                                            placeholder="Class"
                                            name='Class'
                                            value={Class} onChange={(event) => setClass(event.target.value)}
                                        />
                                    </div>
                                    <div className="login__field">
                                        <i className="login__icon fa-regular fa-envelope"></i>
                                        <input
                                            type="text"
                                            className="login__input"
                                            placeholder="Semester(If Have)"
                                            name='Smester'
                                            value={Semester}
                                            onChange={(event) => setSemester(event.target.value)}
                                        />
                                    </div>
                                    <div className="login__field">
                                        <label>Featured Image(Size: 300x300)</label>
                                        <input id="images" type="file" name='image'
                                            onChange={(event) => { setImage(event.target.files[0]) }}
                                        />
                                    </div>
                                    <div className="login__field">
                                        <label>Your Book</label>
                                        <input id="files" type="file" name='file'
                                            onChange={(event) => { setFile(event.target.files[0]) }}
                                        />
                                    </div>

                                    <div className="d-grid gap-2 mt-3">
                                        <button type="submit" className="formbtn"
                                            onClick={save}
                                        >
                                            UPLOAD
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="screen__background">
                                <span className="screen__background__shape screen__background__shape4"></span>
                                <span className="screen__background__shape screen__background__shape3"></span>
                                <span className="screen__background__shape screen__background__shape2"></span>
                                <span className="screen__background__shape screen__background__shape1"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <AdminFooter />
        </>
    )
}

export default Library