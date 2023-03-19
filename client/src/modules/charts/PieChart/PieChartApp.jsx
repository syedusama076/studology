import React, { useCallback, useState, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';
import { Sidebar } from '../../../AdminDashboard/components/Sidebar';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
	index,
}) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill='white'
			textAnchor={x > cx ? 'start' : 'end'}
			dominantBaseline='central'>
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};
export default function PieChartApp() {
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
	useEffect(() => {
		console.log(list);
	}, [list]);

	return (
		<>
			<div className='d-flex'>
				<Sidebar />
				<div className='flex-direction-column'>
					<div className='row'>
						<div className='col-sm-12'>
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
					<PieChart width={300} height={200}>
						<Pie
							dataKey='Count'
							startAngle={180}
							endAngle={0}
							data={list}
							cx={200}
							cy={200}
							outerRadius={80}
							fill='#8884d8'
							label
						/>
					</PieChart>
				</div>
			</div>
		</>
	);
}
