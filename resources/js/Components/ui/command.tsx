import React from 'react';

interface CommandProps {
  children: React.ReactNode;
  className?: string;
}

export const Command: React.FC<CommandProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-2 ${className}`}>
      {children}
    </div>
  );
};

interface CommandGroupProps {
  heading: string;
  children: React.ReactNode;
  className?: string;
}

export const CommandGroup: React.FC<CommandGroupProps> = ({ heading, children, className = '' }) => {
  return (
    <div className={`mb-2 ${className}`}>
      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">{heading}</p>
      <div>{children}</div>
    </div>
  );
};

interface CommandItemProps {
  children: React.ReactNode;
  onSelect?: () => void;
  className?: string;
}

export const CommandItem: React.FC<CommandItemProps> = ({ children, onSelect, className = '' }) => {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors ${className}`}
    >
      {children}
    </button>
  );
};
