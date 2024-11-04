import React from 'react';

interface ClientButtonProps {
  name: string;
  onClick: () => void;
}

export function ClientButton({ name, onClick }: ClientButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white border-2 border-gray-200 p-4 rounded-lg shadow-sm hover:border-black hover:shadow-md transition-all duration-200 flex items-center justify-center h-24 w-full"
    >
      <span className="text-gray-900 font-medium text-center break-words">
        {name}
      </span>
    </button>
  );
}