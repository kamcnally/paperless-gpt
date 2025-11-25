import React from "react";
import { Document } from "../DocumentProcessor";
import DocumentCard from "./DocumentCard";

export interface DocumentsToProcessProps {
  documents: Document[];
  // Optional props for selection
  selectedDocuments?: number[];
  onSelectDocument?: (documentId: number) => void;
  // Optional props for individual processing
  onProcessDocument?: (documentId: number) => void;
  processingDocumentId?: number;
  processingStep?: string;
  // Optional prop for grid layout
  gridCols?: string;
  children?: React.ReactNode;
}

const DocumentsToProcess: React.FC<DocumentsToProcessProps> = ({
  documents,
  selectedDocuments,
  onSelectDocument,
  onProcessDocument,
  processingDocumentId,
  processingStep,
  gridCols = "1 md:grid-cols-2",
  children,
}) => (
  <section>
    {children}
    <div className={`grid grid-cols-${gridCols} gap-4`}>
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          document={doc}
          isSelected={selectedDocuments?.includes(doc.id)}
          onSelect={() => onSelectDocument && onSelectDocument(doc.id)}
          onProcess={onProcessDocument}
          isProcessing={processingDocumentId === doc.id}
          processingStep={processingDocumentId === doc.id ? processingStep : undefined}
        />
      ))}
    </div>
  </section>
);

export default DocumentsToProcess;
