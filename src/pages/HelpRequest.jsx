import React, { useState } from 'react';
import apiService from '../services/api';
import '../styles/HelpRequest.css';

const HelpRequest = () => {
  const [currentView, setCurrentView] = useState('main'); // main, create, check
  const [message, setMessage] = useState('');
  const [generatedTicket, setGeneratedTicket] = useState(null);
  const [searchCode, setSearchCode] = useState('');
  const [foundTicket, setFoundTicket] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateTicketCode = () => {
    const colors = ['নীল', 'লাল', 'সবুজ', 'হলুদ', 'কালো', 'সাদা', 'বেগুনি'];
    const animals = ['পাখি', 'মাছ', 'গরু', 'ছাগল', 'হাঁস', 'মুরগি', 'বিড়াল'];
    const number = Math.floor(Math.random() * 900) + 100;
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];
    
    return `${color}-${animal}-${number}`;
  };

  const handleSubmitRequest = async () => {
    if (!message.trim()) {
      alert('অনুগ্রহ করে আপনার বার্তা লিখুন');
      return;
    }

    setIsSubmitting(true);
    const code = generateTicketCode();

    try {
      // Submit to backend API with anonymous data
      const response = await apiService.createHelpRequest({
        name: 'Anonymous',
        phone: 'Not provided',
        location: 'Not specified',
        requestType: 'other',
        description: message,
        urgency: 'medium',
        ticketCode: code  // Save the code in database
      });

      if (response.success) {
        const ticket = {
          code: code,
          id: response.data._id,
          message: message,
          date: new Date().toISOString(),
          status: response.data.status,
          response: null
        };

        // Save to localStorage as backup
        const existingTickets = JSON.parse(localStorage.getItem('helpTickets') || '[]');
        existingTickets.push(ticket);
        localStorage.setItem('helpTickets', JSON.stringify(existingTickets));

        setGeneratedTicket(ticket);
        setMessage('');
        setCurrentView('success');
      }
    } catch (error) {
      console.error('Error submitting help request:', error);
      
      // Fallback to localStorage only if API fails
      const ticket = {
        code: code,
        message: message,
        date: new Date().toISOString(),
        status: 'pending',
        response: null,
        offline: true
      };

      const existingTickets = JSON.parse(localStorage.getItem('helpTickets') || '[]');
      existingTickets.push(ticket);
      localStorage.setItem('helpTickets', JSON.stringify(existingTickets));

      setGeneratedTicket(ticket);
      setMessage('');
      setCurrentView('success');
      
      console.log('Saved offline:', ticket);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckTicket = async () => {
    if (!searchCode.trim()) {
      alert('অনুগ্রহ করে আপনার টিকিট কোড দিন');
      return;
    }

    try {
      // Try to fetch from API by ticket code
      const response = await apiService.getHelpRequestByCode(searchCode.trim());
      
      if (response.success) {
        const apiTicket = {
          code: response.data.ticketCode,
          id: response.data._id,
          message: response.data.description,
          date: response.data.createdAt,
          status: response.data.status,
          response: response.data.response
        };
        
        // Update localStorage
        const allTickets = JSON.parse(localStorage.getItem('helpTickets') || '[]');
        const index = allTickets.findIndex(t => t.code === searchCode.trim());
        if (index >= 0) {
          allTickets[index] = apiTicket;
          localStorage.setItem('helpTickets', JSON.stringify(allTickets));
        }
        
        setFoundTicket(apiTicket);
        return;
      }
    } catch (apiError) {
      console.log('API search failed, trying localStorage:', apiError);
    }

    // Fallback to localStorage
    try {
      const tickets = JSON.parse(localStorage.getItem('helpTickets') || '[]');
      const localTicket = tickets.find(t => t.code === searchCode.trim());

      if (localTicket) {
        // Simulate response for demo (after some time)
        const ticketDate = new Date(localTicket.date);
        const now = new Date();
        const hoursPassed = (now - ticketDate) / (1000 * 60 * 60);
        
        if (hoursPassed >= 0.5 && !localTicket.response) {
          localTicket.response = 'আপনার সমস্যার জন্য নিকটস্থ স্বাস্থ্য কেন্দ্রে যোগাযোগ করুন। জরুরি অবস্থায় ১৬২৬৩ নম্বরে কল করুন।';
          localTicket.status = 'answered';
          
          const allTickets = JSON.parse(localStorage.getItem('helpTickets') || '[]');
          const index = allTickets.findIndex(t => t.code === searchCode.trim());
          if (index >= 0) {
            allTickets[index] = localTicket;
            localStorage.setItem('helpTickets', JSON.stringify(allTickets));
          }
        }

        setFoundTicket(localTicket);
      } else {
        setFoundTicket({ notFound: true });
      }
    } catch (error) {
      console.error('Error checking ticket:', error);
      setFoundTicket({ notFound: true });
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('কোড কপি হয়েছে!');
  };

  return (
    <div className="help-request-container">
      <div className="help-request-content">
        <h1 className="page-title">
          <span className="title-icon">🆘</span>
          সাহায্য চাই
        </h1>
        <p className="page-subtitle">
          সম্পূর্ণ বেনামে সাহায্য চাইতে পারবেন। কোনো নাম বা ফোন নম্বর লাগবে না।
        </p>

        {currentView === 'main' && (
          <div className="main-options">
            <button 
              className="option-card create"
              onClick={() => setCurrentView('create')}
            >
              <span className="option-icon">✉️</span>
              <h3>নতুন সাহায্যের অনুরোধ</h3>
              <p>আপনার সমস্যা জানান</p>
            </button>

            <button 
              className="option-card check"
              onClick={() => setCurrentView('check')}
            >
              <span className="option-icon">🔍</span>
              <h3>উত্তর চেক করুন</h3>
              <p>আপনার টিকিট কোড দিয়ে উত্তর দেখুন</p>
            </button>
          </div>
        )}

        {currentView === 'create' && (
          <div className="create-request">
            <button className="back-button" onClick={() => setCurrentView('main')}>
              ← ফিরে যান
            </button>

            <div className="request-form">
              <h2>আপনার সমস্যা লিখুন</h2>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="এখানে আপনার স্বাস্থ্য সমস্যা বা প্রশ্ন লিখুন...&#10;&#10;উদাহরণ:&#10;- আমার পেটে ব্যথা হচ্ছে কি করবো?&#10;- জ্বর হলে কোন ওষুধ খাবো?&#10;- গর্ভবতী মায়ের কি যত্ন নিতে হবে?"
                rows={10}
              />
              
              <div className="privacy-info">
                <span className="info-icon">🔒</span>
                <p>আপনার পরিচয় সম্পূর্ণ গোপন থাকবে। শুধু একটি টিকিট কোড পাবেন।</p>
              </div>

              <button 
                className="submit-button"
                onClick={handleSubmitRequest}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'পাঠানো হচ্ছে...' : 'পাঠান →'}
              </button>
            </div>
          </div>
        )}

        {currentView === 'success' && generatedTicket && (
          <div className="success-view">
            <div className="success-icon">✓</div>
            <h2>আপনার অনুরোধ পাঠানো হয়েছে</h2>
            
            <div className="ticket-code-display">
              <h3>আপনার টিকিট কোড:</h3>
              <div className="code-box">
                <span className="code">{generatedTicket.code}</span>
                <button 
                  className="copy-button"
                  onClick={() => copyToClipboard(generatedTicket.code)}
                >
                  📋 কপি করুন
                </button>
              </div>
            </div>

            <div className="instructions">
              <h4>⚠️ গুরুত্বপূর্ণ নির্দেশনা:</h4>
              <ul>
                <li>এই কোডটি সংরক্ষণ করুন বা লিখে রাখুন</li>
                <li>২৪ ঘণ্টা পর এই কোড দিয়ে উত্তর চেক করুন</li>
                <li>কোডটি হারিয়ে গেলে উত্তর দেখতে পারবেন না</li>
              </ul>
            </div>

            <button 
              className="done-button"
              onClick={() => {
                setCurrentView('main');
                setGeneratedTicket(null);
              }}
            >
              সম্পন্ন
            </button>
          </div>
        )}

        {currentView === 'check' && !foundTicket && (
          <div className="check-request">
            <button className="back-button" onClick={() => setCurrentView('main')}>
              ← ফিরে যান
            </button>

            <div className="check-form">
              <h2>টিকিট কোড দিন</h2>
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="যেমন: নীল-পাখি-১২৩"
                className="code-input"
              />
              
              <button 
                className="check-button"
                onClick={handleCheckTicket}
              >
                🔍 খুঁজুন
              </button>
            </div>
          </div>
        )}

        {currentView === 'check' && foundTicket && (
          <div className="ticket-result">
            <button 
              className="back-button" 
              onClick={() => {
                setFoundTicket(null);
                setSearchCode('');
              }}
            >
              ← আরেকটি চেক করুন
            </button>

            {foundTicket.notFound ? (
              <div className="not-found">
                <span className="not-found-icon">❌</span>
                <h2>টিকিট পাওয়া যায়নি</h2>
                <p>আপনার কোডটি সঠিকভাবে লিখেছেন কিনা দেখুন।</p>
              </div>
            ) : (
              <div className="ticket-details">
                <div className="ticket-header">
                  <h3>টিকিট কোড: {foundTicket.code}</h3>
                  <span className={`status-badge ${foundTicket.status}`}>
                    {foundTicket.status === 'pending' ? '⏳ অপেক্ষমাণ' : '✓ উত্তর পেয়েছেন'}
                  </span>
                </div>

                <div className="ticket-message">
                  <h4>আপনার বার্তা:</h4>
                  <p>{foundTicket.message}</p>
                  <small>তারিখ: {new Date(foundTicket.date).toLocaleDateString('bn-BD')}</small>
                </div>

                {foundTicket.response ? (
                  <div className="ticket-response">
                    <h4>📝 উত্তর:</h4>
                    <p>{foundTicket.response}</p>
                  </div>
                ) : (
                  <div className="pending-message">
                    <span className="pending-icon">⏳</span>
                    <p>আপনার উত্তর প্রস্তুত করা হচ্ছে। অনুগ্রহ করে ২৪ ঘণ্টা পর আবার চেক করুন।</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="help-notice">
          <h3>🚨 জরুরি অবস্থায়:</h3>
          <p>যদি আপনার অবস্থা গুরুতর হয়, তাহলে অপেক্ষা না করে নিকটস্থ হাসপাতালে যান বা ১৬২৬৩ নম্বরে কল করুন।</p>
        </div>
      </div>
    </div>
  );
};

export default HelpRequest;
