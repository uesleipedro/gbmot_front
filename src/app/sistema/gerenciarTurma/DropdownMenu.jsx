import { useState, useRef, useEffect } from "react";
import { EllipsisVertical } from "lucide-react";

export default function DropdownMenu({ items = [] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      {/* Botão */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="p-2 rounded hover:bg-gray-100"
      >
        <EllipsisVertical className="w-5 h-5 text-gray-600" />
      </button>

      {/* Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {items.map((item, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
