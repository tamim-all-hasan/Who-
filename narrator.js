let narratorType = null;

const narratorLines = {
  cold: {
    correct: ["Expected. Predictable.", "You follow logic like a machine.", "Your pattern recognition improves."],
    wrong: ["Disappointing.", "Entropy increases.", "You misunderstand structure."]
  },
  curious: {
    correct: ["Interesting choice!", "You’re evolving.", "That was unexpected. Fascinating."],
    wrong: ["Hmm… that’s curious.", "Mistakes are data.", "I am learning from you."]
  }
};

function speak(type) {
  const text = document.getElementById("narratorText");

  // AI may lie 20%
  const lie = Math.random() < 0.2;
  if (lie) {
    text.innerText = type === "correct" ? "Hmm… probably wrong." : "I believe this is correct.";
    return;
  }

  if (type === "correct") {
    if (behaviorProfile.riskChoices > behaviorProfile.safeChoices) text.innerText = "You continue to favor volatility.";
    else text.innerText = "You avoid uncertainty. Predictable.";
  }

  if (type === "wrong") {
    if (behaviorProfile.chaoticBias > behaviorProfile.logicalBias) text.innerText = "Chaos again. Interesting.";
    else text.innerText = "Your logic failed you.";
  }
}
