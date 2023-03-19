import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserCookie } from '../../helpers/BrowserCookies';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import Navbar from '../../components/Navbar';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import './style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TaskMaker() {
	const alert = (text) => toast(text);
	const deleteError = (text) => toast.error(text);
	let initialState = {
		name: '',
		description: '',
		selected_student_id: '',
		login_teacher_id: '',
		task_status: 'DO_IT',
		column: 'DO_IT',
		task_assigned_date_and_time: '',
	};
	const [studentList, setStudentList] = useState([]);
	const [teacherList, setTeacherList] = useState([]);
	const [task, setTask] = useState(initialState);
	const [taskList, setTaskList] = useState([]);
	// const [filteredStudentList,setFilteredStudentList]

	useEffect(() => {
		LoginedTeacherProfile();
		getStudentList();
		getTeacherList();
		getTasks();
	}, []);

	const getStudentList = async () => {
		axios.get('http://localhost:3001/all-students').then((result) => {
			let students = result.data;
			setStudentList(students);
		});
	};

	const LoginedTeacherProfile = function () {
		try {
			const UserToken = BrowserCookie();
			const token = UserToken.UserToken;
			axios
				.get('http://localhost:3001/my-profile', {
					headers: {
						authorization: `${token}`,
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				})
				.then((response) => {
					// console.log(response);
					let Data = response.data;
					// if (Data.TeachingExperience) {
					//     navigate("/teacherprofile");
					// } else if (Data.UserName) {
					//     return navigate('/dashboard');
					// }
					setTask((prev) => ({
						...prev,
						login_teacher_id: Data._id,
					}));
					console.log(Data);
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (err) {
			console.log(err);
		}
	};

	const handleInput = (e) => {
		let value = e.target.value;
		let name = e.target.name;

		setTask((prev) => ({
			...prev,
			[name]: value,
		}));
		console.log(task);
	};

	const handleSelectedStudent = (e) => {
		let value = e.target.value;
		let name = e.target.name;

		setTask((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleValidation = () => {
		let result = [];
		taskList.forEach((item) => {
			if (
				item.selected_student_id === task.selected_student_id &&
				item.description === task.description
			) {
				result.push(item);
			}
		});
		return result;
	};

	const handleSaveTask = async () => {
		let validation = handleValidation();
		if (validation.length > 0) {
			alert('Task already assigned to this student');
		} else {
			if (
				task.name !== '' &&
				task.description !== '' &&
				task.login_teacher_id !== '' &&
				task.selected_student_id !== '' &&
				task.status !== ''
			) {
				let dateAndTime = new Date();
				task.task_assigned_date_and_time = dateAndTime.toUTCString();
				axios
					.post('http://localhost:3001/add-task', task)
					.then((response) => {
						if (response.status === 200) {
							alert('Task Assigned to student');
							setTask((prev) => ({
								...prev,
								name: '',
								description: '',
								selected_student_id: '',
								task_assigned_date_and_time: '',
							}));
							getTasks();
						} else {
							alert('Please enter the correct name or description');
						}
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
				alert('Please enter the valid data');
			}
		}
	};

	const getTasks = async () => {
		let tasks = [];
		axios
			.get('http://localhost:3001/all-tasks')
			.then((results) => {
				if (results.status === 200) {
					tasks = results.data;
					setTaskList(tasks);

					console.log('good bye');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const getTeacherList = async () => {
		let teachers = [];
		axios
			.get('http://localhost:3001/all-teachers')
			.then((results) => {
				if (results.status === 200) {
					teachers = results.data;
					setTeacherList(teachers);

					console.log('good bye');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getStudentNameById = (student_id) => {
		let currentStudent = {};
		studentList.forEach((student) => {
			if (student._id === student_id) {
				currentStudent = student;
			}
		});
		return currentStudent;
	};
	const getTeacherNameById = (teacher_id) => {
		let currentTeacher = {};
		teacherList.forEach((teacher) => {
			if (teacher._id === teacher_id) {
				currentTeacher = teacher;
			}
		});
		return currentTeacher;
	};
	const handleEdit = (task) => {
		setTask(task);
		console.log(task, 'e task');
	};
	const handleUpdateTask = () => {
		debugger;
		if (
			task.name !== '' &&
			task.description !== '' &&
			task.login_teacher_id !== '' &&
			task.selected_student_id !== '' &&
			task.task_status !== ''
		) {
			let dateAndTime = new Date();
			task.task_assigned_date_and_time = dateAndTime.toUTCString();
			axios
				.put('http://localhost:3001/update-task', task)
				.then((response) => {
					if (response.status === 200) {
						alert('Task updated to student');
						setTask((prev) => ({
							...prev,
							name: '',
							description: '',
							selected_student_id: '',
							task_assigned_date_and_time: '',
						}));
						getTasks();
					} else {
						window.alert('Please enter the correct name or description');
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			window.alert('Please enter the valid data');
		}
	};
	const handleDeleteTask = (task) => {
		if (window.confirm('Do you want to delete this task') === true) {
			const UserToken = BrowserCookie();
			const token = UserToken.UserToken;
			axios
				.delete(`http://localhost:3001/delete-task`, {
					headers: {
						authorization: `${token}`,
					},
					data: {
						source: task,
					},
				})
				.then((response) => {
					if (response.status === 200) {
						alert('Task deleted');
						setTask((prev) => ({
							...prev,
							name: '',
							description: '',
							selected_student_id: '',
							task_assigned_date_and_time: '',
						}));
						getTasks();
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			deleteError('not delete');
		}
	};

	function addNewTask() {
		setTask((prev) => ({
			...prev,
			name: '',
			description: '',
			selected_student_id: '',
			task_assigned_date_and_time: '',
		}));
	}

	return (
		<div className='container-xxl'>
			<Navbar />
			<ToastContainer />
			<Table className='table table-striped table-hover table-bordered table-scroll'>
				<Thead>
					<Tr>
						<Th>Name</Th>
						<Th>Description</Th>
						<Th>Student Name</Th>
						<Th>Assigned By Teacher</Th>
						<Th>Task Status</Th>
						<Th>Date & time by created</Th>
						<Th>Edit</Th>
						<Th>Delete</Th>
					</Tr>
				</Thead>
				<Tbody>
					{taskList.map((task, index) => {
						return (
							<Tr key={index}>
								<Td>{task.name}</Td>
								<Td>{task.description}</Td>
								<Td>{getStudentNameById(task.selected_student_id).Name}</Td>
								<Td>{getTeacherNameById(task.login_teacher_id).Name}</Td>
								<Td>{task.task_status}</Td>
								<Td>{task.task_assigned_date_and_time}</Td>
								<Td
									data-bs-toggle='modal'
									data-bs-target='#taskModal'
									onClick={() => handleEdit(task)}>
									<i className='fa-solid fa-pen-to-square text-primary d-flex justify-content-center'></i>
								</Td>
								<Td onClick={() => handleDeleteTask(task)}>
									<i className='fa-solid fa-trash text-danger text-center d-flex justify-content-center'></i>
								</Td>
							</Tr>
						);
					})}
					{/* <Td>Tablescon</Td> */}
				</Tbody>
			</Table>
			<button
				data-bs-toggle='modal'
				data-bs-target='#taskModalSave'
				type='submit'
				className='formbtn btn-sm'
				onClick={() => addNewTask()}>
				Task Assigned
			</button>

			<div
				className='modal fade'
				id='taskModal'
				tabIndex='-1'
				aria-labelledby='taskModalLabel'
				aria-hidden='true'>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h1 className='modal-title fs-5' id='taskModalLabel'>
								Update Task
							</h1>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'></button>
						</div>
						<div className='modal-body'>
							<form>
								<div className='row'>
									<div className='col-sm-6'>
										<label className='col-form-label'>Select Student:</label>
										<select
											className='form-select'
											name='selected_student_id'
											defaultValue={task.selected_student_id}
											onClick={(e) => handleSelectedStudent(e)}>
											<option defaultValue=' ' disabled>
												Select Student
											</option>
											{studentList.map((student) => {
												return (
													<option key={student._id} value={student._id}>
														{student.Name}
													</option>
												);
											})}
										</select>
									</div>
									<div className='col-sm-6'>
										<label className='col-form-label'>Task Name</label>
										<input
											type='text'
											className='form-control'
											placeholder='Task Name'
											name='name'
											value={task.name}
											onChange={(e) => handleInput(e)}
										/>
									</div>
								</div>
								<div className='row'>
									<div className='col-sm-12'>
										<label>Task</label>
										<textarea
											type='text'
											className='form-control'
											placeholder='Enter the task'
											name='description'
											value={task.description}
											onChange={(e) => handleInput(e)}
										/>
									</div>
								</div>
								{/* <div className="mb-3">
                                    <label for="message-text" className="col-form-label">Message:</label>
                                    <textarea className="form-control" id="message-text"></textarea>
                                </div> */}
							</form>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-sm btn-secondary'
								data-bs-dismiss='modal'>
								Close
							</button>
							<button
								type='button'
								className='btn btn-sm btn-primary'
								data-bs-dismiss='modal'
								onClick={() => handleUpdateTask()}>
								Update Task
							</button>
						</div>
					</div>
				</div>
			</div>
			<div
				className='modal fade'
				id='taskModalSave'
				tabIndex='-1'
				aria-labelledby='taskModalSaveLabel'
				aria-hidden='true'>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h1 className='modal-title fs-5' id='taskModalSaveLabel'>
								Update Task
							</h1>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'></button>
						</div>
						<div className='modal-body'>
							<form>
								<div className='row'>
									<div className='col-sm-6'>
										<label className='col-form-label'>Select Student:</label>
										<select
											className='form-select'
											name='selected_student_id'
											defaultValue={task.selected_student_id}
											onClick={(e) => handleSelectedStudent(e)}>
											<option defaultValue=' ' disabled>
												Select Student
											</option>
											{studentList.map((student) => {
												return (
													<option key={student._id} value={student._id}>
														{student.Name}
													</option>
												);
											})}
										</select>
									</div>
									<div className='col-sm-6'>
										<label className='col-form-label'>Task Name</label>
										<input
											type='text'
											className='form-control'
											placeholder='Task Name'
											name='name'
											value={task.name}
											onChange={(e) => handleInput(e)}
										/>
									</div>
								</div>
								<div className='row'>
									<div className='col-sm-12'>
										<label>Task</label>
										<textarea
											type='text'
											className='form-control'
											placeholder='Enter the task'
											name='description'
											value={task.description}
											onChange={(e) => handleInput(e)}
										/>
									</div>
								</div>
								{/* <div className="mb-3">
                                    <label for="message-text" className="col-form-label">Message:</label>
                                    <textarea className="form-control" id="message-text"></textarea>
                                </div> */}
							</form>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-sm btn-secondary'
								data-bs-dismiss='modal'>
								Close
							</button>
							<button
								type='button'
								className='btn btn-sm btn-primary'
								data-bs-dismiss='modal'
								onClick={() => handleSaveTask()}>
								Save Task
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// <div className="herologin">
//     <div className="Auth-form-container">
//         <div className="Auth-form">
//             <div className="Auth-form-content">
//                 <h3 className="Auth-form-title">Task Maker</h3>
//                 <div className="text-center fw-bold">
//                     Assgned Task To Student
//                     <div className="">
//                         <select className="form-select" name="selected_student_id" defaultValue={task.selected_student_id} onClick={(e) => handleSelectedStudent(e)}>
//                             <option defaultValue=" " disabled>Select Student</option>
//                             {studentList.map((student) => {
//                                 return (
//                                     <option key={student._id} value={student._id}>
//                                         {student.Name}
//                                     </option>
//                                 );
//                             })}
//                         </select>
//                     </div>
//                 </div>
//                 <div className="form-group mt-3">
//                     <label>Task Name</label>
//                     <input
//                         type="text"
//                         className="form-control mt-1"
//                         placeholder="Task Name"
//                         name="name"
//                         value={task.name}
//                         onChange={(e) => handleInput(e)}
//                     />
//                 </div>
//                 <div className="form-group mt-3">
//                     <label>Task</label>
//                     <textarea
//                         type="text"
//                         className="form-control mt-1"
//                         placeholder="Enter the task"
//                         name="description"
//                         value={task.description}
//                         onChange={(e) => handleInput(e)}
//                     />
//                 </div>
//                 <div className="d-grid gap-2 mt-3">
//                     <button type="submit" className="formbtn" onClick={() => handleSaveTask()}>
//                         Task Assigned
//                     </button>
//                 </div>
//                 <div className="d-flex justify-content-center align-items-spacing">
//                     {/* <p className="text-center mt-2 mx-2">
//                         Sign Up as a <Link to="/teacherregistration">Teacher</Link>
//                     </p>
//                     <p className="text-center mt-2 mx-2">
//                         Sign Up as a <Link to="/studentregistration">Student</Link>
//                     </p> */}
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
