const computeMetrics = (messages) => {
  if (messages.length === 0) return null;

  const senders = [...new Set(messages.map((m) => m.sender))];
  if (senders.length < 2) {
    throw new Error("Need at least two participants in the chat");
  }

  // We'll assume the second sender to appear is "Them" and the first is "You" (or whoever exported)
  // For better accuracy, we could ask the user who they are, but for now we just label them.
  const userA = senders[0];
  const userB = senders[1];

  let totalWordsA = 0;
  let totalWordsB = 0;
  let msgCountA = 0;
  let msgCountB = 0;
  let startsA = 0;
  let startsB = 0;

  let responseTimesA = []; // times A took to respond to B
  let responseTimesB = []; // times B took to respond to A

  // Very basic emoji matching
  const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}]/gu;
  let emojisA = 0;
  let emojisB = 0;

  let lastSender = null;
  let lastTimestamp = null;

  // Simple string-to-date converter (assumes DD/MM/YY or MM/DD/YY with HH:MM)
  // This is highly simplified and error-prone for real-world varying locales, but works for MVP estimation
  const parseDate = (str) => {
    // just return index as a pseudo-time if parsing is too complex, but let's try Date
    const d = new Date(str);
    if (isNaN(d.getTime())) {
      // Fallback: extract numbers
      const nums = str.match(/\d+/g);
      if (nums && nums.length >= 5) {
        return new Date(2000+parseInt(nums[2]%100), nums[1]-1, nums[0], nums[3], nums[4]);
      }
      return new Date(); // Extreme fallback
    }
    return d;
  };

  messages.forEach((msg, index) => {
    const isA = msg.sender === userA;
    const currentTs = parseDate(msg.timestamp);

    if (isA) {
      totalWordsA += msg.wordCount;
      msgCountA++;
      const emojiMatch = msg.text.match(emojiRegex);
      if (emojiMatch) emojisA += emojiMatch.length;
    } else if (msg.sender === userB) {
      totalWordsB += msg.wordCount;
      msgCountB++;
      const emojiMatch = msg.text.match(emojiRegex);
      if (emojiMatch) emojisB += emojiMatch.length;
    }

    if (lastSender && lastSender !== msg.sender) {
      // This is a reply
      if (lastTimestamp) {
        const gapMs = currentTs - lastTimestamp;
        const gapHours = gapMs / (1000 * 60 * 60);
        
        // If gap is very large (> 24h), we count it as a "start" of a new conversation
        if (gapHours > 24) {
          if (isA) startsA++;
          else startsB++;
        } else if (gapHours >= 0 && gapHours < 100) { // filter out parsing errors that result in negative or insane gaps
          if (isA) responseTimesA.push(gapHours);
          else responseTimesB.push(gapHours);
        }
      }
    } else if (!lastSender) {
      // First message ever
      if (isA) startsA++;
      else if (msg.sender === userB) startsB++;
    }

    lastSender = msg.sender;
    lastTimestamp = currentTs;
  });

  const avgResponseA = responseTimesA.length ? (responseTimesA.reduce((a,b)=>a+b,0) / responseTimesA.length).toFixed(2) : 0;
  const avgResponseB = responseTimesB.length ? (responseTimesB.reduce((a,b)=>a+b,0) / responseTimesB.length).toFixed(2) : 0;

  const avgWordsA = msgCountA ? (totalWordsA / msgCountA).toFixed(1) : 0;
  const avgWordsB = msgCountB ? (totalWordsB / msgCountB).toFixed(1) : 0;

  const totalStarts = startsA + startsB;
  const initRatioA = totalStarts ? ((startsA / totalStarts) * 100).toFixed(0) : 50;
  const initRatioB = totalStarts ? ((startsB / totalStarts) * 100).toFixed(0) : 50;

  return {
    participants: { A: userA, B: userB },
    metrics: {
      userA: {
        avgResponseTimeHours: parseFloat(avgResponseA),
        avgMessageLength: parseFloat(avgWordsA),
        initiationPercentage: parseFloat(initRatioA),
        totalMessages: msgCountA,
        emojiCount: emojisA
      },
      userB: {
        avgResponseTimeHours: parseFloat(avgResponseB),
        avgMessageLength: parseFloat(avgWordsB),
        initiationPercentage: parseFloat(initRatioB),
        totalMessages: msgCountB,
        emojiCount: emojisB
      }
    }
  };
};

module.exports = { computeMetrics };
