import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, Droplets, Sprout, Bug, CloudSun, TrendingUp, FlaskConical } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const quickPrompts = [
  { icon: Sprout, label: 'How are my crops?', text: 'How is my crop health?' },
  { icon: Bug, label: 'Pest control', text: 'What pest treatment do I need?' },
  { icon: Droplets, label: 'Irrigation advice', text: 'When should I irrigate my fields?' },
  { icon: CloudSun, label: 'Weather impact', text: 'How will the weather affect my farm?' },
  { icon: FlaskConical, label: 'Fertilizer plan', text: 'What fertilizer should I apply to my paddy?' },
  { icon: TrendingUp, label: 'Market prices', text: 'What are the current market prices for my crops?' },
];

export function AssistantPage() {
  const { chatMessages, sendChatMessage, isAssistantTyping } = useApp();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, isAssistantTyping]);

  const handleSend = (text?: string) => {
    const msg = text ?? input;
    if (!msg.trim()) return;
    sendChatMessage(msg);
    setInput('');
  };

  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('• ') || line.match(/^\d+\./)) {
        const isBullet = line.startsWith('•');
        return (
          <div key={i} className={`flex gap-2 ${isBullet ? '' : ''} mt-1`}>
            <span className="text-primary-300 flex-shrink-0">{isBullet ? '•' : line.match(/^\d+\./)?.[0]}</span>
            <span dangerouslySetInnerHTML={{ __html: line.replace(/^\d+\.\s/, '').replace(/^•\s/, '').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
          </div>
        );
      }
      if (line.trim() === '') return <div key={i} className="h-2" />;
      return <p key={i} className="mt-1" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />;
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] lg:h-[calc(100vh-7rem)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-display text-xl font-bold text-gray-900">Pasumai AI Assistant</h1>
          <p className="text-xs text-success-600 flex items-center gap-1">
            <span className="w-2 h-2 bg-success-500 rounded-full animate-pulse" /> Online — Ready to help
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-hide space-y-4 pb-4">
        {chatMessages.map(msg => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fade-in`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
              msg.role === 'user' ? 'bg-gray-200' : 'bg-gradient-to-br from-primary-500 to-secondary-600'
            }`}>
              {msg.role === 'user' ? (
                <span className="text-sm font-bold text-gray-600">KR</span>
              ) : (
                <Bot className="w-5 h-5 text-white" />
              )}
            </div>
            <div className={`max-w-[80%] rounded-2xl p-4 ${
              msg.role === 'user' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-100 text-gray-700'
            }`}>
              <div className={`text-sm leading-relaxed ${msg.role === 'user' ? '' : 'space-y-0'}`}>
                {msg.role === 'assistant' ? renderContent(msg.content) : msg.content}
              </div>
              <p className={`text-xs mt-2 ${msg.role === 'user' ? 'text-primary-200' : 'text-gray-400'}`}>{msg.timestamp}</p>
            </div>
          </div>
        ))}

        {isAssistantTyping && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-4">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      {chatMessages.length <= 1 && (
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-accent-500" />
            <p className="text-xs font-medium text-gray-500">Try asking:</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((p, i) => {
              const Icon = p.icon;
              return (
                <button
                  key={i}
                  onClick={() => handleSend(p.text)}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 hover:border-primary-300 hover:bg-primary-50 transition-all"
                >
                  <Icon className="w-4 h-4 text-primary-500" />
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2 items-end">
        <div className="flex-1 relative">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            rows={1}
            placeholder="Ask about your crops, soil, weather, pests..."
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          />
        </div>
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || isAssistantTyping}
          className="w-12 h-12 bg-primary-600 text-white rounded-2xl flex items-center justify-center hover:bg-primary-700 disabled:opacity-50 transition-all active:scale-95 flex-shrink-0"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
