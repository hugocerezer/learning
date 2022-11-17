function rollDice() {
    let firstFace = Math.floor(Math.random()*6) + 1;
    let secondFace = Math.floor(Math.random()*6) + 1;

    var dotsFirstFace = "";
    var dotsSecondFace = "";
    var winner = "";

    if (firstFace == 1) {
        dotsFirstFace = '<div class="dot row-2 col-2"></div>';
    } else if (firstFace == 2) {
        dotsFirstFace = '<div class="dot row-1 col-1"></div><div class="dot row-3 col-3"></div>';
    } else if (firstFace == 3) {
        dotsFirstFace = '<div class="dot row-1 col-1"></div><div class="dot row-2 col-2"></div><div class="dot row-3 col-3"></div>';
    } else if (firstFace == 4) {
        dotsFirstFace = '<div class="dot row-1 col-1"></div><div class="dot row-1 col-3"></div><div class="dot row-3 col-1"></div><div class="dot row-3 col-3"></div>';
    } else if (firstFace == 5) {
        dotsFirstFace = '<div class="dot row-1 col-1"></div><div class="dot row-1 col-3"></div><div class="dot row-2 col-2"></div><div class="dot row-3 col-1"></div><div class="dot row-3 col-3"></div>';
    } else if (firstFace == 6) {
        dotsFirstFace = '<div class="dot row-1 col-1"></div><div class="dot row-2 col-1"></div><div class="dot row-3 col-1"></div><div class="dot row-1 col-3"></div><div class="dot row-2 col-3"></div><div class="dot row-3 col-3"></div>';
    }

    if (secondFace == 1) {
        dotsSecondFace = '<div class="dot row-2 col-2"></div>';
    } else if (secondFace == 2) {
        dotsSecondFace = '<div class="dot row-1 col-1"></div><div class="dot row-3 col-3"></div>';
    } else if (secondFace == 3) {
        dotsSecondFace = '<div class="dot row-1 col-1"></div><div class="dot row-2 col-2"></div><div class="dot row-3 col-3"></div>';
    } else if (secondFace == 4) {
        dotsSecondFace = '<div class="dot row-1 col-1"></div><div class="dot row-1 col-3"></div><div class="dot row-3 col-1"></div><div class="dot row-3 col-3"></div>';
    } else if (secondFace == 5) {
        dotsSecondFace = '<div class="dot row-1 col-1"></div><div class="dot row-1 col-3"></div><div class="dot row-2 col-2"></div><div class="dot row-3 col-1"></div><div class="dot row-3 col-3"></div>';
    } else if (secondFace == 6) {
        dotsSecondFace = '<div class="dot row-1 col-1"></div><div class="dot row-2 col-1"></div><div class="dot row-3 col-1"></div><div class="dot row-1 col-3"></div><div class="dot row-2 col-3"></div><div class="dot row-3 col-3"></div>';
    }

    if (firstFace == secondFace) {
        winner = "Draw";
    }
    else if (firstFace > secondFace) {
        winner = "Player One has won!";
    }
    else {
        winner = "Player Two has won!";
    }

    document.getElementById("face1").innerHTML = dotsFirstFace;
    document.getElementById("face2").innerHTML = dotsSecondFace;
    document.getElementById("winner").innerText = winner;

}