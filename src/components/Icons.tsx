import React from "react";
import { ArrowRight, ExternalLink, X, Mail, Link as LinkIcon, Code, Phone } from "lucide-react";

export function ArrowForward({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}

export function OpenInNew({ className }: { className?: string }) {
  return <ExternalLink size={14} className={className} />;
}

export function Close({ size = 16, className }: { size?: number; className?: string }) {
  return <X size={size} className={className} />;
}

export { ArrowRight, Mail, LinkIcon, Code, Phone };
