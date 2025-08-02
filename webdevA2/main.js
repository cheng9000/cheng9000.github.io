//target all elements to save to constants
const topic1btn=document.querySelector("#topic1btn");
const topic2btn=document.querySelector("#topic2btn");
const topic3btn=document.querySelector("#topic3btn");

var alltopics=document.querySelectorAll(".topic");

const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");
const page4btn=document.querySelector("#page4btn");
const page5btn=document.querySelector("#page5btn");
const page6btn=document.querySelector("#page6btn");

const playbtn=document.querySelector("#demoStart");
const submitbtn=document.getElementById("chessQuiz");

const prevbtn=document.getElementById("prevbtn");
const nextbtn=document.getElementById("nextbtn");

var allpages=document.querySelectorAll(".page");

const menuItemsList=document.querySelector("ul");
const hamBtn=document.querySelector("#hamIcon");
hamBtn.addEventListener("click",toggleMenus);
window.addEventListener("scroll", scrollDetection);
playbtn.addEventListener("click", demoAnim);
submitbtn.addEventListener("submit", evaluateQuiz);

prevbtn.addEventListener("click", previous);
nextbtn.addEventListener("click", next);

//select all subtopic pages
function hideall_topic(){ //function to hide all pages
    for(let topic of alltopics){ //go through all subtopic pages
        topic.style.display="none"; //hide it
    }
}
function show_topic(topicNo){ //function to show selected topic no
    hideall_topic();
    //select the topic based on the parameter passed in
    let topic = document.querySelector("#topic"+topicNo);
    topic.style.display="block"; //show the topic
    AsideContent(topicNo);
}
function AsideContent(topicNo){
    if(topicNo === 1){
        document.getElementById("Aside").innerHTML = 
            '<ul class="asideList">' +
            '   <li><a href="#top" class="asideButton">Back to Top</a></li>' +
            '   <li><a href="#topicContainer" class="asideButton">Go to Topic</a></li>' +
            '   <li><a href="#timeline" class="asideButton">Go to Timeline</a></li>' +
            '   <li><a href="#puzzle" class="asideButton">Go to Puzzle(demo)</a></li>' +
            '</ul>';
    }
    if(topicNo === 2){
        document.getElementById("Aside").innerHTML = 
            '<ul class="asideList">' +
            '   <li><a href="#top" class="asideButton">Back to Top</a></li>' +
            '   <li><a href="#topicContainer" class="asideButton">Go to Topic</a></li>' +
            '   <li><a href="#chessQuiz" class="asideButton">Go to Quiz</a></li>' +
            '</ul>';
    }
    if(topicNo === 3){
        document.getElementById("Aside").innerHTML = 
            '<ul class="asideList">' +
            '   <li><a href="#top" class="asideButton">Back to Top</a></li>' +
            '   <li><a href="#topicContainer" class="asideButton">Go to Topic</a></li>' +
            '   <li><a href="#MM_title" class="asideButton">Go to Minigame</a></li>' +
            '</ul>';
    }    
}
function hideall(){ 
    for(let onepage of allpages){ 
        onepage.classList.remove("show");
    }
}
function show(pgno){ 
    hideall();
    let onepage = document.querySelector("#page"+pgno);
    onepage.classList.add("show");
}

topic1btn.addEventListener("click", function () {show_topic(1);});
topic2btn.addEventListener("click", function () {show_topic(2);});
topic3btn.addEventListener("click", function () {show_topic(3);});

page1btn.addEventListener("click", function () {show(1);});
page2btn.addEventListener("click", function () {show(2);});
page3btn.addEventListener("click", function () {show(3);});
page4btn.addEventListener("click", function () {show(4);});
page5btn.addEventListener("click", function () {show(5);});
page6btn.addEventListener("click", function () {show(6);});

hideall_topic();
show_topic(1);

hideall();
show(1);

// makes the first profile in sub topic: famous players visible on page startup
document.querySelector("#player1").classList.add("visible");

function toggleMenus(){
    menuItemsList.classList.toggle("menuShow");
    if(menuItemsList.classList.contains("menuShow")){
        hamBtn.innerHTML="Close Menu";
    }
    else{
        hamBtn.innerHTML="Open Menu";
    }
}
function scrollDetection(){
    const cards = document.querySelectorAll('.card');
    const triggerPoint = window.innerHeight * 0.5;

    for(let card of cards){
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < triggerPoint) {
            card.classList.add('visible');
        }
        if (cardTop > triggerPoint) {
            card.classList.remove('visible');
        }
    }
}
function demoAnim(){
    const black_king = document.getElementById("black_king");
    const white_pawn = document.getElementById("white_pawn");
    const white_queen = document.getElementById("white_queen");
    const white_knight = document.getElementById("white_knight");

    // position values for white queen
    let topPos = parseInt(window.getComputedStyle(white_queen).top);
    let leftPos = parseInt(window.getComputedStyle(white_queen).left);
    let targetTop = 185;

    // position values for black king
    let topPos_K = parseInt(window.getComputedStyle(black_king).top);
    let leftPos_K = parseInt(window.getComputedStyle(black_king).left);

    // position values for white pawn
    let topPos_P = parseInt(window.getComputedStyle(white_pawn).top);
    let leftPos_P = parseInt(window.getComputedStyle(white_pawn).left);

    const step = -1;
    const interval = 5;

    const move1 = setInterval(queenAnim, interval);
    function queenAnim(){
        console.log("Top:", topPos);
        if (topPos <= targetTop) {
            clearInterval(move1);
            move2 = setInterval(kingAnim, interval);
        } else {
            topPos += step;
            leftPos += step;
            white_queen.style.top = topPos + "px";
            white_queen.style.left = leftPos + "px";
        }
    }

    let move2;

    function kingAnim(){
        console.log("Top:", topPos_K);
        targetTop = 50;
        if (topPos_K >= targetTop) {
            white_knight.classList.add('hidden');
            clearInterval(move2);
            move3 = setInterval(pawnAnim, interval);
        } else {
            topPos_K += -step;
            leftPos_K += step;
            black_king.style.top = topPos_K + "px";
            black_king.style.left = leftPos_K + "px";
        }
    }

    let move3;

    function pawnAnim(){
        console.log("Top:", topPos_P);
        targetTop = 5;
        if (topPos_P <= targetTop) {
            white_knight.style.top = white_pawn.style.top;
            white_knight.style.left = leftPos_P + "px";
            white_knight.classList.remove('hidden');
            white_pawn.classList.add('hidden');
            clearInterval(move3);
        } else {
            topPos_P += step;
            white_pawn.style.top = topPos_P + "px";
        }
    }
}
function evaluateQuiz(e){
    e.preventDefault();
    const correctAnswers = {
        q1: "c", // Chaturaṅga
        q2: "b", // Four Divisions
        q3: "c", // Bishop
        q4: "d", // Shāh! Māt!
        q5: "d"  // Evolved into regional versions
    };
    let score = 0;
    for (let q in correctAnswers) {
        const selected = document.querySelector("input[name="+q+"]:checked");
        if (selected && selected.value === correctAnswers[q]) {
        score++;
        }
    }
    const result = document.getElementById("quizResult");
    result.textContent = "You scored " + score + " out of 5.";
}

let profileNum = 1;
function previous(){
    if(profileNum - 1 >= 1){
        console.log("prev");
        profileNum -= 1;
        let activeprofile = document.querySelector("#player"+(profileNum + 1));
        let newprofile = document.querySelector("#player"+(profileNum));

        activeprofile.classList.add("animate");
        newprofile.classList.add("visible");
        setTimeout(function(){
            activeprofile.classList.remove("visible");
            activeprofile.classList.remove("animate");
        },500);
    }
}
function next(){
    if(profileNum + 1 <= 3){
        console.log("next");
        profileNum += 1;
        let activeprofile = document.querySelector("#player"+(profileNum - 1));
        let newprofile = document.querySelector("#player"+(profileNum));

        activeprofile.classList.add("animate");
        newprofile.classList.add("visible");
        setTimeout(function(){
            activeprofile.classList.remove("visible");
            activeprofile.classList.remove("animate");
        },500);
    }
}

// Memory Match minigame
const cards = ["1","2","3","4","5","1","2","3","4","5"];

// randomize card order for game
cards.sort(function(){
        return 0.5 - Math.random();
});
const board = document.getElementById("gameBoard");
let firstCard = null;
let lockBoard = false;

for(let id of cards){
    const card = document.createElement("div");
    card.classList.add("minigame_card");
    card.classList.add("type"+id);
    card.classList.add("closed");

    card.addEventListener("click", function (){
        if (lockBoard || !card.classList.contains("closed")) return;
        card.classList.remove("closed");

        if (!firstCard) {
        firstCard = card;
        } 
        else {
            // get the card type
            const firstType = getType(firstCard);
            const secondType = getType(card);
            if (firstType === secondType) {
                // Match found
                firstCard = null;
        } 
        else {
            // Not a match
            lockBoard = true;
            setTimeout(function() {
                card.classList.add("closed");
                firstCard.classList.add("closed");
                firstCard = null;
                lockBoard = false;
            }, 1000);
        }
        }
    });
    board.appendChild(card);
}
function getType(element) {
    var classes = element.classList;
    for (var i = 0; i < classes.length; i++) {
        if (classes[i].indexOf("type") === 0) {
            return classes[i];
        }
    }
    return null;
}