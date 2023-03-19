import React, { useEffect, useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { COLUMN_NAMES } from './constants';
import { BrowserCookie } from '../../helpers/BrowserCookies';
import Navbar from '../../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { tasks } from "./tasks";

import './style.css';
import axios from 'axios';

const MovableItem = ({
	name,
	index,
	currentColumnName,
	moveCardHandler,
	setItems,
	task,
	description,
	assignedByTeacher,
	taskDateAndTime,
	teacherList,
	getTasks,
	callMyprofile,
}) => {
	const alert = (text) => toast(text);
	const changeItemColumn = (currentItem, columnName) => {
		const handleUpdateTask = () => {
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
							callMyprofile();
						} else {
							alert(
								`Please enter name is ${task.name} or description is ${task.description} or student is ${task.selected_student_id}`
							);
						}
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
				alert('Please enter the valid data');
			}
		};
		if (currentItem._id === task._id) {
			task.column = columnName;
			task.task_status = columnName;
			if (task.column === 'DONE') {
				task.task_status = 'COMPLETE';
			}
			handleUpdateTask(currentItem);
		} else {
			task.column = task.column;
			task.task_status = task.task_status;
		}
		// setItems((prev) => [...prev, task]);

		// setItems((prevState) => {
		//
		//     return prevState.map((e) => {
		//         return {
		//             ...e,
		//             column: e._id === currentItem._id ? columnName : e.column
		//         };
		//     });
		// });
	};

	const handleTeacherName = (teacherId) => {
		let currentTeacherName = {};
		teacherList.forEach((teacher) => {
			if (teacher._id === teacherId) {
				currentTeacherName = teacher;
			}
		});
		return currentTeacherName;
	};

	const ref = useRef(null);

	const [, drop] = useDrop({
		accept: 'Our first type',
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return;
			}
			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			// Get vertical middle
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			// Determine mouse position
			const clientOffset = monitor.getClientOffset();
			// Get pixels to the top
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%
			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			// Time to actually perform the action
			moveCardHandler(dragIndex, hoverIndex);
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: 'Our first type',
		item: { index, name, currentColumnName },
		end: (item, monitor) => {
			const dropResult = monitor.getDropResult();

			if (dropResult) {
				const { name } = dropResult;
				const { DO_IT, IN_PROGRESS, DONE } = COLUMN_NAMES;
				switch (name) {
					case IN_PROGRESS:
						changeItemColumn(task, IN_PROGRESS);
						break;
					case DONE:
						changeItemColumn(task, DONE);
						break;
					case DO_IT:
						changeItemColumn(task, DO_IT);
						break;
					default:
						break;
				}
			}
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const opacity = isDragging ? 0.4 : 1;

	drag(drop(ref));

	return (
		<div ref={ref} className='movable-item row' style={{ opacity }} key={task.id}>
			<ToastContainer />
			<div className='col-sm-12 fw-bold pe-1'>{name}</div>
			<div className='col-sm-12'>{description}</div>
			<div className='col-sm-12 pe-1'>
				<span className='fw-bold'>Teacher:</span>{' '}
				{handleTeacherName(assignedByTeacher).Name}
			</div>
			<div className='col-sm-12'>{taskDateAndTime}</div>
		</div>
	);
};

const Column = ({ children, className, title }) => {
	const [{ isOver, canDrop }, drop] = useDrop({
		accept: 'Our first type',
		drop: () => ({ name: title }),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
		// Override monitor.canDrop() function
		canDrop: (item) => {
			return true;
		},
	});

	const getBackgroundColor = () => {
		if (isOver) {
			if (canDrop) {
				return 'rgb(188,251,255)';
			} else if (!canDrop) {
				return 'rgb(255,188,188)';
			}
		} else {
			return '';
		}
	};

	return (
		<div
			ref={drop}
			className={className}
			style={{ backgroundColor: getBackgroundColor() }}>
			<p>{title}</p>
			{children}
		</div>
	);
};

export const Kanbanboard = () => {
	// let tasks = [];
	let [logined_person_id] = useState('');
	// const [tasks, setTasks] = useState([]);
	const [teacherList, setTeacherList] = useState([]);
	const [items, setItems] = useState([]);
	const { DO_IT, IN_PROGRESS, DONE } = COLUMN_NAMES;

	useEffect(() => {
		callMyprofile();
		TeachersList();
	}, []);

	// useEffect(() => {
	//     if (tasks.length > 0) {
	//         let allTasks = [...tasks];
	//         console.log('setItem', allTasks);
	//         setItems(allTasks);
	//     }
	// }, [tasks]);

	const handleSetItem = (tasks) => {
		if (tasks.length > 0) {
			setItems(tasks);
		}
	};

	useEffect(() => {
		console.log('item hoon', items);
	}, [items]);

	const callMyprofile = function () {
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
					if (response.status === 200) {
						let Data = response.data;
						logined_person_id = response.data._id;
						getTasks();
					}
					// if (Data.TeachingExperience) {
					//     navigate("/teacherprofile");
					// } else if (Data.UserName) {
					//     return navigate('/dashboard');
					// }
					// setUserData(Data);
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (err) {
			console.log(err);
		}
	};

	const taskFormate = (allTasksFromDb) => {
		let allTasks = [];
		allTasksFromDb.forEach((task) => {
			if (logined_person_id === task.selected_student_id) {
				allTasks.push(task);
			}
		});
		return allTasks ? allTasks : [];
	};

	// const taskFormate = (allTasksFromDb)=> {
	//     let result = [];

	//     const key = 'TeachingSubject';

	//     const arrayUniqueByKey = [...new Map(allTasksFromDb.map(item =>
	//         [item[key], item])).values()];

	//     if (arrayUniqueByKey.length > 0) {
	//         setSubjectList(arrayUniqueByKey);
	//     }

	// }

	const getTasks = async () => {
		let finalTasks = [];
		axios
			.get('http://localhost:3001/all-tasks')
			.then((results) => {
				if (results.status === 200) {
					// setTask()
					finalTasks = taskFormate(results.data);
					handleSetItem(finalTasks);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const TeachersList = async function () {
		axios.get('http://localhost:3001/all-teachers').then((results) => {
			let teachers = results.data;
			setTeacherList(teachers);
		});
	};

	const moveCardHandler = (dragIndex, hoverIndex) => {
		const dragItem = items[dragIndex];

		if (dragItem) {
			setItems((prevState) => {
				const coppiedStateArray = [...prevState];

				// remove item by "hoverIndex" and put "dragItem" instead
				const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

				// remove item by "dragIndex" and put "prevItem" instead
				coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

				return coppiedStateArray;
			});
		}
	};
	const returnItemsForColumn = (columnName) => {
		return (
			items.length > 0 &&
			items !== undefined &&
			items
				.filter((item) => item.column === columnName)
				.map((item, index) => (
					<MovableItem
						key={item.id}
						name={item.name}
						currentColumnName={item.column}
						setItems={setItems}
						index={index}
						moveCardHandler={moveCardHandler}
						task={item}
						description={item.description}
						assignedByTeacher={item.login_teacher_id}
						taskDateAndTime={item.task_assigned_date_and_time}
						teacherList={teacherList}
						getTasks={getTasks}
						callMyprofile={callMyprofile}
					/>
				))
		);
	};

	return (
		<>
			<Navbar />
			<div className='container-react-dnd' id='kanban-board'>
				<DndProvider backend={HTML5Backend}>
					<Column title={DO_IT} className='column do-it-column'>
						{returnItemsForColumn(DO_IT)}
					</Column>
					<Column title={IN_PROGRESS} className='column in-progress-column'>
						{returnItemsForColumn(IN_PROGRESS)}
					</Column>
					<Column title={DONE} className='column done-column'>
						{returnItemsForColumn(DONE)}
					</Column>
				</DndProvider>
			</div>
		</>
	);
};
