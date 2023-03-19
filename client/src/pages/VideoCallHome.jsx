import React, { useEffect, useState } from 'react';
import { useSocket } from '../providers/Socket';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import '../providers/styles.css';

const VideoCallHome = () => {
	const { socket } = useSocket();
	const [email, setEmail] = useState();
	const [roomId, setRoomId] = useState();
	const navigate = useNavigate();
	const handleJoinRoom = () => {
		socket.emit('join-room', { emailId: email, roomId });
	};

	const handleJoinedRoom = useCallback(
		({ roomId }) => {
			navigate(`/room/${roomId}`);
		},
		[navigate]
	);

	useEffect(() => {
		socket.on('joined-room', handleJoinedRoom);
		return () => {
			socket.off('joined-room', handleJoinedRoom);
		};
	}, [handleJoinedRoom, socket]);

	// socket.emit("join-room", { roomId: "1", emailId: "haiderali@gmail.com" });
	return (
		<div className='homepage-container'>
			<div className='input-container'>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type='email'
					placeholder='Enter your email here'
				/>
				<input
					value={roomId}
					onChange={(e) => setRoomId(e.target.value)}
					type='text'
					placeholder='Enter your room no'
				/>
				<button onClick={handleJoinRoom} className='btn btn-primary'>
					Enter your room
				</button>
			</div>
		</div>
	);
};

export default VideoCallHome;
