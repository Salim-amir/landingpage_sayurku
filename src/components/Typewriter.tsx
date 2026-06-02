import { useState, useEffect } from "react";

interface TypewriterProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
}

export default function Typewriter({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetween = 2000,
}: TypewriterProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullPhrase = phrases[currentPhraseIndex];

    if (isDeleting) {
      // Deleting process
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      // Typing process
      timer = setTimeout(() => {
        setCurrentText((prev) => fullPhrase.slice(0, prev.length + 1));
      }, typingSpeed);
    }

    // If fully typed, wait and then delete
    if (!isDeleting && currentText === fullPhrase) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, delayBetween);
    }

    // If fully deleted, move to the next phrase
    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, delayBetween]);

  return (
    <span className="relative">
      <span className="text-green-600 font-bold drop-shadow-sm select-none">
        {currentText}
      </span>
      <span className="absolute -right-1.5 md:-right-3 top-0 h-[92%] w-[2px] md:w-[3px] bg-green-600 animate-blink"></span>
    </span>
  );
}
