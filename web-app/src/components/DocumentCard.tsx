import React from "react";
import { Document } from "../DocumentProcessor";

interface DocumentCardProps {
  document: Document;
  isSelected?: boolean;
  onSelect?: (documentId: number) => void;
  onProcess?: (documentId: number) => void;
  isProcessing?: boolean;
  processingStep?: string;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  isSelected,
  onSelect,
  onProcess,
  isProcessing,
  processingStep
}) => (
  <div
    className={`document-card bg-white dark:bg-gray-800 shadow-lg shadow-blue-500/50 rounded-md p-4 relative group overflow-hidden ${isProcessing ? '' : 'cursor-pointer'} ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
    onClick={() => !isProcessing && onSelect && onSelect(document.id)}
  >
    {onSelect && !isProcessing && (
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onSelect(document.id)}
        onClick={(e) => e.stopPropagation()}
        className="absolute top-2 right-2 h-6 w-6 z-10"
      />
    )}
    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{document.title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 truncate">
      {document.content.length > 100
        ? `${document.content.substring(0, 100)}...`
        : document.content}
    </p>
    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
      Correspondent: <span className="font-bold text-blue-600 dark:text-blue-400">{document.correspondent}</span>
    </p>
    <div className="mt-4 flex items-center justify-between">
      <div>
        {document.tags.map((tag) => (
          <span
            key={tag}
            className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      {onProcess && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onProcess(document.id);
          }}
          disabled={isProcessing}
          className="ml-2 bg-green-600 text-white dark:bg-green-700 px-3 py-1 rounded text-sm hover:bg-green-700 dark:hover:bg-green-800 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isProcessing ? "Processing..." : "Process"}
        </button>
      )}
    </div>
    {isProcessing && processingStep && (
      <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/30 rounded">
        <div className="flex items-center space-x-2">
          <svg className="animate-spin h-4 w-4 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{processingStep}</span>
        </div>
      </div>
    )}
    <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 rounded-md">
      <div className="text-sm text-white p-2 bg-gray-800 dark:bg-gray-900 rounded-md w-full max-h-full overflow-y-auto">
        <h3 className="text-lg font-semibold text-white">{document.title}</h3>
        <p className="mt-2 whitespace-pre-wrap">{document.content}</p>
        <p className="mt-2">
          Correspondent: <span className="font-bold text-blue-400">{document.correspondent}</span>
        </p>
        <div className="mt-4">
          {document.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default DocumentCard;
