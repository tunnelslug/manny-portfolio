import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import FramerButton from './FramerButton';

/* `navigator.pdfViewerEnabled` is the standard signal (Chrome 94+, Firefox
   99+). Where it is undefined (Safari, older engines) the iframe is the
   safer default: Safari renders PDFs inline. */
const inlinePdfSupported = () =>
  typeof navigator === 'undefined' || navigator.pdfViewerEnabled !== false;

const ResumeDialog = ({ open, onOpenChange }) => {
  const canInline = inlinePdfSupported();
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Accessible overlay with custom backdrop color and transition */}
        <Dialog.Overlay className="resume-overlay fixed inset-0 bg-[rgba(27,18,8,0.55)] z-[200] flex items-center justify-center p-6" />
        
        {/* Centering wrapper */}
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 pointer-events-none">
          <Dialog.Content 
            className="resume-panel bg-bg border border-border-strong w-full max-w-[960px] h-[92vh] flex flex-col overflow-hidden pointer-events-auto rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <Dialog.Title className="sr-only">Manny Flores - Resume</Dialog.Title>
            <Dialog.Description className="sr-only">
              Interactive PDF document viewer for Manny Flores's professional resume.
            </Dialog.Description>
 
            <header className="resume-panel-header flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
              <span className="resume-panel-title font-mono text-sm tracking-[0.10em] uppercase text-text-muted">
                Manny Flores · Resume
              </span>
              
              <div className="resume-panel-actions flex items-center gap-3">
                <FramerButton 
                  href="/resume.pdf" 
                  download="Manny_Flores_Resume_2026.pdf" 
                  variant="ghost"
                  className="resume-download-btn focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                >
                  Download
                </FramerButton>

                
                <Dialog.Close asChild>
                  <button 
                    className="resume-close-btn inline-flex items-center justify-center w-9 h-9 bg-none border border-border text-text-muted text-base cursor-pointer rounded-md transition-all hover:border-text hover:text-text focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2" 
                    aria-label="Close resume"
                  >
                    ✕
                  </button>
                </Dialog.Close>
              </div>
            </header>

            {canInline ? (
              <iframe
                src="/resume.pdf#navpanes=0&toolbar=0"
                className="resume-iframe w-full flex-1 border-none"
                title="Manny Flores Resume PDF Viewer"
              />
            ) : (
              /* Browsers without an inline PDF viewer (Android Chrome, most
                 in-app browsers) would show an empty frame here. */
              <div className="resume-fallback">
                <p>This browser opens PDFs in a separate viewer instead of inline.</p>
                <FramerButton href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  Open the resume
                </FramerButton>
              </div>
            )}
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ResumeDialog;
