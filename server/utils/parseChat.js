// Supports multiple common WhatsApp export formats (iOS and Android, various locales)
const parseChat = (rawText) => {
  const cleanText = rawText.replace(/\0/g, ''); // Fix UTF-16 read as UTF-8
  const lines = cleanText.split(/\r\n|\n|\r/);
  const messages = [];
  
  // Ultimate permissive regex for WhatsApp chat formats
  // Matches: 
  // [15/01/2023, 10:45:00] Alice: Hey
  // 15/01/2023, 10:45 - Bob: Hey
  // 1/15/23, 10:45 AM - Charlie: Hello
  // 05/05/2026, 21:30 David: Hey
  const universalRegex = /^\[?([0-9\/\-\.,\s:]+(?:[a-zA-Z\.]{2,4})?)\]?\s*(?:-)?\s*(.*?):\s+(.*)$/;

  let currentMessage = null;

  // Track an artificial timestamp for dummy files to ensure they are sequential
  let fakeTimeCounter = new Date().getTime() - (1000 * 60 * 60 * 24); // Start 24 hours ago

  for (let i = 0; i < lines.length; i++) {
    // Remove invisible directional characters often added by iOS WhatsApp and weird spacing
    const rawLine = lines[i].replace(/[\u200E\u200F\u202A-\u202E\u202F]/g, '');
    const line = rawLine.trim();
    if (!line) continue;

    let match = line.match(universalRegex);
    
    // Check for manually typed dummy formats (e.g., "Boy:" on its own line)
    let isDummySender = false;
    let dummySenderName = "";
    if (!match && line.endsWith(':') && line.length < 30) {
      isDummySender = true;
      dummySenderName = line.slice(0, -1).trim();
    }

    if (match || isDummySender) {
      const sender = match ? match[2].trim() : dummySenderName;
      
      // Check if it's a system message masquerading as a sender
      if (
        sender.length > 50 || 
        sender.includes(" changed ") || 
        sender.includes(" added ") || 
        sender.includes(" removed ") ||
        sender.includes(" left") ||
        sender.toLowerCase().includes("messages to this chat and calls")
      ) {
        continue;
      }

      if (currentMessage) {
        messages.push(currentMessage);
      }

      // Generate a fake timestamp sequential progression if it's a dummy file
      fakeTimeCounter += 1000 * 60 * 5; // Add 5 minutes per message
      const dateTime = match ? match[1].trim() : new Date(fakeTimeCounter).toISOString();
      const text = match ? match[3].trim() : "";
      
      currentMessage = {
        sender: sender,
        timestamp: dateTime,
        text: text,
        wordCount: text ? text.split(/\s+/).length : 0,
      };
    } else {
      // Continuation of a multiline message, or the first line of a dummy format message
      if (currentMessage) {
        currentMessage.text += (currentMessage.text ? '\n' : '') + line;
        currentMessage.wordCount += line.split(/\s+/).length;
      }
    }
  }

  if (currentMessage) {
    messages.push(currentMessage);
  }

  // Debug: If we still fail to parse, log the first few lines to help us understand why
  if (messages.length < 20) {
    console.error("DEBUG: Failed to parse enough messages. Here are the first 10 cleaned lines of the file:");
    lines.slice(0, 10).forEach(l => console.error(l.replace(/[\u200E\u200F\u202A-\u202E\u202F]/g, '').trim()));
  }

  return messages;
};

module.exports = { parseChat };
