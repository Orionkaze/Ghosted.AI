// Supports multiple common WhatsApp export formats (iOS and Android, various locales)
const parseChat = (rawText) => {
  const lines = rawText.split('\n');
  const messages = [];
  
  // Format 1: [DD/MM/YYYY, HH:MM:SS] Sender: Message  (iOS)
  const regex1 = /^\[([^\]]+)\]\s+([^:]+):\s+(.*)$/;
  // Format 2: DD/MM/YY, HH:MM - Sender: Message (Android)
  const regex2 = /^([0-9\/\-\.,\s:]+(?:[a-zA-Z\.]+)?)\s+-\s+([^:]+):\s+(.*)$/;

  let currentMessage = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    let match = line.match(regex1) || line.match(regex2);

    if (match) {
      // Check if it's a system message (sender length too long or contains system words)
      const sender = match[2].trim();
      if (
        sender.length > 50 || 
        sender.includes(" changed ") || 
        sender.includes(" added ") || 
        sender.includes(" removed ") ||
        sender.includes(" left")
      ) {
        continue;
      }

      if (currentMessage) {
        messages.push(currentMessage);
      }

      const dateTime = match[1].trim();
      const text = match[3].trim();
      
      currentMessage = {
        sender: sender,
        timestamp: dateTime,
        text: text,
        wordCount: text.split(/\s+/).length,
      };
    } else {
      // Continuation of a multiline message
      if (currentMessage) {
        currentMessage.text += '\n' + line;
        currentMessage.wordCount += line.split(/\s+/).length;
      }
    }
  }

  if (currentMessage) {
    messages.push(currentMessage);
  }

  return messages;
};

module.exports = { parseChat };
