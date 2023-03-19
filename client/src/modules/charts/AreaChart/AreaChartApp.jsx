import '../styleSheet/style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from 'recharts';
import { Sidebar } from '../../../AdminDashboard/components/Sidebar';

export default function App() {
	const [list, setList] = useState([]);

	function allTeachers() {
		axios.get('http://localhost:3001/all-teachers').then((results) => {
			let teachers = results.data;
			let data = handleTeacherAndStudentCount(teachers);
			setList(data);
		});
	}
	function allStudents() {
		axios.get('http://localhost:3001/all-students').then((results) => {
			let students = results.data;
			let data = handleTeacherAndStudentCount(students);
			setList(data);
		});
	}

	function handleTeacherAndStudentCount(data) {
		let result = [];
		let obj = {
			id: '',
			count: '',
		};
		data.forEach((item, index) => {
			obj = {
				id: index + 1,
				name: item.Name,
				count: index + 1,
			};
			result.push(obj);
		});
		return result;
	}
	function handleOnChange(value) {
		if (value == 1) {
			allStudents();
		} else {
			allTeachers();
		}
	}

	return (
		<>
			<div className='d-flex'>
				<Sidebar />
				<div className='flex-direction-column'>
					<div className='row'>
						<div className='col-sm-3'>
							<select
								class='form-select m-2'
								onChange={(e) => handleOnChange(e.target.value)}>
								<option disabled>select menu</option>
								<option value={1}>Student</option>
								<option value={2} onChange={() => allTeachers()}>
									Teacher
								</option>
							</select>
						</div>
					</div>
					<AreaChart
						width={800}
						height={500}
						data={list}
						margin={{
							top: 10,
							right: 30,
							left: 0,
							bottom: 0,
						}}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='name' />
						<YAxis />
						<Tooltip />
						<Area type='monotone' dataKey='count' stroke='#8884d8' fill='#8884d8' />
					</AreaChart>
				</div>
			</div>
		</>
	);
}
