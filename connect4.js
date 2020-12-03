var board= 
[[' ',' ',' ',' ',' ',' ',' '],
[ ' ',' ',' ',' ',' ',' ',' '],
[ ' ',' ',' ',' ',' ',' ',' '],
[ ' ',' ',' ',' ',' ',' ',' '],
[ ' ',' ',' ',' ',' ',' ',' '],
[ ' ',' ',' ',' ',' ',' ',' ']];
var player= 1;
var p1Score=0;
var p2Score=0;
var gameIsOver;
var dropSound;
var cheering;
var booing;
var backgroundMusic;
createBoard();
document.addEventListener("keyup", e=>{
    backgroundMusic= new Audio("Calm.mp3");
    var press=e.key;
    if(press=='p'){
        backgroundMusic.play();
    }
});

function createBoard(){
    let display=document.createElement('div');
    display.className="display";
    for(i=1; i<43; i++){
        let div=document.createElement('div');
        div.className="empty_slot";
        div.id='slot'+i;
        console.log(div);
        display.appendChild(div);
    }
    document.body.appendChild(display);
}

document.addEventListener("keyup", e=>{
  var press=parseInt(e.key);
  if(press<=7 || press>=1)
  {
      placePiece(press-1);
  }
});

function test(){
for(i=0; i<6; i++)
{
    console.log(board[i]);
    console.log('\n');
}
console.log("Player: " + player);

}



function placePiece(col){
    if(!gameOver()){
        dropSound= new Audio("drop.mp3");
    for(i=5; i>=0; i--)
    {
        if(board[i][col] == ' ')
        {
            board[i][col]=player;
            var slots=(col+1+(i*7));
            var findSlot= 'slot' + slots.toString();
            if(player==1){
                document.getElementById(findSlot).style.backgroundColor='red';
                dropSound.play();
                player=switchPlayer(player);
            }
            else{
                document.getElementById(findSlot).style.backgroundColor='yellow';
                dropSound.play();
                player=switchPlayer(player);
            }
            break;
        }
    }
    if(gameOver()){
        player=switchPlayer(player);
        if(player==1){
            alert("Congrats Player 1 (Red Pieces) you are the Victor!");
            p1Score++;
            document.getElementById("red").innerText="Player 1: " + p1Score;
            setTimeout(()=>{reset()}, 6000);
        }
        else if(player== 2){
            alert("Congrats Player 2 (Yellow Pieces) you are the Victor!")
            p2Score++;
            document.getElementById("yellow").innerText="Player 2: " + p2Score;
            setTimeout(()=>{reset()}, 6000);
        }
    }
    console.log("Entering Full Board");
    fullBoard();
  }
}

function fullBoard(){
    booing= new Audio("Booing.mp3");
    var count=0;
    console.log("In Full Board");
    for(i=0; i<6; i++)
    {
        for(j=0; j<7; j++){
            if(board[i][j]==1 || board[i][j]==2){
            count++;
            }
        }
    }
    console.log(count);
    if(count==42){
        console.log("Full Board");
        alert("It's a tie the board will reset!");
        booing.play();
        setTimeout(()=>{reset()}, 3000);
    }
}

function switchPlayer(player){
    switch(player){
        case 1:
            document.getElementById("turn").innerText="Player 2's Turn";
            return 2;
        case 2:
            document.getElementById("turn").innerText="Player 1's Turn";
            return 1;
        default:
            console.log("Not a valid player!");
    }    
}

function gameOver(){
 cheering= new Audio("cheering.mp3");
 if(checkDiagonal() || checkVertical() || checkHorizontal()){
     gameIsOver= true;
     cheering.play();
     return gameIsOver;
   }
   return false;
 
}

function checkDiagonal(){
  for(i=0; i<3; i++){
      for(j=0; j<4; j++){
        if((board[i][j]==1 && board[i+1][j+1]==1 && board[i+2][j+2]==1 && board[i+3][j+3]== 1) || (board[i][j]==2 && board[i+1][j+1]==2 && board[i+2][j+2]==2 && board[i+3][j+3] == 2)){  
          return true;
        }
      }
  }
  for(i=0; i<3; i++){
    for(j=6; j>2; j--){
      if((board[i][j]==1 && board[i+1][j-1]==1 && board[i+2][j-2]==1 && board[i+3][j-3]==1) || (board[i][j]==2 && board[i+1][j-1]==2 && board[i+2][j-2]==2 && board[i+3][j-3]==2)){
        return true;
      }
    }
  }
}

function checkVertical(){
 for(let i=0; i<3; i++){
     for(let j=0; j<7; j++){
        if((board[i][j]==1 && board[i+1][j]==1 && board[i+2][j]==1 && board[i+3][j]==1) || (board[i][j]==2 && board[i+1][j]==2 && board[i+2][j]==2 && board[i+3][j]==2)){
          return true;
        } 
     }
 }
 return false;
}

function checkHorizontal(){
    for(i=0; i<6; i++){
        for(j=0; j<4; j++){
            if((board[i][j]==1 && board[i][j+1]==1 && board[i][j+2]==1 && board[i][j+3]==1) || (board[i][j]==2 && board[i][j+1]==2 && board[i][j+2]==2 && board[i][j+3]==2))
            {
                return true;
            }
        }
    }
    return false;
}

function reset(){
    backgroundMusic.pause();
    gameIsOver=false;
    for(i=0; i<6; i++){
        for(j=0; j<7; j++){
            if(board[i][j]==1 || board[i][j]==2)
            {
              board[i][j]=' ';
            }
        }
    }
    var slots;
    var findSlot;
    for(i=1; i<=42; i++)
    {
        slots=i;
        findSlot= 'slot' + slots.toString();
        document.getElementById(findSlot).style.backgroundColor='white';
    }
    player=1;
    document.getElementById("turn").innerText="Player 1's Turn";
}