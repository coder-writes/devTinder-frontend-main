import { useState, useEffect, useRef } from "react";

const QUESTIONS = {
  "What is DevTinder?": {
    text:
      "DevTinder is a modern web app that connects developers based on their skills, interests, and project goals — like 'Tinder for Developers'.",
    followUps: [
      {
        question: "Is DevTinder free?",
        text: "Yes, DevTinder is 100% free for all developers.",
      },
      {
        question: "Who is DevTinder for?",
        text:
          "Whether you're a student, freelancer, or pro — if you're building something, DevTinder is for you.",
      },
    ],
  },
  "How does team matching work?": {
    text:
      "You can find and join dev teams for hackathons and projects. It's currently in development (75%).",
    followUps: [
      {
        question: "When will it be available?",
        text:
          "Team Matching is in development and should roll out in the next major update.",
      },
    ],
  },
  "What is the Blogs section about?": {
    text:
      "In the Blogs section, users will be able to read & share technical blogs and tutorials — currently 50% done.",
    followUps: [
      {
        question: "Can I contribute a blog?",
        text: "Yes, contribution will be open when the feature goes live.",
      },
    ],
  },
  "What’s in the Full Profile Preview?": {
    text:
      "It allows users to view developer profiles with detailed info like skills, GitHub links, and project history. Planning phase is at 50%.",
    followUps: [
      {
        question: "Will profiles be public?",
        text:
          "Only basic details will be public; full preview will require permission.",
      },
    ],
  },
  "Is there real-time code collaboration?": {
    text:
      "Real-time collaborative coding is being designed. It will let developers code together instantly — currently in design (45%).",
    followUps: [
      {
        question: "Will it support multiple languages?",
        text:
          "Yes, the plan includes support for popular languages and live preview.",
      },
    ],
  },
  "What’s Project Ideas Hub?": {
    text:
      "It’s a feature to explore and share innovative project ideas with others — planning phase (25%).",
    followUps: [
      {
        question: "Can I submit ideas anonymously?",
        text: "Yes, anonymous submission will be supported.",
      },
    ],
  },
  "How does Skill Assessment work?": {
    text:
      "We're researching AI-powered skill testing and recommendations to help you find your best matches — early research phase.",
    followUps: [
      {
        question: "Will there be quizzes or coding rounds?",
        text: "Yes, assessments may include coding tasks, quizzes, and GitHub metrics.",
      },
    ],
  },
};

const questionOptions = Object.keys(QUESTIONS);

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true); // New state to track initial load
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat, isOpen]);

  // Handler for when the user clicks a main question button
  const handleQuestionClick = (q) => {
    const selected = QUESTIONS[q];
    if (!selected) return;

    // Clear loader when a question is clicked
    setIsLoadingOptions(false);

    // Add the user's question to the chat
    setChat((prev) => [...prev, { from: "user", text: q }]);

    // Show the typing indicator
    setIsTyping(true);

    // After a delay, add the bot's main answer
    setTimeout(() => {
      setChat((prev) => [...prev, { from: "bot", text: selected.text }]);
      setIsTyping(false);

      // After another delay, add the follow-up buttons AND the Main Menu button
      setTimeout(() => {
        setChat((prev) => [
          ...prev,
          { from: "bot", followUps: selected.followUps, parentQuestion: q, showMainMenuButton: true },
        ]);
      }, 1000);
    }, 1000);
  };

  // Handler for when the user clicks a follow-up question
  const handleFollowUpClick = (parentQuestion, followUp) => {
    // Add the user's follow-up question to the chat
    setChat((prev) => [...prev, { from: "user", text: followUp.question }]);

    // Show the typing indicator
    setIsTyping(true);

    // After a delay, add the bot's response
    setTimeout(() => {
      setIsTyping(false);
      setChat((prev) => [...prev, { from: "bot", text: followUp.text }]);

      // Always add the "You can navigate to the main menu" prompt and button after any follow-up answer
      setTimeout(() => {
        setChat((prev) => [
          ...prev,
          { from: "bot", text: "You can navigate to the main menu for more options.", isMainMenuPrompt: true },
        ]);
      }, 500); // Small delay for the prompt message
    }, 1000); // Delay for bot's answer
  };

  // Renders the initial set of questions with conditional delay
  const renderInitialQuestions = () => {
    // Clear loader whenever initial questions are rendered
    setIsLoadingOptions(false);

    // Step 1: Display the welcome message immediately if it's the first load
    if (isFirstLoad) {
      setChat([]); // Clear chat only on first load
      setChat([
        {
          from: "bot",
          text: "✨ Welcome to DevTinder! I'm Nova, your assistant. I'm here to help you get started. What would you like to know? ❤️",
          isWelcome: true,
        },
      ]);

      // Step 2: After a short delay, show the loader
      setTimeout(() => {
        setIsLoadingOptions(true);
      }, 500);

      // Step 3: After 3 seconds of loading, hide the loader and start showing questions one by one
      setTimeout(() => {
        setIsLoadingOptions(false);
        // Add a new message to chat that will render the initial questions with staggered effect
        setChat((prevChat) => [
          ...prevChat,
          { from: "bot", initialOptions: questionOptions, isStaggered: true }
        ]);
        setIsFirstLoad(false); // Mark first load as complete
      }, 3500); // 500ms initial delay + 3000ms loader duration
    } else {
      // If it's not the first load (i.e., coming from Main Menu button), append questions instantly
      setChat((prevChat) => [
        ...prevChat,
        { from: "bot", initialOptions: questionOptions, isStaggered: false } // No staggered effect for subsequent loads
      ]);
    }
  };

  // Function to reset all states when closing the chatbot
  const resetChatbot = () => {
    setIsOpen(false);
    setChat([]);
    setIsTyping(false);
    setIsLoadingOptions(false);
    setIsFirstLoad(true); // Reset to true so next open is a fresh start
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chatbot toggle button with neon effect and robot icon */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            renderInitialQuestions();
          }}
          className="bg-black text-white p-4 rounded-full border border-white/10 shadow-xl transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 flex items-center gap-2 group"
          style={{ boxShadow: "0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3), 0 0 40px rgba(0, 255, 255, 0.1)" }}
          title="Open Nova Chatbot"
        >
          {/* Robot SVG Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-cpu group-hover:animate-pulse"
          >
            <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
            <rect x="9" y="9" width="6" height="6"></rect>
            <path d="M15 2v2"></path>
            <path d="M15 20v2"></path>
            <path d="M2 15h2"></path>
            <path d="M20 15h2"></path>
            <path d="M15 4h-2"></path>
            <path d="M15 20h-2"></path>
            <path d="M4 9v-2"></path>
            <path d="M20 9v-2"></path>
          </svg>
          <span className="font-bold">NOVA</span>
        </button>
      )}

      {/* Chatbot window */}
      {isOpen && (
        <div className="w-[320px] h-[470px] bg-zinc-950 text-white border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-zinc-900 px-4 py-2 flex justify-between items-center text-sm">
            <span className="font-bold">Nova - DevTinder Assistant</span>
            <button
              onClick={resetChatbot} // Use the resetChatbot function here
              className="text-white text-xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Chat messages container */}
          <div className="flex-1 p-3 space-y-3 overflow-y-auto custom-scrollbar">
            {chat.map((msg, idx) => (
              <div key={idx} className={`${msg.from === "user" ? "text-right" : "text-left"}`}>
                {/* Regular text messages (user, bot answer, welcome, main menu prompt) */}
                {!msg.followUps && !msg.initialOptions && !msg.isMainMenuPrompt && (
                  <div
                    className={`inline-block max-w-[80%] px-4 py-2 text-sm ${
                      msg.from === "user"
                        ? "bg-emerald-500 rounded-xl text-white"
                        : msg.isWelcome
                        ? "bg-blue-700 text-white font-bold rounded-xl shadow-lg border-2 italic border-white/20 my-2 mx-auto"
                        : "bg-purple-700 rounded-xl text-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                )}

                {/* Conditional rendering for follow-up questions and Main Menu button */}
                {msg.followUps && (
                  <div className="flex flex-wrap gap-2 mt-2 text-left">
                    {msg.followUps.map((fup, i) => (
                      <button
                        key={i}
                        onClick={() => handleFollowUpClick(msg.parentQuestion, fup)}
                        className="bg-zinc-700 hover:bg-zinc-600 text-sm px-3 py-1 rounded-full border border-white/10 transition font-medium"
                      >
                        {fup.question}
                      </button>
                    ))}
                    {/* Main Menu button always appears with follow-up options */}
                    <button
                      onClick={renderInitialQuestions}
                      className="bg-orange-500  text-sm px-3 py-1 rounded-full border border-white transition flex items-center gap-1"
                    >
                      <span>🗃️ </span>
                      <span className="text-black font-bold" >Main Menu</span>
                    </button>
                  </div>
                )}
                {/* Conditionally render the "Main Menu" prompt and button */}
                {msg.isMainMenuPrompt && (
                  <div className="mt-2 flex flex-col gap-2 justify-start items-start">
                    <div className="bg-pink-600 inline-block px-4 py-2 text-sm rounded-xl text-white italic">
                        {msg.text} {/* Use msg.text for the prompt message */}
                    </div>
                    <button
                      onClick={renderInitialQuestions}
                      className="bg-orange-500 text-sm px-3 py-1 rounded-full border border-white transition flex items-center gap-1"
                    >
                      <span>🗃️ </span>
                      <span className="text-black font-bold" >Main Menu</span>
                    </button>
                  </div>
                )}

                {/* Conditional rendering for initial questions / main menu questions */}
                {msg.initialOptions && (
                  <div key={`initial-options-${idx}`} className="flex flex-wrap gap-2 mt-2 text-left">
                    {msg.initialOptions.map((opt, index) => (
                      <button
                        key={opt}
                        onClick={() => handleQuestionClick(opt)}
                        className={`bg-zinc-700 hover:bg-zinc-600 text-sm px-3 py-1 rounded-xl border border-white/10 ${msg.isStaggered ? 'opacity-0 animate-fade-in' : ''}`}
                        style={msg.isStaggered ? { animationDelay: `${index * 200}ms` } : {}}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Conditional loader */}
            {isLoadingOptions && (
              <div className="text-zinc-400 text-sm italic flex items-center space-x-2">
                <div className="dot-flashing"></div>
                <span>Looking for questions...</span>
              </div>
            )}

            {isTyping && (
              <div className="text-zinc-400 text-sm italic">Nova is typing...</div>
            )}

            <div ref={chatRef} />
          </div>
        </div>
      )}
      <style>{`
        /* Custom Scrollbar for better aesthetics */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0a0a0a; /* Bold black to match new chat window BG */
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4b5563; /* Tailwind's bg-gray-600 */
          border-radius: 4px;
          border: 2px solid #0a0a0a;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #6b7280; /* Tailwind's bg-gray-500 */
        }

        /* Loader Animation */
        .dot-flashing {
          position: relative;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #94a3b8; /* Tailwind's zinc-400 */
          color: #94a3b8;
          animation: dotFlashing 1s infinite linear alternate;
          animation-delay: 0s;
        }
        .dot-flashing::before, .dot-flashing::after {
          content: "";
          display: inline-block;
          position: absolute;
          top: 0;
        }
        .dot-flashing::before {
          left: -8px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #94a3b8;
          color: #94a3b8;
          animation: dotFlashing 1s infinite alternate;
          animation-delay: 0s;
        }
        .dot-flashing::after {
          left: 8px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #94a3b8;
          color: #94a3b8;
          animation: dotFlashing 1s infinite alternate;
          animation-delay: 0.2s;
        }
        @keyframes dotFlashing {
          0% {
            background-color: #94a3b8;
          }
          50%, 100% {
            background-color: #3b4249;
          }
        }
        
        /* Fade-in animation for questions */
        .animate-fade-in {
          animation: fadeIn 0.5s forwards;
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
