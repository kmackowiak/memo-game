var numbCard = document.querySelectorAll(".card").length;


// Assigning random colors to squares
function randomValue() {
    //Array of available colors
    var randomArr = [
        "Tomato",
        "Orange",
        "DodgerBlue",
        "MediumSeaGreen",
        "SlateBlue",
        "Violet",
        "DarkOliveGreen",
        "Teal",
        "Tomato",
        "Orange",
        "DodgerBlue",
        "MediumSeaGreen",
        "SlateBlue",
        "Violet",
        "DarkOliveGreen",
        "Teal"];

    //Assigning each card a random colors from array
    for (k = 0; k < numbCard; k++) {
        var item = Math.floor((Math.random() * randomArr.length));
        document.getElementsByClassName("card")[k].style.borderColor = randomArr[item];
        //Delete used from array
        randomArr.splice(item, 1);
    }
}

//dodac zdarzenie klikniecia na body zeby startowl stoper
document.body.addEventListener("click", function(){



    var totalSeconds = 0;
    var totalMinutes = 0;
    var timer = setInterval(setTime, 1000);

    function setTime() {
        ++totalSeconds;

        if (totalSeconds == 60)
        {
            totalMinutes++;
            totalSeconds = 0;
        }

        if (points == (numbCard / 2)) {

            clearInterval(timer);

            // create box for info about game's time
            var winnerBox = document.createElement("winnerBox");
            winnerBox.style.width = "50%";
            winnerBox.style.height = "auto";
            winnerBox.style.background = "IndianRed";
            winnerBox.style.position = "absolute";
            winnerBox.style.padding = "50px;";
            winnerBox.style.border = "1px solid black"
            winnerBox.style.borderRadius = "5px";
            winnerBox.style.textAlign = "center";
            winnerBox.style.color = "HoneyDew";
            winnerBox.style.fontSize = "3rem";
            var timeInfo = "<span style='font-size: 4rem;'>WIN!</span> <br> <span style='font-size: 2rem;'>Your time:</span><br>";
            winnerBox.innerHTML = timeInfo + totalMinutes + " min " + totalSeconds + " sec";
            document.body.appendChild(winnerBox);
        }
        //info in console about during game
        console.log(totalMinutes, " ", totalSeconds);
    }
},  {once: true});



// Main loop for working game
function playGame() {

    points = 0;

    for (i = 0; i < numbCard; i++) {
        var clicked = false;
        var tempArr = [];
        var clickedArr = [];

        // Action after click in card
        document.getElementsByClassName("card")[i].addEventListener("click", function() {

            // conditional statement for get colors from two cards and push data to temporary array
            if(clicked) {
                var squareB = document.getElementById(this.id);
                var squareBBorder = document.getElementById(this.id).style.getPropertyValue("border-color");
                document.getElementById(this.id).style.backgroundColor = (squareBBorder);
                tempArr.push(squareBBorder);
                clickedArr.push(squareB.id);
                clicked = false;
            }
            else {
                var squareA = document.getElementById(this.id);
                document.getElementById(this.id).style.pointerEvents = "none";
                var squareABorder = document.getElementById(this.id).style.getPropertyValue("border-color");
                document.getElementById(this.id).style.backgroundColor = (squareABorder);
                tempArr.push(squareABorder);
                clickedArr.push(squareA.id);
                clicked = true;
            }
            console.log(tempArr);
            // conditional statement for compare two selected cards, then clear array
            if (tempArr.length == 2) {
                // if two cards are equal, add 1 point
                if (tempArr[0] == tempArr[1]) {
                    console.log("Get point!");
                    hiddenColors()
                    document.getElementById(clickedArr[0]).style.display = "none";
                    document.getElementById(clickedArr[1]).style.display = "none";
                    console.log(clickedArr);
                    clickedArr = [];
                    points++;
                    tempArr = [];
                }
                // if value of points is equal with half numbers of cards -> you win game
                else if (points == numbCard / 2) {
                    alert("Win!")
                }
                // if two cards are different, only temporary array are clear
                else {
                    console.log("Different");
                    console.log(clickedArr);
                    clickedArr = [];
                    hiddenColors()
                    tempArr = [];
                }
            }
        });
    }
}

// function for disable and hidden clicked cards
function hiddenColors(){
    setTimeout(function(){
        for (i = 0; i < numbCard; i++) {
            document.getElementsByClassName("card")[i].style.backgroundColor = "grey";
            document.getElementsByClassName("card")[i].style.pointerEvents = "auto";
        };
    }, 300);
}

randomValue();
playGame();

