// select queries
var tds = document.querySelectorAll("td");
var row_one = document.querySelectorAll(".row1 td");
var row_two = document.querySelectorAll(".row2 td");
var row_three = document.querySelectorAll(".row3 td");
var column_one = document.querySelectorAll(".column1");
var column_two = document.querySelectorAll(".column2");
var column_three = document.querySelectorAll(".column3");
var diagonal_one = document.querySelectorAll(".diagonal1");
var diagonal_two = document.querySelectorAll(".diagonal2");
var player1score = document.querySelector(".p1score");
var player2score = document.querySelector(".p2score");
var replay = document.querySelector(".replay");
var reset = document.querySelector(".reset");
var drawMatches = document.querySelector(".drawMatches");
 
function resetHelper(){
  for(i = 0 ; i < tds.length ; i++){
    tds[i].textContent = "";
    tds[i].classList.remove("win");
 
  }
  replay.style.background = "#c8d0d6";
  player1score.classList.remove("font_size");
  player2score.classList.remove("font_size");
  turn = 1;
}
 
replay.addEventListener("click", function() {
  resetHelper();
});
 
reset.addEventListener("click", function(){
  resetHelper();
  player1score.textContent = 0;
  player2score.textContent = 0;
  drawMatches.textContent = 0;
})
 
 
 
 
// text extrator for extract row , diagonal , column information .
function textExtractor(arr){
  var textContentArray = [];
  for(i=0; i< arr.length ; i++){
 
    textContentArray.push(arr[i].textContent)
  }
  return textContentArray;
}
 
 
// this function will use for winning purpose
function allSame(arr,x){
  if(arr[0] !== x ) {
    return false;
  }else{ first = arr[0]; }
  var same = true;
  for(i = 1 ; i < arr.length ; i++ ){
    if( arr[i] !== first){
      return false;
    }
  }
  return same;
}
 
function allFilled(td){
 
  var filled = true;
  for(i = 0 ; i < td.length ; i++){
      if( ( td[i].textContent !== "X" ) && ( td[i].textContent !== "O" )  ){return false;}
  }
  return filled
}
 
// check if player wins
function checkWin(element) {
  if(allSame(textExtractor(row_one),element) ){return (row_one);}
  else if(allSame(textExtractor(row_two),element)){return (row_two);}
  else if(allSame(textExtractor(row_three),element)){return (row_three);}
  else if(allSame(textExtractor(column_one),element)){return (column_one);}
  else if(allSame(textExtractor(column_two),element)){return (column_two);}
  else if(allSame(textExtractor(column_three),element)){return (column_three);}
  else if(allSame(textExtractor(diagonal_one),element)){return (diagonal_one);}
  else if(allSame(textExtractor(diagonal_two),element)){return (diagonal_two);}
  else{return false ; }
}
 
// this is to return an arry from multiple array which have excatly all same elements
function winningTheme(array){
  for(i=0;i<array.length;i++){
    array[i].classList.add("win");
 
  }
 
}
 
// main game logic using functions that we defines above
var turn = 1 ;
for(i=0 ; i < tds.length ; i++){
  tds[i].addEventListener("click", function() {
    // if player one turn , i.e, turn = 1
    if(turn === 1){
      if(!this.textContent){ // make sure that user don't overwrite previously written X or O
        this.textContent = "X";
 
          turn = 2;
        }
      winArray = checkWin("X");
      if(winArray){
        winningTheme(winArray);
        player1score.textContent = Number(player1score.textContent)+ 1;
        player1score.classList.add("font_size");
        replay.style.background = "#5a6b79";
        turn = 0;
      }
      if(allFilled(tds) && (!winArray)){
        drawMatches.textContent = Number(drawMatches.textContent)+ 1;
        replay.style.background = "#5a6b79";
 
      }
 
      // player two turns , i.e turn  = 0
    }if(turn === 2){
      if(!this.textContent){ // make sure that user don't overwrite previously written X or O
        this.textContent = "O";
        turn = 1;
      }
      winArray = checkWin("O");
      if(winArray){
        winningTheme(winArray);
        player2score.textContent = Number(player2score.textContent)+ 1;
        replay.style.background = "#5a6b79";
        player2score.classList.add("font_size");
 
        turn = 0;
      }
 
 
    }
  });
}