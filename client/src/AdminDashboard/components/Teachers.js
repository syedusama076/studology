import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Axios from 'axios'
import UpdatePopup from '../../components/UpdatePopup';
import { Sidebar } from './Sidebar';
import { AdminFooter } from './AdminFooter';


const Teachers = () => {
    const [ListofTeachers, setListOfTeacher] = useState([])
    const [trigger, setTrigger] = useState();
    const navigate = useNavigate()
    const [editTeacher, setEditTeacher] = useState({
        _id: "",
        Name: "",
        Email: "",
        Phone: "",
        Age: "",
        Address: "",
        City: "",
        Education: "",
        TeachingExperience: "",
        OnlineTeachingExperience: "",
        Description: ""
    });
    useEffect(() => {
        TeacherList()
    }, [])
    function handleChange(event) {
        let value = event.target.value;
        let name = event.target.name;
        setEditTeacher((prev) => ({
            ...prev,
            [name]: value,
        }))
        // console.log(editTeacher);
    }

    function editHandler(Teacher) {
        // console.log(Teacher)
        setTrigger(true)
        setEditTeacher(Teacher);

    }
    const TeacherList = async function () {
        try {
            Axios.get('http://localhost:3001/all-teachers').then((results) => {
                let Teachers = results.data;
                setListOfTeacher(Teachers);
            })
        } catch (error) {
            console.error(error)
        }
    }

    const deleteTeacher = async function (_id) {
        // console.log(_id);
        let ConfDel = window.confirm("Are You Sure to Delete this Teacher?")
        if (ConfDel) {
            try {
                Axios.delete(`http://localhost:3001/teachers-delete/${_id}`).then((response) => {
                    console.log(response.data);
                    // let Teachers = results.data;
                    // setListOfTeacher(Teachers);
                    console.log("Data Delete");
                }).catch((errors) => {
                    console.log(errors)
                })
            } catch (error) {
                console.error(error);
            }
        }

    }
    async function UpdateData(editTeacher) {
        delete editTeacher.tokens
        try {
            Axios.put("http://localhost:3001/update-teacher", editTeacher).then((response) => {
                console.log(response);
                if (response.status === 200) {
                    window.alert("Success!");
                    let Teachers = response.data;
                    setListOfTeacher(Teachers);
                    setTrigger(false);
                } else if (response === 409) {
                    window.alert(response.data)
                }
            }).catch((err) => {
                console.log(err)
            })
        } catch (err) {
            console.error(err)
        }
    }
    async function addNewTeacher() {
        // console.log("New User Added")
        navigate("/dashboard/teacher-register")
    }
    return (
        <>
            <div className='d-flex'>

                <Sidebar />

                <div className="container d-flex flex-column mx-5">
                    <div>
                        <input className="formbtn mt-5 mx-1 my-4 float-end" type="button" onClick={addNewTeacher} value="Add Teacher" />
                    </div>
                    <div>
                        <div className='THeading d-flex align-items-center justify-content-center text-white'>
                            <h4>Teachers</h4>
                        </div>
                        <Table className="table table-striped table-hover table-bordered">
                            <Thead>
                                <Tr>
                                    <Th>Sr No</Th>
                                    <Th>Name</Th>
                                    <Th>Email</Th>
                                    <Th>Phone</Th>
                                    <Th>Gender</Th>
                                    <Th>Age</Th>
                                    <Th>Address</Th>
                                    <Th>Education</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    ListofTeachers.map((Teacher, index) => {
                                        return (
                                            <Tr key={index} value={Teacher._id}>
                                                <Td>
                                                    {
                                                        index = index + 1
                                                    }
                                                </Td>
                                                {
                                                    Teacher.Image?.url ?
                                                        <Td>
                                                            <img className='dashboardImg' src={Teacher.Image.url} alt="" />
                                                            {Teacher.Name}
                                                        </Td> :
                                                        <Td>
                                                            <img className='dashboardImg' src={Teacher.Image} alt="" />
                                                            {Teacher.Name}
                                                        </Td>
                                                }
                                                <Td>
                                                    {Teacher.Email}
                                                </Td>
                                                <Td>
                                                    {Teacher.Phone}
                                                </Td>
                                                <Td>
                                                    {Teacher.Gender}
                                                </Td>
                                                <Td>
                                                    {Teacher.Age}
                                                </Td>
                                                <Td>
                                                    {Teacher.Address}
                                                </Td>
                                                <Td>
                                                    {Teacher.Education}
                                                </Td>
                                                <Td>
                                                    <input className="formbtn mt-1 mx-1" type="button" onClick={() => editHandler(Teacher)} value="Edit" />
                                                    <button className="btn btn-danger" onClick={() => { deleteTeacher(Teacher._id) }}>Delete</button>
                                                </Td>
                                                <Td>
                                                    <UpdatePopup trigger={trigger} setTrigger={setTrigger}>
                                                        <div className="Auth-form-container py-4">
                                                            <form className="Auth-form">
                                                                <div className="Auth-form-content">
                                                                    <h3 className="Auth-form-title">UPDATE YOUR INFO</h3>
                                                                    <div className="form-group mt-3 mx-2">
                                                                        <label>Full Name</label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control mt-1"
                                                                            placeholder="e.g Jane Doe"
                                                                            name='Name'
                                                                            value={editTeacher.Name}
                                                                            onChange={(e) => handleChange(e)}
                                                                        />
                                                                    </div>
                                                                    <div className="form-group mt-3 mx-2">
                                                                        <label>Email</label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control mt-1"
                                                                            placeholder="e.g Jane Doe"
                                                                            name='Email'
                                                                            value={editTeacher.Email}
                                                                            onChange={(e) => handleChange(e)}
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex justify-content-between">
                                                                        <div className="mx-2">
                                                                            <div className="form-group mt-3">
                                                                                <label>Address</label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control mt-1"
                                                                                    placeholder="Address"
                                                                                    name='Address'
                                                                                    value={editTeacher.Address}
                                                                                    onChange={(event) => handleChange(event)}
                                                                                />
                                                                            </div>

                                                                            <div className="form-group mt-3">
                                                                                <label>Phone</label>
                                                                                <input
                                                                                    type="number"
                                                                                    className="form-control mt-1"
                                                                                    placeholder="Phone Number"
                                                                                    name='Phone'
                                                                                    value={editTeacher.Phone}
                                                                                    onChange={(event) => handleChange(event)}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mx-2">
                                                                            <div className="form-group mt-3">
                                                                                <label>Class</label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control mt-1"
                                                                                    placeholder="Class"
                                                                                    name='TeacherClass'
                                                                                    value={editTeacher.TeacherClass}
                                                                                    onChange={(event) => handleChange(event)}
                                                                                />
                                                                            </div>

                                                                            <div className="form-group mt-3">
                                                                                <label>Age</label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control mt-1"
                                                                                    placeholder="Age"
                                                                                    name='Age'
                                                                                    value={editTeacher.Age}
                                                                                    onChange={(event) => handleChange(event)}
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                    </div>

                                                                    <div className="d-grid gap-2 mt-3 mx-2">
                                                                        <button type="submit" className="formbtn"
                                                                            onClick={() => UpdateData(editTeacher)}
                                                                        >
                                                                            Update
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </UpdatePopup>
                                                </Td>
                                            </Tr>
                                        )
                                    })
                                }

                            </Tbody>
                        </Table>
                    </div>
                </div>
            </div>
            <AdminFooter />
        </>
    )
}

export default Teachers