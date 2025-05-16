import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import heartAnimation from "../assets/heart.json";

const LoveMessage = () => {
  const audioRef = useRef(null);
  const [isAccepted, setIsAccepted] = useState(false);
  const [countdown, setCountdown] = useState(30); // countdown before accept

  useEffect(() => {
    const audio = audioRef.current;

    const tryPlay = () => {
      if (audio) {
        audio.play().catch((err) => {
          console.warn("Autoplay blocked, wait for user interaction", err);
        });
      }
    };

    // Load confetti script
    const confettiScript = document.createElement("script");
    confettiScript.src =
      "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
    confettiScript.onload = () => {
      window.confetti?.({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
      });
    };
    document.body.appendChild(confettiScript);

    // Try playing audio on click
    tryPlay();
    window.addEventListener("click", tryPlay);

    // Disable right-click
    const disableRightClick = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);

    // Block back button
    const blockBack = () => {
      window.history.pushState(null, null, window.location.href);
    };
    blockBack();
    window.addEventListener("popstate", blockBack);

    return () => {
      window.removeEventListener("click", tryPlay);
      document.removeEventListener("contextmenu", disableRightClick);
      window.removeEventListener("popstate", blockBack);
    };
  }, []);

  // Countdown logic
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Handle acceptance
  const handleAccept = () => {
    // Sweet animation
    const heart = document.createElement("div");
    heart.innerText = "💞";
    heart.className =
      "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl animate-bounce z-[10000]";
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
      setIsAccepted(true);
    }, 3000); // display for 3 seconds
  };

  if (isAccepted) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-6 overflow-hidden text-center"
      style={{ pointerEvents: "auto" }}
    >
      <audio ref={audioRef} src="/love.mp3" loop />
      <Lottie animationData={heartAnimation} loop className="w-44 sm:w-52 mb-6" />

      <h1 className="text-3xl sm:text-4xl font-bold text-pink-500 drop-shadow-lg">
        💖 I love You So much BABE but You’ve Been Hacked by Love 💖
      </h1>

      <p className="text-base sm:text-lg text-gray-700 mt-2 mb-6 max-w-md">
        From Your<span className="font-semibold text-pink-600">FineBoy</span> to you my Queen — until
        you accept this love hack, nothing else shall work 😘 hahaha kill me later, chia babe ndagukunda birenze peu hahaha you're mine forever i want to achieve a lot with you and also keep growing old with you forever
      </p>

      {countdown > 0 ? (
        <p className="text-pink-600 font-semibold text-base sm:text-lg">
          ⏳ Wait {countdown} seconds before you can acceept by feeling our love...
        </p>
      ) : (
        <button
          onClick={handleAccept}
          className="px-6 py-3 bg-pink-500 text-white rounded-2xl shadow-lg hover:bg-pink-600 transition-all text-sm sm:text-base"
        >
          💖 You're mine forever 💖
        </button>
      )}
    </div>
  );
};

export default LoveMessage;
