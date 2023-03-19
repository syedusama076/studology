import React from 'react';
import { useSocket } from '../providers/Socket';
import { useEffect, useContext } from 'react';
import { usePeer } from '../providers/Peer';
import { useCallback } from 'react';
import { useState } from 'react';
import ReactPlayer from 'react-player';

const RoomPage = () => {
	const { socket } = useSocket();
	const {
		peer,
		createOffer,
		createAnswere,
		setRemoteAns,
		sendStream,
		remoteStream,
	} = usePeer();
	const [myStream, setMyStream] = useState(null);
	const [remoteEmailId, setRemoteEmailId] = useState(null);

	const handleNewUserJoined = useCallback(
		async (data) => {
			debugger;
			const { emailId } = data;
			console.log('user joined room', emailId);
			const offer = await createOffer();
			socket.emit('call-user', { emailId, offer });
			setRemoteEmailId(emailId);
		},
		[createOffer, socket]
	);

	const handleIncommingCall = useCallback(
		async (data) => {
			debugger;
			const { from, offer } = data;
			console.log('incomming call from', from, offer);
			const ans = await createAnswere(offer);
			socket.emit('call-accepted', { emailId: from, ans });
			setRemoteEmailId(from);
		},
		[createAnswere, socket]
	);

	const handleCallAccepted = useCallback(
		async (data) => {
			debugger;
			const { ans } = data;
			console.log('call accepted', ans);
			console.log('call accepted', data);
			await setRemoteAns(ans);
		},
		[setRemoteAns]
	);

	useEffect(() => {
		debugger;
		socket.on('user-joined', handleNewUserJoined);
		socket.on('incomming-call', handleIncommingCall);
		socket.on('call-accepted', handleCallAccepted);

		return () => {
			socket.off('user-joined', handleNewUserJoined);
			socket.off('incomming-call', handleIncommingCall);
			socket.off('call-accepted', handleCallAccepted);
		};
	}, [handleCallAccepted, handleIncommingCall, handleNewUserJoined, socket]);

	const getUserMediaStream = useCallback(async () => {
		debugger;
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: true,
			video: true,
		});
		setMyStream(stream);
	}, []);

	const handleNegotiationNeeded = useCallback(() => {
		debugger;
		const localOffer = peer.localDescription;
		socket.emit('call-user', { emailId: remoteEmailId, offer: localOffer });
	}, [peer.localDescription, remoteEmailId, socket]);

	useEffect(() => {
		getUserMediaStream();
	}, [getUserMediaStream]);

	useEffect(() => {
		peer.addEventListener('negotiationneeded', handleNegotiationNeeded);
		return () => {
			peer.removeEventListener('negotiationneeded', handleNegotiationNeeded);
		};
	}, [handleNegotiationNeeded]);

	// const handleNegosiation = useCallback(() => {
	//    socket.emit('call-user',{emailId: remoteEmailId,offer:localOffer})
	// },[peer.localDescription,remoteEmailId,socket])

	useEffect(() => {
		console.log(myStream);
		console.log(remoteStream, 'emstream');
	}, [myStream, remoteStream]);

	function handleSendStream() {
		debugger;
		sendStream(myStream);
	}

	return (
		<div className='room-page-container'>
			<h1>Room page</h1>
			<h4>you are connected {remoteEmailId}</h4>
			<button className='btn btn-success' onClick={() => handleSendStream()}>
				Send Stream
			</button>
			<ReactPlayer url={myStream} playing />
			<ReactPlayer url={remoteStream} playing />
		</div>
	);
};

export default RoomPage;
