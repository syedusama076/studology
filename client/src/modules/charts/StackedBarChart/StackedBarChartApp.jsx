import '../styleSheet/style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts';
import { Sidebar } from '../../../AdminDashboard/components/Sidebar';

export default function StackedBarChart() {
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
						top: 20,
						right: 30,
						left: 20,
						bottom: 5,
					}}>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='id' />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey='TeacherCount' stackId='a' fill='#8884d8' />
					<Bar dataKey='StudentCount' stackId='a' fill='#82ca9d' />
				</BarChart>
			</div>
		</div>
	);
}
