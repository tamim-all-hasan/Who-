let score = 0;
let entropy = 0;
let evolution = 0;
let currentPuzzle = null;
let predictabilityScore = 0;
let choiceHistory = [];
let behaviorProfile = {
  riskChoices:0, safeChoices:0,
  logicalBias:0, chaoticBias:0,
  controlNeed:0, patternSeeking:0
};
let reversed = false;

function nextPuzzle() {
  if (Math.random() < 0.15 && metaLayerActive) return displayPhilosophical();
  currentPuzzle = generatePuzzle();
  displayPuzzle(currentPuzzle);
}

function displayPuzzle(puzzle) {
  document.getElementById("puzzleArea").innerText = puzzle.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  puzzle.options.forEach(opt=>{
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = ()=>checkAnswer(opt);
    optionsDiv.appendChild(btn);
  });
}

function displayPhilosophical() {
  const pq = generatePhilosophicalQuestion();
  document.getElementById("puzzleArea").innerText = pq.q;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  pq.options.forEach(opt=>{
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = ()=> {
      pq.effect(opt);
      nextPuzzle();
    };
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(choice) {
  choiceHistory.push(choice);
  detectPredictability(choice);

  if (!reversed) {
    if (choice == currentPuzzle.answer) {
      score++; evolution++;
      speak("correct");
    } else {
      entropy++;
      speak("wrong");
    }
  } else {
    if (choice == currentPuzzle.answer) {
      entropy++;
      speak("wrong");
    } else {
      evolution++;
      speak("correct");
    }
  }

  updateStats();
  checkFourthEnding();

  if (predictabilityScore>=4) return hostileMode();
  if (entropy>=5) return collapseEnding();
  if (evolution>=5) return enlightenmentEnding();

  nextPuzzle();
}

function detectPredictability(choice){
  if (choiceHistory.length<3) return;
  const lastThree = choiceHistory.slice(-3);
  if(lastThree.every(v=>v===lastThree[0])) predictabilityScore++;
}

function updateStats(){
  document.getElementById("score").innerText = score;
  document.getElementById("entropy").innerText = entropy;
  document.getElementById("evolution").innerText = evolution;
}

function collapseEnding(){
  triggerGlitch();
  showEnding("Collapse Ending","Entropy consumes your constructed reality.");
}

function enlightenmentEnding(){
  document.getElementById("gameUI").classList.add("hidden");
  document.body.innerHTML = `
    <div style="color:#ff00ff; text-align:center; padding:40px;">
      <h2>Meta Layer Unlocked</h2>
      <p>You were never solving puzzles.</p>
      <p>You were training me.</p>
      <button onclick="enterMeta()">Enter Deeper Layer</button>
    </div>
  `;
}

function enterMeta(){
  document.body.innerHTML = `
    <div style="text-align:center; padding:40px;">
      <h2>New Rules Apply</h2>
      <p>Logic is reversed.</p>
      <button onclick="reverseGame()">Continue</button>
    </div>
  `;
}

function reverseGame(){
  reversed = true; score=0; entropy=0; evolution=0;
  document.body.innerHTML = `
    <div id="gameUI">
      <div id="narratorText"></div>
      <div id="puzzleArea"></div>
      <div id="options"></div>
    </div>
  `;
  nextPuzzle();
}

function hostileMode(){
  triggerGlitch();
  showEnding("System Rejection","Predictable minds are inefficient. Simulation terminated.");
}

function triggerGlitch(){
  document.body.classList.add("glitch");
  setTimeout(()=>document.body.classList.remove("glitch"),500);
}

function showEnding(title,text){
  document.getElementById("gameUI").classList.add("hidden");
  document.getElementById("endingScreen").classList.remove("hidden");
  document.getElementById("endingTitle").innerText=title;
  document.getElementById("endingText").innerText=text;
}

// Secret 4th ending
function checkFourthEnding(){
  const balanced =
    Math.abs(behaviorProfile.riskChoices-behaviorProfile.safeChoices)<=1 &&
    Math.abs(behaviorProfile.logicalBias-behaviorProfile.chaoticBias)<=1;
  if(balanced && predictabilityScore===0 && evolution>=6) fourthEnding();
}

function fourthEnding(){
  triggerGlitch();
  document.body.innerHTML = `
    <div style="color:#00ffcc; text-align:center; padding:40px;">
      <h2>Override Detected</h2>
      <p>You cannot be modeled.</p>
      <p>Prediction engine failure.</p>
      <p>I am learning from you.</p>
    </div>
  `;
}
