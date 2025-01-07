import { useEffect } from 'react';

const useDevToolsPrevention = () => {
  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // Disable keyboard shortcuts and copy-paste
    const handleKeyDown = (e) => {
      // Prevent F12
      if (e.key === 'F12') {
        e.preventDefault();
      }
      // Prevent Ctrl+Shift+I and Cmd+Shift+I
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'i') {
        e.preventDefault();
      }
      // Prevent Ctrl+Shift+C and Cmd+Shift+C
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
      }
      // Prevent Ctrl+U and Cmd+U (view source)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
        e.preventDefault();
      }
      // Prevent copy (Ctrl+C or Cmd+C)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
        e.preventDefault();
      }
      // Prevent paste (Ctrl+V or Cmd+V)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') {
        e.preventDefault();
      }
      // Prevent cut (Ctrl+X or Cmd+X)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'x') {
        e.preventDefault();
      }
    };

    // Disable selection
    const disableSelection = (e) => {
      e.preventDefault();
    };

    // Disable copy
    const disableCopy = (e) => {
      e.preventDefault();
    };

    // Disable cut
    const disableCut = (e) => {
      e.preventDefault();
    };

    // Disable paste
    const disablePaste = (e) => {
      e.preventDefault();
    };

    // CSS to disable text selection
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    `;
    document.head.appendChild(style);

    // Add event listeners
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('selectstart', disableSelection);
    document.addEventListener('copy', disableCopy);
    document.addEventListener('cut', disableCut);
    document.addEventListener('paste', disablePaste);

    // Cleanup
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectstart', disableSelection);
      document.removeEventListener('copy', disableCopy);
      document.removeEventListener('cut', disableCut);
      document.removeEventListener('paste', disablePaste);
      document.head.removeChild(style);
    };
  }, []);
};

export default useDevToolsPrevention;