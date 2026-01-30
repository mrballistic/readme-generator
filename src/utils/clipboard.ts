export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (!navigator.clipboard) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }

    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('FAILED to copy to clipboard', err);
    return false;
  }
};
