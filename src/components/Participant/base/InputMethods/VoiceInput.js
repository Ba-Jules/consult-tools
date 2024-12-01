import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Loader } from 'lucide-react';

const VoiceInput = ({ onTranscriptionComplete }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        if (window.webkitSpeechRecognition) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'fr-FR';

            recognition.onresult = (event) => {
                const current = event.resultIndex;
                const transcription = event.results[current][0].transcript;
                setTranscript(transcription);
                
                if (event.results[current].isFinal) {
                    onTranscriptionComplete(transcription);
                    setIsRecording(false);
                }
            };

            recognition.onerror = (event) => {
                console.error('Erreur de reconnaissance vocale:', event.error);
                setIsRecording(false);
            };

            setRecognition(recognition);
        }
    }, [onTranscriptionComplete]);

    const toggleRecording = () => {
        if (isRecording) {
            recognition.stop();
        } else {
            recognition.start();
            setTranscript('');
        }
        setIsRecording(!isRecording);
    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={toggleRecording}
                className={`p-4 rounded-full ${
                    isRecording ? 'bg-red-500' : 'bg-blue-500'
                } text-white hover:opacity-80 transition-opacity`}
            >
                {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </button>
            {isRecording && (
                <div className="mt-2 flex items-center">
                    <Loader className="h-4 w-4 animate-spin mr-2" />
                    <span className="text-sm">Enregistrement en cours...</span>
                </div>
            )}
            {transcript && (
                <div className="mt-2 p-2 bg-gray-100 rounded w-full">
                    <p className="text-sm">{transcript}</p>
                </div>
            )}
        </div>
    );
};

export default VoiceInput;