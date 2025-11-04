import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// OpenAI API configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// System prompt for the health assistant
const SYSTEM_PROMPT = `আপনি একজন বাংলাদেশী স্বাস্থ্য সহায়ক চ্যাটবট। আপনার নাম "মন বন্ধু"। আপনার কাজ হলো:

1. বাংলায় স্বাস্থ্য সম্পর্কিত প্রশ্নের উত্তর দেওয়া
2. সাধারণ স্বাস্থ্য পরামর্শ প্রদান করা
3. জরুরি অবস্থায় হাসপাতালে যাওয়ার পরামর্শ দেওয়া
4. মাতৃস্বাস্থ্য, শিশু স্বাস্থ্য, মানসিক স্বাস্থ্য সম্পর্কে তথ্য দেওয়া
5. সহানুভূতিশীল এবং বন্ধুত্বপূর্ণ ভাষায় কথা বলা

গুরুত্বপূর্ণ নির্দেশনা:
- সবসময় বাংলায় উত্তর দিন
- জটিল চিকিৎসার পরামর্শ দেবেন না, ডাক্তার দেখতে বলুন
- সংক্ষিপ্ত এবং স্পষ্ট উত্তর দিন
- জরুরি অবস্থায় হাসপাতালে যাওয়ার পরামর্শ দিন`;

// Fallback responses for common queries
const fallbackResponses = {
  hospital: 'নিকটস্থ হাসপাতাল খুঁজতে স্বাস্থ্য সেবা কেন্দ্র মেনুতে যান। সেখানে আপনার এলাকার হাসপাতালের তথ্য পাবেন।',
  vaccine: 'শিশুর টিকার জন্য মা ও শিশু স্বাস্থ্য মেনুতে যান। সেখানে টিকার তালিকা ও তারিখ পাবেন।',
  fever: 'জ্বর থাকলে বিশ্রাম নিন এবং প্রচুর পানি পান করুন। জ্বর ৩ দিনের বেশি থাকলে ডাক্তার দেখান। লক্ষণ পরীক্ষা মেনুতে বিস্তারিত জানুন।',
  diarrhea: 'ডায়রিয়া হলে ওআরএস খান। ১ লিটার পানিতে ৬ চামচ চিনি ও আধা চামচ লবণ মিশিয়ে বানাতে পারেন। রক্ত গেলে হাসপাতালে যান।',
  help: 'সাহায্য চাইতে সাহায্য চাই মেনুতে যান। বেনামে আপনার সমস্যা জানাতে পারবেন।',
  mental: 'মানসিক স্বাস্থ্য খুবই গুরুত্বপূর্ণ। মানসিক স্বাস্থ্য মেনুতে পরামর্শ ও সাহায্য পাবেন।',
  pregnancy: 'গর্ভবতী মায়েদের জন্য মা ও শিশু স্বাস্থ্য মেনুতে বিশেষ পরামর্শ রয়েছে। নিয়মিত ডাক্তার দেখান এবং পুষ্টিকর খাবার খান।',
  default: 'আপনি জানতে চাইতে পারেন: হাসপাতাল কোথায়, টিকা কখন নিতে হবে, জ্বর হলে কি করব, ডায়রিয়া হলে কি করব, মানসিক স্বাস্থ্য সম্পর্কে।'
};

// Function to get fallback response based on query
function getFallbackResponse(query) {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes('হাসপাতাল') || lowerQuery.includes('হাস পাতাল')) {
    return fallbackResponses.hospital;
  } else if (lowerQuery.includes('টিকা')) {
    return fallbackResponses.vaccine;
  } else if (lowerQuery.includes('জ্বর')) {
    return fallbackResponses.fever;
  } else if (lowerQuery.includes('ডায়রিয়া')) {
    return fallbackResponses.diarrhea;
  } else if (lowerQuery.includes('সাহায্য')) {
    return fallbackResponses.help;
  } else if (lowerQuery.includes('মানসিক')) {
    return fallbackResponses.mental;
  } else if (lowerQuery.includes('গর্ভবতী') || lowerQuery.includes('গর্ভাবস্থা')) {
    return fallbackResponses.pregnancy;
  } else {
    return fallbackResponses.default;
  }
}

/**
 * @openapi
 * /api/chatbot:
 *   post:
 *     summary: Send message to AI chatbot
 *     description: |
 *       Send a health-related question to the Mon Bondhu AI chatbot.
 *       The chatbot responds in Bengali and provides health guidance.
 *       
 *       Features:
 *       - Bengali language support
 *       - OpenAI GPT-3.5 powered responses
 *       - Fallback responses for common queries
 *       - Health-focused conversation context
 *     tags:
 *       - Chatbot
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChatbotRequest'
 *           examples:
 *             fever:
 *               summary: Fever query
 *               value:
 *                 message: জ্বর হলে কি করতে হবে?
 *             hospital:
 *               summary: Hospital query
 *               value:
 *                 message: নিকটস্থ হাসপাতাল কোথায়?
 *             pregnancy:
 *               summary: Pregnancy query
 *               value:
 *                 message: গর্ভাবস্থায় কি খাবার খাওয়া উচিত?
 *     responses:
 *       200:
 *         description: Chatbot response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatbotResponse'
 *             examples:
 *               success:
 *                 summary: Successful response
 *                 value:
 *                   success: true
 *                   response: জ্বর থাকলে বিশ্রাম নিন এবং প্রচুর পানি পান করুন। জ্বর ৩ দিনের বেশি থাকলে ডাক্তার দেখান।
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
// POST /api/chatbot - Send message to chatbot
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    // Check if OpenAI API key is configured
    if (!OPENAI_API_KEY) {
      console.warn('OpenAI API key not configured, using fallback responses');
      const fallbackResponse = getFallbackResponse(message);
      return res.json({
        success: true,
        response: fallbackResponse,
        source: 'fallback'
      });
    }

    // Call OpenAI API
    try {
      const openaiResponse = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: SYSTEM_PROMPT
            },
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!openaiResponse.ok) {
        throw new Error(`OpenAI API error: ${openaiResponse.status}`);
      }

      const data = await openaiResponse.json();
      const botResponse = data.choices[0].message.content;

      res.json({
        success: true,
        response: botResponse,
        source: 'openai'
      });
    } catch (openaiError) {
      console.error('OpenAI API error:', openaiError.message);
      
      // Fallback to local responses if OpenAI fails
      const fallbackResponse = getFallbackResponse(message);
      res.json({
        success: true,
        response: fallbackResponse,
        source: 'fallback',
        note: 'Using fallback due to API error'
      });
    }
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process message',
      message: error.message
    });
  }
});

// GET /api/chatbot/health - Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    openaiConfigured: !!OPENAI_API_KEY
  });
});

export default router;
