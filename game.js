module.exports={
    initGame,
    checkWinningStatus
};
// enum Status { empty, player1, player2 }
function initGame(){
    const state=createGameState();
    return state;
}

function createGameState(){
    const board=Array(6).fill(Array(7).fill(0));
    const playerState=0;
    return {board,state}
}
// function changeBoardState() {
//     if (_boardState == Status.player1) {
//       _boardState = Status.player2;
//     } else {
//       _boardState = Status.player1;
//     }
//     notifyListeners();
//   }

function checkWinningStatus(boardData) {
    // log("checkWinningStatus");
    let coinCounter = 0;
    let result = false;
    for (let i = 0; i < 6; i++) {
      if (result) {
        break;
      }
      for (let j = 0; j < 7; j++) {
        // log("$i $j");
        if (boardData[i][j].state != Status.empty) {
          // log("xxxxxxxxxxxxxxxxxxxxx");

          coinCounter++;
          if (coinCounter == 42) {
            return 2;
          }
          //check for index overflow
          if (i + 3 < 6 && j + 3 < 7) {
            //horizontal four
            if (boardData[i][j].color == boardData[i][j + 1].color &&
                boardData[i][j + 1].color == boardData[i][j + 2].color &&
                boardData[i][j + 2].color == boardData[i][j + 3].color) {
            //   log("winner");
              result = true;
              break;
            }
            //vertical four
            if (boardData[i][j].color == boardData[i + 1][j].color &&
                boardData[i + 1][j].color == boardData[i + 2][j].color &&
                boardData[i + 2][j].color == boardData[i + 3][j].color) {
            //   log("winner");
              result = true;
              break;
            }

            if (boardData[i][j].color == boardData[i + 1][j + 1].color &&
                boardData[i + 1][j + 1].color ==
                    boardData[i + 2][j + 2].color &&
                boardData[i + 2][j + 2].color ==
                    boardData[i + 3][j + 3].color) {
            //   log("winner");
              result = true;
              break;
            }
          }
          if (i + 3 <= 5 && j - 3 >= 0) {
            if (boardData[i][j].color == boardData[i + 1][j - 1].color &&
                boardData[i + 1][j - 1].color ==
                    _boardData[i + 2][j - 2].color &&
                boardData[i + 2][j - 2].color ==
                    boardData[i + 3][j - 3].color) {
            //   log("winner");
              result = true;
              break;
            }
          }
        }
      }
    }
    if (result) {
      if (boardState == Status.player1) {
        return 0;
      } else {
        return 1;
      }
    } else {
      return 3;
    }
  }