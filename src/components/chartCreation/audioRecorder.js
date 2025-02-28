import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Mic, StopCircleRounded } from '@mui/icons-material';
import { uploadAudioFile } from '../../utils/api';

function AudioRecorder({ selectedTable, databaseName }) {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const dispatch = useDispatch();

    const startRecording = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    mediaRecorderRef.current = new MediaRecorder(stream);
                    audioChunksRef.current = [];

                    mediaRecorderRef.current.ondataavailable = (event) => {
                        audioChunksRef.current.push(event.data);
                    };

                    mediaRecorderRef.current.onstop = () => {
                        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                        if (audioBlob.size === 0) {
                            console.error('Audio Blob is empty!');
                            return;
                        }
                        const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
                        const formData = new FormData();
                        formData.append('audio', audioFile);
                        formData.append('tableName', selectedTable);
                        formData.append('databaseName', databaseName);

                        uploadAudioFile(formData)
                            .then(response => {
                                console.log('Audio uploaded successfully:', response.data);
                            })
                            .catch(error => {
                                console.error('Error uploading audio:', error);
                            });
                    };

                    mediaRecorderRef.current.start();
                    setIsRecording(true);
                })
                .catch(error => {
                    console.error('Error accessing microphone:', error);
                });
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    return (
        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', width: '275px', marginLeft: '190px' }}>
             <button
            onClick={isRecording ? stopRecording : startRecording}
            style={{
              display: 'flex',
              alignItems: 'center',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
                {isRecording ? <StopCircleRounded /> : <Mic />}
                <span style={{ marginLeft: '10px' }}>{isRecording ? 'Stop Recording' : 'Record Audio'}</span>
            </button>
            {audioUrl && (
                <audio controls src={audioUrl} style={{ marginLeft: '20px' }}>
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
}

export default AudioRecorder;