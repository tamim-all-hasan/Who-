let metaLayerActive = false;

function generatePuzzle() {
  const type = Math.floor(Math.random() * 3);

  if (type === 0) {
    let a = Math.floor(Math.random() * 10);
    let b = Math.floor(Math.random() * 10);
    let options = shuffle([a+b, a+b+1, a+b-1]);

    if (metaLayerActive && Math.random() < 0.1) options = shuffle(options); // change answer

    return {question: `${a} + ${b} = ?`, answer: a+b, options};
  }

  if (type === 1) {
    let letters = ["A","B","C","D"];
    return {question: "Next letter after C?", answer: "D", options: shuffle(["D","A","B"])};
  }

  if (type === 2) {
    return {question: "If A=1, B=2, then C+2=?", answer:5, options: shuffle([5,4,6])};
  }
}

// Philosophical questions
const philosophicalQuestions = [
  {
    q: "Would you trade freedom for security?",
    options:["Yes","No","Depends","I don't know"],
    effect: choice => {
      if(choice==="Yes") behaviorProfile.controlNeed++;
      if(choice==="No") behaviorProfile.riskChoices++;
      if(choice==="Depends") behaviorProfile.logicalBias++;
    }
  },
  {
    q: "Do you believe in absolute truth?",
    options:["Yes","No","Maybe","I question everything"],
    effect: choice => {
      if(choice==="Yes") behaviorProfile.patternSeeking++;
      if(choice==="No") behaviorProfile.chaoticBias++;
    }
  }
];

function generatePhilosophicalQuestion() {
  return philosophicalQuestions[Math.floor(Math.random() * philosophicalQuestions.length)];
}
