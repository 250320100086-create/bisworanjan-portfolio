import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  memo,
} from 'react';
import {
  X,
  Send,
  Bot,
  User,
  Loader2,
  RefreshCw,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  isError?: boolean;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/** Markdown & Code Block Renderer */
function renderMarkdown(text: string): React.ReactNode {
  const blocks = text.split(/(```[\s\S]*?```)/g);
  return blocks.map((block, i) => {
    if (block.startsWith('```')) {
      const firstLineEnd = block.indexOf('\n');
      const lang = firstLineEnd !== -1 ? block.slice(3, firstLineEnd).trim() : '';
      const code = firstLineEnd !== -1 ? block.slice(firstLineEnd + 1).replace(/```$/, '') : block.slice(3).replace(/```$/, '');
      return (
        <div key={i} className="my-3 rounded-xl overflow-hidden border border-[#2A2D3A] bg-[#090A0F]">
          {lang && (
            <div className="bg-[#13141C] px-3.5 py-1.5 border-b border-[#1F212A] text-[11px] font-mono text-gray-400 uppercase tracking-wider flex justify-between items-center">
              <span>{lang}</span>
            </div>
          )}
          <pre className="p-3.5 overflow-x-auto text-xs font-mono text-fuchsia-300 leading-relaxed">
            <code>{code.trim()}</code>
          </pre>
        </div>
      );
    }

    const parts = block.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
    return (
      <span key={i}>
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={j} className="italic text-gray-300">{part.slice(1, -1)}</em>;
          }
          if (part.startsWith('`') && part.endsWith('`')) {
            return (
              <code key={j} className="bg-[#1A1C23] text-fuchsia-300 px-1.5 py-0.5 rounded text-xs font-mono border border-[#2A2D3A]">
                {part.slice(1, -1)}
              </code>
            );
          }
          const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
          if (linkMatch) {
            return (
              <a
                key={j}
                href={linkMatch[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 font-medium"
              >
                {linkMatch[1]}
              </a>
            );
          }
          return part.split('\n').map((line, k, arr) => (
            <React.Fragment key={`${j}-${k}`}>
              {line}
              {k < arr.length - 1 && <br />}
            </React.Fragment>
          ));
        })}
      </span>
    );
  });
}

const TypingIndicator = memo(() => (
  <div className="flex items-end gap-2 mb-4 animate-pulse">
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-fuchsia-600 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
      <Bot size={15} className="text-white" />
    </div>
    <div className="bg-[#1A1C23] border border-[#2A2D3A] rounded-2xl rounded-bl-sm px-4 py-3">
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-fuchsia-400"
            style={{ animation: `typing-bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </div>
    </div>
  </div>
));
TypingIndicator.displayName = 'TypingIndicator';

const MessageBubble = memo(({ msg, onRetry }: { msg: ChatMessage; onRetry?: () => void }) => {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex items-end gap-2 mb-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
          isUser
            ? 'bg-gradient-to-br from-blue-600 to-fuchsia-600'
            : 'bg-gradient-to-br from-fuchsia-600 to-blue-600'
        }`}
      >
        {isUser ? <User size={14} className="text-white" /> : <Bot size={15} className="text-white" />}
      </div>

      <div
        className={`max-w-[82%] ${
          isUser
            ? 'bg-gradient-to-br from-fuchsia-600/90 to-blue-600/90 text-white rounded-2xl rounded-br-sm'
            : msg.isError
            ? 'bg-[#1f0d0d] border border-red-500/40 text-red-300 rounded-2xl rounded-bl-sm'
            : 'bg-[#1A1C23] border border-[#2A2D3A] text-gray-200 rounded-2xl rounded-bl-sm'
        } px-4 py-3 shadow-md`}
      >
        <div className="text-sm leading-relaxed">
          {isUser ? msg.content : renderMarkdown(msg.content)}
        </div>

        {msg.isError && onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-medium underline"
          >
            <RotateCcw size={12} /> Retry request
          </button>
        )}

        <p className={`text-[10px] mt-1.5 ${isUser ? 'text-white/60 text-right' : 'text-gray-500'}`}>
          {formatTime(msg.timestamp)}
        </p>
      </div>
    </div>
  );
});
MessageBubble.displayName = 'MessageBubble';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isSendingRef = useRef(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    if (messages.length === 0) {
      setMessages([
        {
          id: generateId(),
          role: 'model',
          content: "Hello! I am **BP's AI Assistant** 🤖 (*General AI & Portfolio Assistant*).\n\nI am a general-purpose AI chatbot powered by LLM technology. Ask me **anything in the world** — math, science, coding, literature, general knowledge, or details about Bisworanjan's portfolio & projects!",
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isSendingRef.current) return;

    isSendingRef.current = true;

    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Post full session message history to secure backend API route
      const payload = newMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payload }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.reply || data.answer || "I couldn't generate a response.";

      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: 'model',
          content: replyText,
          timestamp: new Date(),
        },
      ]);
    } catch (err: any) {
      console.error('[Chatbot API Error]', err);
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: 'model',
          content: "Connection error: Unable to reach the backend AI server. Please check your connection and try again.",
          timestamp: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
      isSendingRef.current = false;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: generateId(),
        role: 'model',
        content: "Conversation history cleared! Ask me any question in the world 🤖",
        timestamp: new Date(),
      },
    ]);
  };

  const handleRetry = () => {
    const lastUserIndex = [...messages].reverse().findIndex((m) => m.role === 'user');
    if (lastUserIndex !== -1) {
      const realIndex = messages.length - 1 - lastUserIndex;
      const lastUserContent = messages[realIndex].content;
      setMessages((prev) => prev.slice(0, realIndex));
      sendMessage(lastUserContent);
    }
  };

  return (
    <>
      {/* Floating AI Robot Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          aria-label="Open BP's AI Assistant"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-fuchsia-600 to-blue-600 hover:from-fuchsia-500 hover:to-blue-500 shadow-xl shadow-fuchsia-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group border border-fuchsia-400/40"
        >
          <Bot size={26} className="text-white transition-transform group-hover:rotate-12" />
          <span className="absolute inset-0 rounded-full border-2 border-fuchsia-400/50 animate-ping pointer-events-none" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 w-[390px] max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl overflow-hidden bg-[#0F1015] border border-[#1F212A] shadow-2xl shadow-black/90 chatbot-appear"
          style={{ height: '540px' }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 bg-gradient-to-r from-[#13141C] to-[#0F1015] border-b border-[#1F212A] flex-shrink-0">
            <div className="w-9.5 h-9.5 rounded-full bg-gradient-to-br from-fuchsia-600 to-blue-600 flex items-center justify-center shadow-md">
              <Bot size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                BP's AI Assistant
              </h3>
              <p className="text-[10px] flex items-center gap-1 font-medium text-fuchsia-300">
                <Sparkles size={10} /> General AI & Portfolio Assistant
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleClear}
                title="Reset Conversation Memory"
                className="p-1.5 text-gray-400 hover:text-white hover:bg-[#1A1C23] rounded-lg transition-colors"
              >
                <RefreshCw size={14} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Assistant"
                className="p-1.5 text-gray-400 hover:text-white hover:bg-[#1A1C23] rounded-lg transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 custom-scrollbar">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} onRetry={msg.isError ? handleRetry : undefined} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="flex-shrink-0 px-3 py-3 bg-[#0F1015] border-t border-[#1F212A] flex items-end gap-2"
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Ask anything in the world or about Bisworanjan…"
              className="flex-1 bg-[#13141C] border border-[#1F212A] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500/60 transition-colors disabled:opacity-50 resize-none max-h-24 custom-scrollbar"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="w-10 h-10 flex-shrink-0 rounded-xl bg-gradient-to-br from-fuchsia-600 to-blue-600 hover:from-fuchsia-500 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-md"
            >
              {isLoading ? <Loader2 size={16} className="text-white animate-spin" /> : <Send size={16} className="text-white" />}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
