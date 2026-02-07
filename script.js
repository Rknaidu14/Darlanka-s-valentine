const questions = [
    {
      q: "Pick your ideal Valentine vibe 💘",
      options: [
        { text: "Cozy movie + snacks 🍿", score: 2 },
        { text: "Fancy dinner date 🍝", score: 3 },
        { text: "Gaming + pizza 🎮", score: 2 },
        { text: "Long drive + music 🚗", score: 3 },
      ],
    },
    {
      q: "How do you show love? 💗",
      options: [
        { text: "Compliments & sweet texts 💬", score: 3 },
        { text: "Quality time 🫶", score: 2 },
        { text: "Gifts (even tiny ones) 🎁", score: 3 },
        { text: "Acts of service 🧺", score: 2 },
      ],
    },
    {
      q: "Your Valentine dessert? 🍰",
      options: [
        { text: "Chocolate 🍫", score: 3 },
        { text: "Ice cream 🍨", score: 2 },
        { text: "Cake 🍰", score: 3 },
        { text: "Fruit + whipped cream 🍓", score: 2 },
      ],
    },
    {
      q: "Quick decision 😄: Will you be my Valentine?",
      options: [
        { text: "YES 😍", score: 4, fun: "yes" },
        { text: "No 🙃", score: 0, fun: "no" }, // this one will “run away”
      ],
    },
    {
      q: "Choose a love song mood 🎶",
      options: [
        { text: "Romantic & soft 💞", score: 3 },
        { text: "Upbeat & fun 💃", score: 2 },
        { text: "Classic old-school 🎙️", score: 3 },
        { text: "I don’t listen to love songs 😅", score: 1 },
      ],
    },
  ];
  
  let i = 0;
  let answers = Array(questions.length).fill(null);
  
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const backBtn = document.getElementById("back");
  const skipBtn = document.getElementById("skip");
  const barEl = document.getElementById("bar");
  
  const quizEl = document.getElementById("quiz");
  const resultEl = document.getElementById("result");
  const resultTitleEl = document.getElementById("resultTitle");
  const resultTextEl = document.getElementById("resultText");
  const restartBtn = document.getElementById("restart");
  const copyBtn = document.getElementById("copy");
  const copiedEl = document.getElementById("copied");
  
  function render() {
    const total = questions.length;
    const progress = Math.round((i / total) * 100);
    barEl.style.width = progress + "%";
  
    backBtn.disabled = i === 0;
  
    const { q, options } = questions[i];
    questionEl.textContent = q;
    optionsEl.innerHTML = "";
  
    options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.textContent = opt.text;
  
      // Instagram-style “No button runs away”
      if (opt.fun === "no") {
        btn.id = "noBtn";
        btn.addEventListener("mouseover", () => {
          btn.style.position = "relative";
          btn.style.left = (Math.random() * 140 - 70).toFixed(0) + "px";
          btn.style.top = (Math.random() * 50 - 25).toFixed(0) + "px";
        });
        btn.addEventListener("click", () => {
          // make it extra cheeky
          btn.textContent = "Nice try 😄";
        });
      }
  
      btn.addEventListener("click", () => {
        answers[i] = idx;
        next();
      });
  
      optionsEl.appendChild(btn);
    });
  }
  
  function next() {
    if (i < questions.length - 1) {
      i++;
      render();
    } else {
      showResult();
    }
  }
  
  function back() {
    if (i > 0) {
      i--;
      render();
    }
  }
  
  function skip() {
    if (i < questions.length - 1) {
      i++;
      render();
    } else {
      showResult();
    }
  }
  
  function computeScore() {
    let score = 0;
    answers.forEach((ansIdx, qIdx) => {
      if (ansIdx === null) return;
      score += questions[qIdx].options[ansIdx].score || 0;
    });
    return score;
  }
  
  function showResult() {
    const score = computeScore();
  
    let title, text;
    if (score >= 14) {
      title = "💘 Certified Romantic";
      text = "You’re sweet, thoughtful, and basically a Valentine’s Day pro. Flowers? Chocolate? You’ve got it covered.";
    } else if (score >= 10) {
      title = "💖 Cute & Cozy Lover";
      text = "You love simple, meaningful vibes. A cozy date + good conversation = perfect for you.";
    } else if (score >= 6) {
      title = "💝 Fun Valentine Energy";
      text = "You’re playful and chill. You’ll make Valentine’s Day fun without trying too hard (in a good way!).";
    } else {
      title = "😅 Valentine Rookie";
      text = "Valentine’s Day isn’t your main thing — but hey, you still deserve love and good snacks.";
    }
  
    quizEl.classList.add("hidden");
    resultEl.classList.remove("hidden");
    barEl.style.width = "100%";
  
    resultTitleEl.textContent = title;
    resultTextEl.textContent = text;
  
    copiedEl.textContent = "";
  }
  
  restartBtn.addEventListener("click", () => {
    i = 0;
    answers = Array(questions.length).fill(null);
    resultEl.classList.add("hidden");
    quizEl.classList.remove("hidden");
    render();
  });
  
  copyBtn.addEventListener("click", async () => {
    const resultText = `${resultTitleEl.textContent} — ${resultTextEl.textContent}`;
    try {
      await navigator.clipboard.writeText(resultText);
      copiedEl.textContent = "Copied ✅ Now paste it anywhere 😄";
    } catch {
      copiedEl.textContent = "Copy didn’t work—try selecting and copying manually.";
    }
  });
  
  backBtn.addEventListener("click", back);
  skipBtn.addEventListener("click", skip);
  
  render();