let userInput;
let drawBoard = true;

const container = document.querySelector(".container");
const cols = document.getElementsByClassName("col");
const btnClear = document.getElementById("btnClear");
const btnChangeSize = document.getElementById("btnChangeSize");
const toggleBtn = document.getElementById("toggleBox");

let isRGBOn = toggleBtn.checked;

function start(numRowsCols=16,drawBoard){
    if(drawBoard){
        createBoard(numRowsCols);
    }
    if(!isRGBOn){
        draw();
    }
    else{
        testDrawRGB();
    }
}

function createBoard(numRowsCols=16){
    for(i=0;i<numRowsCols;i++){
        let divRow = document.createElement("div");
        divRow.classList.add("row"+i);
        for(j=0;j<numRowsCols;j++){
            let divCols = document.createElement("div");
            divCols.classList.add("col");
            divRow.appendChild(divCols);
        }
        divRow.setAttribute("class","row");
        container.appendChild(divRow);
    }
}

function draw(){
    for(i = 0; i<cols.length;i++){
        cols[i].addEventListener("mouseover", (event)=>{
            event.target.style.backgroundColor = "black";
        });
    }
}

function testDrawRGB(){
    for(i = 0; i<cols.length;i++){
        cols[i].addEventListener("mouseover", (event)=>{
            event.target.style.backgroundColor = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
        });
    }

}

function clearBoard(){
    for(i = 0; i<cols.length;i++){
        cols[i].style.backgroundColor = "#c0c0c0";
    }
}

function changeBoardSize(){
    userInput = window.prompt("Pick new board size (minimum 2 and max 100)");
    if(userInput == null) return;
    userInput = checkValidity(userInput);
    if(userInput == undefined) {
        //do nothing so the user keeps their drawing
    }
    else{
        container.innerHTML = '';
        start(userInput,true);
    }
    
}

function checkValidity(userInput){
    while(parseInt(userInput) < 2 || parseInt(userInput) > 100 || !Number.isInteger(parseInt(userInput))){
        userInput = window.prompt("NOT A VALID INPUT. (minimum 2 and max 100)");
        if(userInput == null) return;
    }
    return userInput;
}

btnClear.addEventListener("click", clearBoard)
btnChangeSize.addEventListener("click",changeBoardSize)

btnClear.addEventListener("mouseover",(event)=>{
    event.target.style.border = "5px solid #F8AB33";
    event.target.style.borderRadius = "100px";

    btnClear.addEventListener("mouseout",(event)=>{
        event.target.style.border = "";
        event.target.style.borderRadius = "";
    })
})
btnChangeSize.addEventListener("mouseover",(event)=>{
    event.target.style.border = "5px solid #F8AB33";
    event.target.style.borderRadius = "100px";

    btnChangeSize.addEventListener("mouseout",(event)=>{
        event.target.style.border = "";
        event.target.style.borderRadius = "";
    })
})

toggleBtn.addEventListener("change", ()=>{
    isRGBOn = !isRGBOn;
    start(false);
});


start(16,true);