import '../styleSheet/style.css';
import React from 'react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Sidebar } from '../../../AdminDashboard/components/Sidebar';

// const data = [
//     {
//         name: "Page A",
//         uv: 4000,
//         pv: 2400,
//         amt: 2400
//     },
//     {
//         name: "Page B",
//         uv: 3000,
//         pv: 1398,
//         amt: 2210
//     },
//     {
//         name: "Page C",
//         uv: 2000,
//         pv: 9800,
//         amt: 2290
//     },
//     {
//         name: "Page D",
//         uv: 2780,
//         pv: 3908,
//         amt: 2000
//     },
//     {
//         name: "Page E",
//         uv: 1890,
//         pv: 4800,
//         amt: 2181
//     },
//     {
//         name: "Page F",
//         uv: 2390,
//         pv: 3800,
//         amt: 2500
//     },
//     {
//         name: "Page G",
//         uv: 3490,
//         pv: 4300,
//         amt: 2100
//     }
// ];

export default function App() {
	const [list, setList] = useState([]);

	useEffect(() => {
		allTeachers();
	}, []);

	const allTeachers = async function () {
		axios.get('http://localhost:3001/all-teachers').then((results) => {
			let teachers = results.data;
			allStudents(teachers);
		});
	};
	const allStudents = async function (teachers) {
		axios.get('http://localhost:3001/all-students').then((results) => {
			let students = results.data;
			let data = handleTeacherAndStudentCount(students, teachers);
			setList(data);
		});
	};

	function handleTeacherAndStudentCount(students, teachers) {
		let result = [];
		let obj = {
			id: '',
			TeacherCount: '',
			StudentCount: '',
		};
		if (teachers.length > 0 || students.length > 0) {
			if (teachers.length > students.length) {
				teachers.forEach((student, index) => {
					obj = {
						id: index + 1,
						StudentCount: teachers.length - index,
						TeacherCount: index + 1,
					};
					result.push(obj);
				});
			} else {
				students.forEach((student, index) => {
					obj = {
						id: index + 1,
						StudentCount: index + 1,
						TeacherCount: teachers.length - index,
					};
					result.push(obj);
				});
			}
		}
		return result;
	}

	return (
		<div className='d-flex'>
			<Sidebar />
			<div style={{ marginTop: 100 }}>
				<BarChart
					width={850}
					height={400}
					data={list}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='StudentCount' />
					<YAxis dataKey='TeacherCount' />
					<Tooltip />
					<Legend />
					<Bar dataKey='TeacherCount' fill='#8884d8' />
					<Bar dataKey='StudentCount' fill='#82ca9d' />
				</BarChart>
			</div>
		</div>
	);
}
