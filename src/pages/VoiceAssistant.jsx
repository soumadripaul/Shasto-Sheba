import React, { useState, useEffect, useCallback } from 'react';
import '../styles/VoiceAssistant.css';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakResponse = useCallback((text) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'bn-BD';
      utterance.rate = 0.9;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const handleVoiceCommand = useCallback((command) => {
    const lowerCommand = command.toLowerCase();
    let responseText = '';

    if (lowerCommand.includes('হাসপাতাল') || lowerCommand.includes('হাস পাতালে')) {
      responseText = 'নিকটস্থ হাসপাতাল খুঁজতে স্বাস্থ্য সেবা কেন্দ্র মেনুতে যান। সেখানে আপনার এলাকার হাসপাতালের তথ্য পাবেন।';
    } else if (lowerCommand.includes('টিকা')) {
      responseText = 'শিশুর টিকার জন্য মা ও শিশু স্বাস্থ্য মেনুতে যান। সেখানে টিকার তালিকা ও তারিখ পাবেন।';
    } else if (lowerCommand.includes('জ্বর')) {
      responseText = 'জ্বর থাকলে বিশ্রাম নিন এবং প্রচুর পানি পান করুন। জ্বর ৩ দিনের বেশি থাকলে ডাক্তার দেখান। লক্ষণ পরীক্ষা মেনুতে বিস্তারিত জানুন।';
    } else if (lowerCommand.includes('ডায়রিয়া')) {
      responseText = 'ডায়রিয়া হলে ওআরএস খান। ১ লিটার পানিতে ৬ চামচ চিনি ও আধা চামচ লবণ মিশিয়ে বানাতে পারেন। রক্ত গেলে হাসপাতালে যান।';
    } else if (lowerCommand.includes('সাহায্য')) {
      responseText = 'সাহায্য চাইতে সাহায্য চাই মেনুতে যান। বেনামে আপনার সমস্যা জানাতে পারবেন।';
    } else {
      responseText = 'আপনি জানতে চাইতে পারেন: হাসপাতাল কোথায়, টিকা কখন নিতে হবে, জ্বর হলে কি করব, ডায়রিয়া হলে কি করব।';
    }

    setResponse(responseText);
    speakResponse(responseText);
  }, [speakResponse]);

  useEffect(() => {
    // Initialize Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'bn-BD'; // Bengali language

      recognitionInstance.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        setTranscript(spokenText);
        handleVoiceCommand(spokenText);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [handleVoiceCommand]);

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      setTranscript('');
      setResponse('');
      recognition.start();
    } else {
      alert('দুঃখিত, আপনার ব্রাউজার ভয়েস রিকগনিশন সাপোর্ট করে না।');
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const quickQuestions = [
    { icon: '🏥', text: 'নিকটস্থ হাসপাতাল কোথায়?', query: 'হাসপাতাল কোথায়' },
    { icon: '💉', text: 'শিশুর টিকা', query: 'টিকা' },
    { icon: '🤒', text: 'জ্বর হলে কি করব?', query: 'জ্বর' },
    { icon: '🚽', text: 'ডায়রিয়া হলে?', query: 'ডায়রিয়া' }
  ];

  return (
    <div className="voice-assistant-container">
      <div className="voice-assistant-content">
        <h1 className="page-title">
          <span className="title-icon">🎤</span>
          ভয়েস সহায়ক
        </h1>
        <p className="page-subtitle">
          কথা বলে তথ্য জানুন। মাইক্রোফোন বাটনে ক্লিক করে প্রশ্ন করুন।
        </p>

        <div className="voice-interface">
          <div className={`microphone-button ${isListening ? 'listening' : ''}`} onClick={isListening ? stopListening : startListening}>
            {isListening ? (
              <>
                <div className="listening-animation"></div>
                <span className="mic-icon">🎙️</span>
                <p>শুনছি...</p>
              </>
            ) : (
              <>
                <span className="mic-icon">🎤</span>
                <p>কথা বলুন</p>
              </>
            )}
          </div>

          {transcript && (
            <div className="transcript-box">
              <h3>আপনি বলেছেন:</h3>
              <p>{transcript}</p>
            </div>
          )}

          {response && (
            <div className="response-box">
              <h3>উত্তর:</h3>
              <p>{response}</p>
              {isSpeaking && <div className="speaking-indicator">🔊 বলছি...</div>}
            </div>
          )}
        </div>

        <div className="quick-questions">
          <h3>দ্রুত প্রশ্ন করুন:</h3>
          <div className="questions-grid">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                className="quick-question-button"
                onClick={() => {
                  setTranscript(q.query);
                  handleVoiceCommand(q.query);
                }}
              >
                <span className="question-icon">{q.icon}</span>
                <span>{q.text}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="voice-tips">
          <h3>💡 টিপস:</h3>
          <ul>
            <li>স্পষ্ট করে বাংলায় কথা বলুন</li>
            <li>শান্ত পরিবেশে ব্যবহার করুন</li>
            <li>মাইক্রোফোন পারমিশন দিতে হবে</li>
            <li>প্রশ্ন সংক্ষিপ্ত রাখুন</li>
          </ul>
        </div>

        <div className="offline-mode-notice">
          <span className="notice-icon">📴</span>
          <p>
            এই ফিচার আংশিকভাবে অফলাইনে কাজ করে। আপনার ডিভাইসে বাংলা ভয়েস সাপোর্ট ইনস্টল থাকলে
            ইন্টারনেট ছাড়াই ব্যবহার করতে পারবেন।
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
