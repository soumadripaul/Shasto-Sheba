import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../styles/VoiceAssistant.css';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'নমস্কার! আমি আপনার স্বাস্থ্য সহায়ক। আপনাকে কিভাবে সাহায্য করতে পারি?',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when new message arrives
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const speakResponse = useCallback((text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'bn-BD';
      utterance.rate = 0.9;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  // Send message to API or use fallback
  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Try calling backend API
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: data.response || 'দুঃখিত, আমি এখন উত্তর দিতে পারছি না।',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      speakResponse(botMessage.text);
    } catch (error) {
      console.error('Chatbot error:', error);
      
      // Fallback to local responses
      const fallbackResponse = getFallbackResponse(text);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: fallbackResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      speakResponse(botMessage.text);
    } finally {
      setIsLoading(false);
    }
  }, [speakResponse]);

  // Fallback responses for common queries
  const getFallbackResponse = (query) => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('হাসপাতাল') || lowerQuery.includes('হাস পাতাল')) {
      return 'নিকটস্থ হাসপাতাল খুঁজতে স্বাস্থ্য সেবা কেন্দ্র মেনুতে যান। সেখানে আপনার এলাকার হাসপাতালের তথ্য পাবেন।';
    } else if (lowerQuery.includes('টিকা')) {
      return 'শিশুর টিকার জন্য মা ও শিশু স্বাস্থ্য মেনুতে যান। সেখানে টিকার তালিকা ও তারিখ পাবেন।';
    } else if (lowerQuery.includes('জ্বর')) {
      return 'জ্বর থাকলে বিশ্রাম নিন এবং প্রচুর পানি পান করুন। জ্বর ৩ দিনের বেশি থাকলে ডাক্তার দেখান। লক্ষণ পরীক্ষা মেনুতে বিস্তারিত জানুন।';
    } else if (lowerQuery.includes('ডায়রিয়া')) {
      return 'ডায়রিয়া হলে ওআরএস খান। ১ লিটার পানিতে ৬ চামচ চিনি ও আধা চামচ লবণ মিশিয়ে বানাতে পারেন। রক্ত গেলে হাসপাতালে যান।';
    } else if (lowerQuery.includes('সাহায্য')) {
      return 'সাহায্য চাইতে সাহায্য চাই মেনুতে যান। বেনামে আপনার সমস্যা জানাতে পারবেন।';
    } else if (lowerQuery.includes('মানসিক')) {
      return 'মানসিক স্বাস্থ্য খুবই গুরুত্বপূর্ণ। মানসিক স্বাস্থ্য মেনুতে পরামর্শ ও সাহায্য পাবেন।';
    } else if (lowerQuery.includes('গর্ভবতী') || lowerQuery.includes('গর্ভাবস্থা')) {
      return 'গর্ভবতী মায়েদের জন্য মা ও শিশু স্বাস্থ্য মেনুতে বিশেষ পরামর্শ রয়েছে।';
    } else {
      return 'আপনি জানতে চাইতে পারেন: হাসপাতাল কোথায়, টিকা কখন নিতে হবে, জ্বর হলে কি করব, ডায়রিয়া হলে কি করব, মানসিক স্বাস্থ্য সম্পর্কে।';
    }
  };

  // Initialize Web Speech API
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'bn-BD'; // Bengali language

      recognitionInstance.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        console.log('Voice recognized:', spokenText);
        setInputText(spokenText);
        
        // Send message immediately
        if (spokenText && spokenText.trim()) {
          // Add user message
          const userMessage = {
            id: Date.now(),
            type: 'user',
            text: spokenText,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, userMessage]);
          setIsLoading(true);

          // Call API
          fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/chatbot`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: spokenText })
          })
            .then(res => res.json())
            .then(data => {
              const botMessage = {
                id: Date.now() + 1,
                type: 'bot',
                text: data.response || 'দুঃখিত, আমি এখন উত্তর দিতে পারছি না।',
                timestamp: new Date()
              };
              setMessages(prev => [...prev, botMessage]);
              speakResponse(botMessage.text);
            })
            .catch(error => {
              console.error('Chatbot error:', error);
              const fallbackText = getFallbackResponse(spokenText);
              const botMessage = {
                id: Date.now() + 1,
                type: 'bot',
                text: fallbackText,
                timestamp: new Date()
              };
              setMessages(prev => [...prev, botMessage]);
              speakResponse(botMessage.text);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        // Handle different types of errors
        if (event.error === 'no-speech') {
          alert('কোন কথা শোনা যায়নি। আবার চেষ্টা করুন।');
        } else if (event.error === 'not-allowed') {
          alert('মাইক্রোফোন পারমিশন দিতে হবে। ব্রাউজার সেটিংস থেকে মাইক্রোফোন এক্সেস চালু করুন।');
        } else if (event.error === 'network') {
          // Network error - this is common and usually not critical
          console.warn('Network error in speech recognition - this is normal for Web Speech API');
          // Don't show alert for network errors as they're expected
          // The recognition will still work locally
        } else if (event.error === 'aborted') {
          console.log('Speech recognition aborted by user');
        } else if (event.error === 'audio-capture') {
          alert('মাইক্রোফোন থেকে অডিও capture করতে সমস্যা হচ্ছে। মাইক্রোফোন সংযোগ চেক করুন।');
        } else if (event.error === 'service-not-allowed') {
          alert('Speech recognition service বন্ধ আছে। দয়া করে ব্রাউজার সেটিংস চেক করুন।');
        } else {
          console.warn('Speech recognition error:', event.error);
          // Don't show alert for other errors to avoid annoying users
        }
      };

      recognitionInstance.onstart = () => {
        console.log('Voice recognition started');
        setIsListening(true);
      };

      recognitionInstance.onend = () => {
        console.log('Voice recognition ended');
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startListening = () => {
    if (recognition) {
      try {
        setInputText('');
        console.log('Starting voice recognition...');
        recognition.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        setIsListening(false);
        alert('ভয়েস রিকগনিশন শুরু করতে সমস্যা হয়েছে। পেজ রিফ্রেশ করে আবার চেষ্টা করুন।');
      }
    } else {
      alert('দুঃখিত, আপনার ব্রাউজার ভয়েস রিকগনিশন সাপোর্ট করে না।');
    }
  };

  const stopListening = () => {
    if (recognition) {
      console.log('Stopping voice recognition...');
      recognition.stop();
      setIsListening(false);
    }
  };

  // Handle send button click
  const handleSend = () => {
    sendMessage(inputText);
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Format timestamp
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('bn-BD', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const quickQuestions = [
    { icon: '🏥', text: 'নিকটস্থ হাসপাতাল কোথায়?', query: 'হাসপাতাল কোথায়' },
    { icon: '💉', text: 'শিশুর টিকা', query: 'টিকা' },
    { icon: '🤒', text: 'জ্বর হলে কি করব?', query: 'জ্বর' },
    { icon: '🚽', text: 'ডায়রিয়া হলে?', query: 'ডায়রিয়া' },
    { icon: '🤰', text: 'মাতৃস্বাস্থ্য', query: 'গর্ভবতী মায়ের পরামর্শ' },
    { icon: '🧠', text: 'মানসিক স্বাস্থ্য', query: 'মানসিক স্বাস্থ্য পরামর্শ' }
  ];

  return (
    <div className="voice-assistant-container">
      <div className="voice-assistant-content">
        <h1 className="page-title">
          <span className="title-icon">🎤</span>
          ভয়েস সহায়ক ও চ্যাটবট
        </h1>
        <p className="page-subtitle">
          কথা বলে বা লিখে তথ্য জানুন। মাইক্রোফোন বাটনে ক্লিক করে প্রশ্ন করুন অথবা নিচে লিখুন।
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

          {/* Chat Messages */}
          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-avatar">
                  {message.type === 'bot' ? '🤖' : '👤'}
                </div>
                <div className="message-content">
                  <div className="message-bubble">
                    <p>{message.text}</p>
                  </div>
                  <span className="message-time">{formatTime(message.timestamp)}</span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot">
                <div className="message-avatar">🤖</div>
                <div className="message-content">
                  <div className="message-bubble loading">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isSpeaking && (
              <div className="speaking-indicator">🔊 বলছি...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Text Input */}
          <div className="text-input-container">
            <div className="input-wrapper">
              <textarea
                ref={inputRef}
                className="text-input"
                placeholder="এখানে লিখুন..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                rows="1"
                disabled={isLoading}
              />
              <button
                className="send-btn"
                onClick={handleSend}
                disabled={isLoading || !inputText.trim()}
                title="পাঠান"
              >
                {isLoading ? '⏳' : '📤'}
              </button>
            </div>
          </div>
        </div>

        <div className="quick-questions">
          <h3>দ্রুত প্রশ্ন করুন:</h3>
          <div className="questions-grid">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                className="quick-question-button"
                onClick={() => {
                  sendMessage(q.query);
                }}
                disabled={isLoading}
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
            <li>স্পষ্ট করে বাংলায় কথা বলুন বা লিখুন</li>
            <li>শান্ত পরিবেশে ভয়েস ব্যবহার করুন</li>
            <li>মাইক্রোফোন পারমিশন দিতে হবে</li>
            <li>প্রশ্ন সংক্ষিপ্ত রাখুন</li>
            <li>টেক্সট ইনপুট যেকোনো সময় ব্যবহার করতে পারবেন</li>
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
