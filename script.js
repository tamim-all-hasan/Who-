function startGame(){
  document.getElementById("bootScreen").classList.add("hidden");
  document.getElementById("narratorSelect").classList.remove("hidden");
}

function selectNarrator(type){
  narratorType = type;
  document.getElementById("narratorSelect").classList.add("hidden");
  document.getElementById("gameUI").classList.remove("hidden");
  nextPuzzle();
}

function restart(){
  location.reload();
}
