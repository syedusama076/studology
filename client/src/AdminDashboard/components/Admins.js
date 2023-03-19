import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Axios from 'axios'
import UpdatePopup from '../../components/UpdatePopup';
import { Sidebar } from './Sidebar';
import { AdminFooter } from './AdminFooter';


const Admins = () => {

    useEffect(() => {
        StudentList()
    }, [])

    const StudentList = async function () {
        try {
            Axios.get('http://localhost:3001/all-students').then((results) => {
                let students = results.data;
                // setListOfStudent(students);
            })
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <>
            <div className='d-flex'>
                <div>
                    <Sidebar />
                </div>
                <div className="container d-flex flex-column mx-5">
                    <div>
                        <input className="formbtn mt-5 mx-1 my-4 float-end" type="button"
                            // onClick={addNewSt} 
                            value="Add Student" />
                    </div>
                    <div>
                        <div className='THeading d-flex align-items-center justify-content-center text-white'>
                            <h4>Students</h4>
                        </div>
                        <Table className="table table-striped table-hover table-bordered">
                            <Thead>
                                <Tr>
                                    <Th>Sr No</Th>
                                    <Th>Name</Th>
                                    <Th>Email</Th>
                                    <Th>Phone</Th>
                                    <Th>Age</Th>
                                    <Th>Address</Th>
                                    <Th>Student Class</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            {/* <Tbody>
                                {
                                    ListofStudents.map((student, index) => {
                                        return (
                                            <Tr key={index} value={student._id}>
                                                <Td>
                                                    {
                                                        index = index + 1
                                                    }
                                                </Td>
                                                <Td>
                                                    <img className='dashboardImg' src={student.Image} alt="" />
                                                    {student.Name}
                                                </Td>
                                                <Td>
                                                    {student.Email}
                                                </Td>
                                                <Td>
                                                    {student.Phone}
                                                </Td>
                                                <Td>
                                                    {student.Age}
                                                </Td>
                                                <Td>
                                                    {student.Address}
                                                </Td>
                                                <Td>
                                                    {student.StudentClass}
                                                </Td>
                                                <Td>
                                                    <input className="formbtn mt-1 mx-1" type="button" onClick={() => editHandler(student)} value="Edit" />
                                                    <button className="btn btn-danger" onClick={() => { deleteStudent(student._id) }}>Delete</button>
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
                                                                            value={editStudent.Name}
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
                                                                            value={editStudent.Email}
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
                                                                                    value={editStudent.Address}
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
                                                                                    value={editStudent.Phone}
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
                                                                                    name='StudentClass'
                                                                                    value={editStudent.StudentClass}
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
                                                                                    value={editStudent.Age}
                                                                                    onChange={(event) => handleChange(event)}
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                    </div>

                                                                    <div className="d-grid gap-2 mt-3 mx-2">
                                                                        <button type="submit" className="formbtn"
                                                                            onClick={() => UpdateData(editStudent)}
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

                            </Tbody> */}
                        </Table>
                    </div>
                </div>
            </div>
            <AdminFooter />
        </>
    )
}

export default Admins