import { useState, useEffect, useRef } from "react";

const LockScreen = ({ onUnlock }) => {
  const [input, setInput] = useState("");
  const [typedText, setTypedText] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(30);
  const secret = "babe";
  const inputRef = useRef(null);
  const kissAudio = useRef(null);

  const fakeTerminal = `
🔒 NOW YOU'RE HACKED I'M Connecting to your heart...
💭 Whisper detected... someone’s trying to reach your soul.
🌌 Sending hidden feelings to your heart’s deepest place...
💣 Clearing out fake loves and empty memories from past...
🧠 Locking every exit — no running away this time because you're mine.
💘 A love spell has been placed... it can't be undone.
📿 You’re under a secret admirer’s magic.
🧚‍♂️ If your heart is mine... you’ll know the name to set yourself free.
🔐 Type the only name you call me!! to continue...
`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fakeTerminal.length) {
        setTypedText((prev) => prev + fakeTerminal[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 40);

    const blockBack = () => window.history.pushState(null, null, window.location.href);
    blockBack();
    window.addEventListener("popstate", blockBack);
    document.addEventListener("contextmenu", (e) => e.preventDefault());

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countdownInterval);
          setTimeout(() => inputRef.current?.focus(), 500);
        }
        return prev - 1;
      });
    }, 1000);

    // 💋 Play kiss audio as terminal starts
    kissAudio.current?.play().catch((e) => {
      console.log("Audio autoplay was blocked:", e);
    });

    return () => {
      clearInterval(interval);
      window.removeEventListener("popstate", blockBack);
      document.removeEventListener("contextmenu", (e) => e.preventDefault());
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.toLowerCase() === secret.toLowerCase()) {
      // 🥳 Confetti and unlock
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
      script.onload = () => {
        window.confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.7 },
        });
      };
      document.body.appendChild(script);

      setTimeout(() => {
        onUnlock();
      }, 2000);
    } else {
      setError("Access Denied 💔 Try again, love");
      setInput("");
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black text-green-400 font-mono flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* 🔁 Loop kiss.mp3 in background */}
      <audio ref={kissAudio} src="/kiss.mp3" loop />
      
      <div className="w-full max-w-lg bg-black border border-green-500 p-4 rounded-lg shadow-md overflow-y-auto h-64 sm:h-72 md:h-80 lg:h-96">
        <pre className="whitespace-pre-wrap text-sm">{typedText}</pre>
      </div>

      {countdown > 0 ? (
        <p className="text-lg text-pink-500 mt-4 font-bold">
          ⏳ Wait... {countdown}s before unlock input shows
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center mt-4 w-full max-w-md space-y-2 sm:space-y-0 sm:space-x-2"
        >
          <input
            ref={inputRef}
            type="password"
            placeholder="Enter love code"
            className="p-2 rounded text-black w-full sm:w-auto"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError("");
            }}
          />
          <button
            type="submit"
            className="p-2 bg-green-600 hover:bg-green-700 rounded text-white w-full sm:w-auto"
          >
            💚 Unlock My heart babe
          </button>
        </form>
      )}

      {error && <p className="text-red-400 mt-2">{error}</p>}
    </div>
  );
};

export default LockScreen;
