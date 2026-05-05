// Supports multiple common WhatsApp export formats (iOS and Android, various locales)
const parseChat = (rawText) => {
  const lines = rawText.split('\n');
  const messages = [];
  
  // Regex patterns for different WhatsApp formats
  // Format 1: [DD/MM/YYYY, HH:MM:SS] Sender: Message
  const regex1 = /^\[(\d{1,2}\/\d{1,2}\/\d{2,4}), (\d{1,2}:\d{2}:\d{2}(?: [APM]{2})?)\] (.*?): (.*)$/;
  // Format 2: DD/MM/YY, HH:MM - Sender: Message
  const regex2 = /^(\d{1,2}\/\d{1,2}\/\d{2,4}), (\d{1,2}:\d{2}(?: [a-zA-Z]{2})?) - (.*?): (.*)$/;

  let currentMessage = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    let match = line.match(regex1) || line.match(regex2);

    if (match) {
      if (currentMessage) {
        messages.push(currentMessage);
      }

      const [, datePart, timePart, sender, text] = match;
      
      // Attempt to parse date to a timestamp, very roughly
      // In a real app we'd use date-fns or similar, but for MVP we rely on sequential order 
      // and relative time gaps, so exact Date object isn't strictly necessary if we parse it carefully,
      // but let's just store the raw strings and calculate rough Date objects later in metrics.
      
      currentMessage = {
        sender: sender.trim(),
        timestamp: `${datePart} ${timePart}`,
        text: text.trim(),
        wordCount: text.trim().split(/\s+/).length,
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
