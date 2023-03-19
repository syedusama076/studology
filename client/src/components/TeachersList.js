import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'
import Footer from './Footer'
import teacherslistpic from '../images/teacherslistpic.png'
const TeachersList = () => {
    const [ListOfTeachers, setListOfTeachers] = useState([]);
    const [filteredList, setFilterList] = useState([]);
    const [subjectList, setSubjectList] = useState([]);
    const [show, setShow] = useState(false);
    // const [show, setShow] = useState(false);
    useEffect(() => {
        TeachersList();
    }, [])

    // function mySearchFunctionSubject(value) {
    //     const results = ListOfTeachers.filter(subject => subject.Subject.replace(/ /g, '').toLowerCase().includes(value.toLowerCase()))
    //     setFilterList(results)
    // }

    function mySearchFunctionEducation(value) {
        const results = ListOfTeachers.filter(education => education.Education.replace(/ /g, '').toLowerCase().includes(value.toLowerCase()))
        if (value !== "") {
            setListOfTeachers(results)
            if (results.length > 0) {
            }
            else if (results.length === 0 || results.length < 0) {
                setShow(true)
            }
        }
        else if (value === "") {
            TeachersList()
            setShow(false)
        }
    }
    function mySearchFunctionSubject(value) {
        const results = ListOfTeachers.filter(education => education.TeachingSubject.replace(/ /g, '').toLowerCase().includes(value.toLowerCase()))
        if (value !== "") {
            setListOfTeachers(results)
        }
        else if (value === "") {
            TeachersList()
        }
    }

    const TeachersList = async function () {
        Axios.get('http://localhost:3001/all-teachers').then((results) => {
            let teachers = results.data;
            setListOfTeachers(teachers);
            setFilterList(teachers)
        })
    }
    useEffect(() => {
        if (ListOfTeachers.length > 0) {
            disticntObject()
        }
    }, [ListOfTeachers])
    function disticntObject() {
        let result = [];


        const key = 'TeachingSubject';

        const arrayUniqueByKey = [...new Map(filteredList.map(item =>
            [item[key], item])).values()]
        // result.push(arrayUniqueByKey)
        // ListOfTeachers.forEach((subject) => {

        //     if (ListOfTeachers[subject.TeachingSubject] !== subject.TeachingSubject) {
        //         result.push(subject)
        //     }
        //     return result ? result : []
        // })
        if (arrayUniqueByKey.length > 0) {
            setSubjectList(arrayUniqueByKey)
        }

    }

    function handleSort(teacher) {
        let result = [];
        filteredList.forEach((items) => {
            if (teacher.TeachingSubject === items.TeachingSubject) {
                result.push(items);
            }
            // else {
            //     TeachersList()
            // }
            return result ? result : []
        })
        setListOfTeachers(result);
    }

    return (
        <>
            <Navbar />
            <div className="teacherlist">
                <div className="TeachersListBanner">
                    <h1 className="text-center text-white">Teachers List</h1>
                </div>
                <div className="row">
                    <div className="leftbar col-sm-3" style={{ padding: "50px", fontWeight: "600" }}>
                        <h4 style={{ fontSize: "20px", fontStyle: "italic" }}>Tags for Search Teachers</h4>
                        <div onClick={TeachersList} className="subjects">All Subject Teachers</div>
                        {subjectList.map((teacher, index) => {
                            return (
                                <div key={index} className="subjects" onClick={() => handleSort(teacher)}>
                                    {teacher.TeachingSubject}
                                </div>
                            )
                        })}
                        {/* {disticntObject()} */}
                    </div>
                    <div className="teacher-sidebar col-sm-9">
                        <div className="mx-6 d-flex justify-content-center">
                            <div className='form-group mx-1 col-sm-3'>
                                <input className="form-control ml-6" placeholder="Teacher search by Education" onChange={e => mySearchFunctionEducation(e.target.value)} />
                            </div>
                            <div className='form-group mx-1 col-sm-3'>
                                <input className="form-control ml-6" placeholder="Teacher search by Subject" onChange={e => mySearchFunctionSubject(e.target.value)} />
                            </div>
                        </div>
                        {ListOfTeachers.map((val, index) => {
                            const ProfileLink = `/teacherslist/${val._id}`
                            return (
                                <div key={val._id}>
                                    {show === false ?
                                        <div className="teachers-list" >
                                            <div className="container">
                                                <Link to={ProfileLink}>
                                                    <div className="TeacherCard d-flex">
                                                        <div className="pic">
                                                            {
                                                                val.Image.url ?
                                                                    <img className='pic-tlist' src={val.Image.url} alt="" width="200" height="200" /> :
                                                                    <img className='pic-tlist' src={val.Image} alt="" width="200" height="200" />
                                                            }

                                                        </div>
                                                        <div className="detail">
                                                            <h6 className="education">{val.Education}</h6>
                                                            <h3 className="name">{val.Name}</h3>
                                                            <p className="description">From {val.City}</p>
                                                            <p className="description">{val.Description}</p>
                                                            <p className="teachingSubject">{val.TeachingSubject}</p>
                                                            <div className="d-flex justify-content-between">
                                                                <div className="gender"><b>Gender : </b>{val.Gender}</div>
                                                                <div className="age"><b>Age : </b>{val.Age}</div>
                                                            </div>
                                                            <div>
                                                                <div className="experience"><b>Online Teaching Experience: </b>{val.OnlineTeachingExperience}</div>
                                                                <div className="experience"><b>Physical Teaching Experience: </b>{val.TeachingExperience}</div>
                                                            </div>
                                                            <div>
                                                                <div className="phone"><b>Phone : </b>{val.Phone}</div>
                                                                <div className="email"><b>Email : </b>{val.Email}</div>
                                                            </div>
                                                            <div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                        : <div key={index}>notfound</div>}
                                </div>
                            )
                        })
                        }
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default TeachersList