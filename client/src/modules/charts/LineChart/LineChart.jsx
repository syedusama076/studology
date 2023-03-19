import '../styleSheet/style.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sidebar } from '../../../AdminDashboard/components/Sidebar';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts';

// const data = [
// 	{
// 		name: 'Page A',
// 		uv: 4000,
// 		pv: 2400,
// 		amt: 2400,
// 	},
// 	{
// 		name: 'Page B',
// 		uv: 3000,
// 		pv: 1398,
// 		amt: 2210,
// 	},
// 	{
// 		name: 'Page C',
// 		uv: 2000,
// 		pv: 9800,
// 		amt: 2290,
// 	},
// 	{
// 		name: 'Page D',
// 		uv: 2780,
// 		pv: 3908,
// 		amt: 2000,
// 	},
// 	{
// 		name: 'Page E',
// 		uv: 1890,
// 		pv: 4800,
// 		amt: 2181,
// 	},
// 	{
// 		name: 'Page F',
// 		uv: 2390,
// 		pv: 3800,
// 		amt: 2500,
// 	},
// 	{
// 		name: 'Page G',
// 		uv: 3490,
// 		pv: 4300,
// 		amt: 2100,
// 	},
// ];

export default function LineChartApp() {
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
				Name: item.Name,
				Count: index + 1,
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
		<div className='d-flex'>
			<Sidebar />
			<div className='flex-direction-column'>
				<div className='row mt-2 mx-1'>
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
				<div className='mt-5'>
					<LineChart
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
						<XAxis dataKey='Name' />
						<YAxis dataKey='id' />
						<Tooltip />
						<Legend />
						<Line type='monotone' dataKey='Name' stroke='#8884d8' activeDot={{ r: 5 }} />
						<Line type='monotone' dataKey='Count' stroke='#82ca9d' activeDot={{ r: 1 }} />
					</LineChart>
				</div>
			</div>
		</div>
	);
}
