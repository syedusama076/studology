import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useMemo } from 'react';
import { createContext } from 'react';

const PeerContext = createContext(null);

export const usePeer = () => useContext(PeerContext);

export const PeerProvider = (props) => {
	const [remoteStream, setRemoteStream] = useState(null);
	const peer = useMemo(
		() =>
			new RTCPeerConnection({
				iceServers: [
					{
						urls: ['stun:stun.l.google.com:19302', 'stun:global.stun.twilio.com:3478'],
					},
				],
			}),
		[]
	);

	const createOffer = async () => {
		debugger;
		const offer = await peer.createOffer();
		await peer.setLocalDescription(offer);
		return offer;
	};

	const createAnswere = async (offer) => {
		debugger;
		await peer.setRemoteDescription(offer);
		const answer = await peer.createAnswer();
		await peer.setLocalDescription(answer);
		return answer;
	};

	const setRemoteAns = async (ans) => {
		await peer.setRemoteDescription(ans);
	};

	function sendStream(stream) {
		debugger;
		const tracks = stream.getTracks();
		for (const track of tracks) {
			peer.addTrack(track, stream);
		}
	}

	const handleTrackEvent = useCallback((event) => {
		const streams = event.streams;
		setRemoteStream(streams[0]);
	}, []);

	useEffect(() => {
		peer.addEventListener('track', handleTrackEvent);

		return () => {
			peer.removeEventListener('track', handleTrackEvent);
		};
	}, [handleTrackEvent, peer]);

	return (
		<PeerContext.Provider
			value={{
				peer,
				createOffer,
				createAnswere,
				setRemoteAns,
				sendStream,
				remoteStream,
			}}>
			{props.children}
		</PeerContext.Provider>
	);
};
