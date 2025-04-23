import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

export default function FloatingDescription({ description }) {
  const [isOpen, setIsOpen] = useState(false);
  const descriptionRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (descriptionRef.current && !descriptionRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block">
      {/* Open Icon */}
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600 hover:text-blue-600">
        <Info size={20} />
      </button>

      {/* Floating Description */}
      {isOpen && (
        <motion.div
          ref={descriptionRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute left-0 mt-2 w-64 bg-white shadow-lg p-3 rounded-lg border border-gray-200 z-50"
        >
          <p className="text-sm text-gray-700">{description}</p>
        </motion.div>
      )}
    </div>
  );
}
