import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components'

import MeetingService from './meeting/MeetingService'
import {muteOrUnmuteAudio, playOrStopVideo, sendMessage, shareScreen, stopAllVideoAudioMedia} from '../utils/MeetingsUtils';
import { v4 as uuidv4 } from 'uuid';
import { fetchOrCreateMeeting } from '../api/project';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Container = styled.div`

`

const MeetingsPage = (props) => {
  const activeProject = useSelector(state => state.activeProject);
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideoRef = useRef();
  const messageRef = useRef();
  const peersRef = useRef();
  const screenCaptureStream = useRef();
  const [meetingId, setMeetingId] = useState(''); //joined room id
  const [ isVideoMuted, setIsVideoMuted ] = useState(false);
  const [ isAudioMuted, setIsAudioMuted ] = useState(false);
  const [webcamStream, setWebCamStream ] = useState(null); //own webcam stream
  const [ messages, setMessages ] = useState([]); //all messages state after joining the room
  const navigate = useNavigate();
  const currentPeers = useRef([]);

  useEffect(() => {
    const initMeeting = async () => {
      try{
        const { data } = await fetchOrCreateMeeting(activeProject.id);
        const { meetingId } = data;
        setMeetingId(meetingId);

        const { socket, webcamStream } = await MeetingService.connectToSocketAndWebcamStream(localStorage.getItem('token'));
        socketRef.current = socket;
        setWebCamStream(webcamStream);

        MeetingService.setupSocketListeners(socket, webcamStream, setPeers, screenCaptureStream.current, currentPeers.current, setMessages, meetingId);
      }catch(err){
        console.log(err);
        toast.error('Something has occurred, try again later!')
      }
    }

    initMeeting();

    return async () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      await stopAllVideoAudioMedia();
    };

  }, [activeProject]);

  // useEffect(() => {
  //   MeetingService.connectToSocketAndWebcamStream(localStorage.getItem("token"))
  //     .then(({ socket, webcamStream }) => {
  //       socketRef.current = socket;
  //       setWebCamStream(webcamStream);

  //       MeetingService.setupSocketListeners(socket, webcamStream, setPeers, screenCaptureStream.current, currentPeers.current, setMessages, roomId);
  //     });

  //     return async () => {
  //       socketRef.current.disconnect();
  //       await stopAllVideoAudioMedia();
  //     }
  // }, []);

  const stopAllVideoAudioMedia = async ()  => {
      //destroying previous stream(screen capture stream)
      const previousScreenCaptureStream = screenCaptureStream.current;
      if(previousScreenCaptureStream) {
          const previousScreenCaptureStreamTracks = previousScreenCaptureStream.getTracks();
          previousScreenCaptureStreamTracks.forEach(track => {
              track.stop();
          });
      }

      //destroying previous stream(webcam stream)
      const previousWebcamStream = webcamStream;
      if(previousWebcamStream) {
          const previousWebcamStreamTracks = previousWebcamStream.getTracks();
          previousWebcamStreamTracks.forEach(track => {
              track.stop();
          });
      }
  }

  const handleOnClickAudioToggle = () => {
    muteOrUnmuteAudio(webcamStream, isAudioMuted, setIsAudioMuted);
  }

  const handlePlayOrStopVideo = () => {
      playOrStopVideo(webcamStream, isVideoMuted, setIsVideoMuted);
  }

  const handleShareScreen = async () => {
      await shareScreen(peers, screenCaptureStream, webcamStream, peers, userVideoRef.current, setIsAudioMuted, setIsVideoMuted);
  }

  const handleSendMessage = (e) => {
      sendMessage(e, socketRef.current, roomId, messageRef.current);
  }

  const leaveMeeting = () => {
      navigate('/');
  };

  return (
    <div className="room row">
    <div className="videos col s10 p0">
        <div className="videos__users-video">
            <div id="video-grid">
                <video muted ref={userVideoRef} autoPlay playsInline />
                {console.log('peers', peers)}
                    {peers.map((peer) => (
                        <Video controls key={peer.peerId} peer={peer} />
                    ))}
            </div>
        </div>

        <div className="videos__controls">
            <div className="control">
                    <div onClick={handleOnClickAudioToggle} className="control__btn-container">
                    {isAudioMuted
                        ? <i className="unmute fas fa-microphone-slash" />
                        : <i className="fas fa-microphone" />
                    }
                    {isAudioMuted
                        ? <span>Unmute</span>
                        : <span>Mute</span>
                    }
                </div>
                <div onClick={handlePlayOrStopVideo} className="control__btn-container">
                    {isVideoMuted
                        ? <i className="stop fas fa-video-slash" />
                        : <i className="fas fa-video" />
                    }
                    {isVideoMuted
                        ? <span>Play Video</span>
                        : <span>Stop Video</span>
                    }
                </div>
            </div>
            <div onClick={handleShareScreen} className="control">
                <div className="control__btn-container">
                    <i className="fas fa-shield-alt" />
                    <span>Share Screen</span>
                </div>
            </div>
            <div onClick={leaveMeeting} className="control">
                <div className="control__btn-container">
                    <span className="leave_meeting">Leave Meeting</span>
                </div>
            </div>
        </div>
    </div>


    <div className="chat col s2 p0">
        <div className="chat__header">
            <h6>Chat</h6>
        </div>
        <div className="chat__msg-container">
            <ul className="messages">
                {messages.map((message, index) => (
                    <p key={index}>{message.name}({message.username}):{message.message}</p>
                ))}
            </ul>
        </div>
        <form  onSubmit={handleSendMessage} className="chat__msg-send-container">
            <input ref={messageRef} type="text" placeholder="Type message here..." />
            <i onClick={handleSendMessage} className="fa fa-paper-plane" />
        </form>
    </div>
</div>
  )
}

export default MeetingsPage
