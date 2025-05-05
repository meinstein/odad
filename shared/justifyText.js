function justifyTextChildren(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error(`Container with selector "${containerSelector}" not found.`);
    return;
  }

  // Use direct children of the container
  const lines = container.children;
  if (lines.length === 0) {
    // No children to process
    return;
  }

  let longestLineLength = 0;

  // Convert HTMLCollection to Array for easier iteration
  const lineElements = Array.from(lines);

  // First pass: find the longest line length among child elements
  lineElements.forEach(line => {
    // Ensure we only process element nodes
    if (line.nodeType === Node.ELEMENT_NODE) {
      const text = line.textContent || ''; // Handle null/undefined
      const charCount = text.length;
      if (charCount > longestLineLength) {
        longestLineLength = charCount;
      }
    }
  });

  // Second pass: apply letter-spacing
  lineElements.forEach(line => {
    if (line.nodeType === Node.ELEMENT_NODE) {
      const text = line.textContent || '';
      const charCount = text.length;
      // Avoid division by zero for empty lines and ensure it's an element
      if (charCount > 0) {
        const letterSpacing = (longestLineLength - charCount) / charCount;
        // Check if the element is an HTMLElement before setting style
        if (line instanceof HTMLElement) {
          line.style.letterSpacing = `${letterSpacing}ch`;
        }
      } else if (line instanceof HTMLElement) {
        // Reset spacing for empty lines or non-applicable elements
        line.style.letterSpacing = 'normal';
      }
    }
  });
}
