import React, { useState } from 'react';
import '../styles/SymptomChecker.css';

const SymptomChecker = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState(null);

  const decisionTree = {
    question: "আপনার কোন সমস্যা আছে?",
    options: [
      {
        label: "জ্বর",
        icon: "🤒",
        next: {
          question: "জ্বর কত দিন ধরে?",
          options: [
            { label: "১-২ দিন", icon: "📅", result: { severity: "low", message: "বিশ্রাম নিন ও পানি পান করুন। প্যারাসিটামল খেতে পারেন।", icon: "💊" } },
            { label: "৩ দিনের বেশি", icon: "⚠️", result: { severity: "high", message: "ডেঞ্জার সাইন! অবিলম্বে ডাক্তার দেখান।", icon: "🚨" } }
          ]
        }
      },
      {
        label: "ডায়রিয়া",
        icon: "🚽",
        next: {
          question: "মলের সাথে রক্ত যাচ্ছে?",
          options: [
            { label: "হ্যাঁ", icon: "🚨", result: { severity: "high", message: "ডেঞ্জার সাইন! ওআরএস খান এবং অবিলম্বে হাসপাতালে যান।", icon: "🏥" } },
            { label: "না", icon: "✓", result: { severity: "medium", message: "ওআরএস বানিয়ে পান করুন। ভাজাপোড়া ও মসলা এড়িয়ে চলুন।", icon: "🥤" } }
          ]
        }
      },
      {
        label: "কাশি",
        icon: "😷",
        next: {
          question: "শ্বাস নিতে কষ্ট হচ্ছে?",
          options: [
            { label: "হ্যাঁ", icon: "🚨", result: { severity: "high", message: "ডেঞ্জার সাইন! নিউমোনিয়া হতে পারে। তাড়াতাড়ি ডাক্তার দেখান।", icon: "🏥" } },
            { label: "না", icon: "✓", result: { severity: "low", message: "গরম পানি পান করুন। বিশ্রাম নিন। ২ সপ্তাহের বেশি হলে ডাক্তার দেখান।", icon: "☕" } }
          ]
        }
      },
      {
        label: "পেট ব্যথা",
        icon: "🤕",
        next: {
          question: "ব্যথা কতটা তীব্র?",
          options: [
            { label: "খুব তীব্র, সহ্য করতে পারছি না", icon: "🚨", result: { severity: "high", message: "ডেঞ্জার সাইন! অবিলম্বে হাসপাতালে যান। অ্যাপেন্ডিসাইটিস হতে পারে।", icon: "🏥" } },
            { label: "মাঝারি, সহ্য করতে পারছি", icon: "⚠️", result: { severity: "medium", message: "হালকা খাবার খান। গ্যাসের সমস্যা হতে পারে। ভালো না হলে ডাক্তার দেখান।", icon: "🍵" } }
          ]
        }
      }
    ]
  };

  const [currentQuestion, setCurrentQuestion] = useState(decisionTree);

  const handleAnswer = (option) => {
    if (option.result) {
      setResult(option.result);
    } else if (option.next) {
      setCurrentQuestion(option.next);
      setCurrentStep(currentStep + 1);
    }
  };

  const restart = () => {
    setCurrentStep(0);
    setResult(null);
    setCurrentQuestion(decisionTree);
  };

  return (
    <div className="symptom-checker-container">
      <div className="symptom-checker-content">
        <h1 className="page-title">
          <span className="title-icon">🩺</span>
          লক্ষণ পরীক্ষা
        </h1>
        <p className="page-subtitle">
          আপনার লক্ষণ অনুযায়ী বিপদজনক সংকেত শনাক্ত করুন
        </p>

        {!result ? (
          <div className="question-section">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(currentStep + 1) * 33}%` }}></div>
            </div>

            <h2 className="question">{currentQuestion.question}</h2>

            <div className="options-grid">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className="option-button"
                  onClick={() => handleAnswer(option)}
                >
                  <span className="option-icon">{option.icon}</span>
                  <span className="option-label">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={`result-section severity-${result.severity}`}>
            <div className="result-icon">{result.icon}</div>
            <h2 className="result-message">{result.message}</h2>

            {result.severity === 'high' && (
              <div className="emergency-info">
                <h3>🚨 জরুরি পদক্ষেপ:</h3>
                <ul>
                  <li>বিলম্ব না করে নিকটস্থ হাসপাতালে যান</li>
                  <li>জরুরি অবস্থায় ১৬২৬৩ নম্বরে কল করুন</li>
                  <li>কাউকে সাথে নিয়ে যান</li>
                </ul>
              </div>
            )}

            <button className="restart-button" onClick={restart}>
              নতুন পরীক্ষা শুরু করুন
            </button>
          </div>
        )}

        <div className="disclaimer">
          <h3>⚠️ সতর্কতা:</h3>
          <p>
            এটি শুধুমাত্র বিপদজনক লক্ষণ শনাক্ত করার একটি সহায়ক টুল। এটি রোগ নির্ণয় করে না।
            যেকোনো স্বাস্থ্য সমস্যায় অবশ্যই যোগ্য চিকিৎসকের পরামর্শ নিন।
          </p>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;
