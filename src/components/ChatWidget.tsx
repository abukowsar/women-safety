import React, { useState, useRef, useEffect } from 'react';
import { MessageCircleHeart, Send, X, Loader2, Phone } from 'lucide-react';
import { ChatMessage, Language } from '@/types';
import { pick } from '@/data/i18n';
import { sendMessageToGemini } from '../services/geminiService';

const text = {
  open: { en: 'Talk to us', bn: 'কথা বলুন' },
  title: { en: 'Nirapad Sathi', bn: 'নিরাপদ সাথী' },
  subtitle: { en: 'AI support · private · not a substitute for help', bn: 'এআই সহায়তা · গোপনীয় · জরুরি সেবার বিকল্প নয়' },
  greeting: {
    en: 'Hello, I am here to listen. You can ask about safety, your rights, or just tell me how you are feeling. You do not need to share your name.',
    bn: 'আসসালামু আলাইকুম, আমি আপনার কথা শুনতে এখানে আছি। নিরাপত্তা, আপনার অধিকার নিয়ে প্রশ্ন করতে পারেন, বা শুধু বলতে পারেন আপনি কেমন বোধ করছেন। নাম বলার প্রয়োজন নেই।',
  },
  crisis: { en: 'In danger or thinking of suicide? Call 999 now.', bn: 'বিপদে আছেন বা আত্মহত্যার কথা ভাবছেন? এখনই ৯৯৯-এ কল করুন।' },
  placeholder: { en: 'Type your message...', bn: 'আপনার কথা লিখুন...' },
};

const ChatWidget: React.FC<{ currentLang: Language }> = ({ currentLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(userMessage.text);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const shown: ChatMessage[] = [{ role: 'model', text: pick(currentLang, text.greeting) }, ...messages];

  return (
    <div className="no-print fixed bottom-5 right-4 z-50 flex flex-col items-end sm:bottom-6 sm:right-6">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full bg-brand-800 py-3.5 pl-4 pr-5 text-white shadow-2xl shadow-brand-900/30 transition-transform hover:scale-105"
        >
          <MessageCircleHeart className="h-6 w-6" />
          <span className="font-semibold">{pick(currentLang, text.open)}</span>
        </button>
      )}

      {isOpen && (
        <div className="animate-fade-up flex max-h-[80vh] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl sm:w-96">
          <div className="flex items-center justify-between bg-gradient-to-r from-brand-800 to-brand-700 p-4 text-white">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15">
                <MessageCircleHeart className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold">{pick(currentLang, text.title)}</h3>
                <p className="text-xs text-brand-100">{pick(currentLang, text.subtitle)}</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-full p-1.5 hover:bg-white/15" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>

          <a href="tel:999" className="flex items-center gap-2 bg-red-50 px-4 py-2 text-xs font-medium text-red-800 hover:bg-red-100">
            <Phone className="h-3.5 w-3.5 shrink-0" /> {pick(currentLang, text.crisis)}
          </a>

          <div className="min-h-[300px] flex-1 overflow-y-auto bg-cream p-4">
            {shown.map((msg, idx) => (
              <div key={idx} className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'rounded-br-md bg-brand-800 text-white'
                      : 'rounded-bl-md border border-slate-200 bg-white text-slate-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="mb-3 flex justify-start">
                <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3">
                  <Loader2 className="h-5 w-5 animate-spin text-brand-500" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center gap-2 border-t border-slate-100 bg-white p-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={pick(currentLang, text.placeholder)}
              className="flex-1 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputText.trim()}
              aria-label="Send"
              className="rounded-full bg-brand-800 p-2.5 text-white transition-colors hover:bg-brand-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
