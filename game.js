var col, curent_mark, moveCount = 0;

//Base function
function init(){
    empty1();
   
}

// function to clear the data

function empty1(){
    moveCount = 0;
    data = [];
    size = 3;
    fillData();
}


function fillData(){
    
    col = document.getElementsByTagName('td');
    var board = document.querySelector('.blocks');
     var table = '<table>';
        for (var i = 0; i < size; i++) {
            table += '<tr>';
            for (var j = 0; j < size; j++) {
                table += '<td data-row="' + i + '" data-col="' + j + '"></td>';
            }
            table += "</tr>";
        }
        board.innerHTML = table;
    
    //console.log(col.length);
    for(var i= 0; i< col.length; i++){
        col[i].addEventListener('click',mark);
    }
}


function mark(event){
    var row,column;
    var td = event.target;
    if (td.innerHTML) {
            return;
        }
    row = td.getAttribute('data-row');
    column = td.getAttribute('data-col');
    td.innerHTML = moveCount % 2 ===0 ? 'X' : 'O';
    td.classList.add(td.innerHTML);
    curent_mark = td.innerHTML;
    data[row + '' + column] = curent_mark;
   // console.log(data);
    moveCount++;
    if (checkWin(curent_mark)) {
        alert(td.innerHTML + ' has won !');
        init();
    } else if (moveCount === Math.pow(size, 2)) {
             alert("It's a draw !");
             init();
    }
}

function checkWin(sign){
var daigonal_left_to_right_count = 0,
    daigonal_right_to_left_count = 0,
    vertical_count = 0,
    horizontal_count = 0;
    // 1. Check if all the columns are filled, then alert draw
    for(var i=0; i<size; i++){
        vertical_count = 0;
        horizontal_count = 0;
        
        for( var j=0; j< size; j++){
            if(data[i + '' +j]==sign){
                horizontal_count++;
            }
            if(data[j + '' +i]== sign){
                vertical_count++;
            }
        }
        if(horizontal_count == size || vertical_count == size){
            return true;
        }
        if(data[i + '' + i]==sign){
            daigonal_left_to_right_count++;
        }
        if(data[(size - 1 -i) + ''+ i] == sign){
            daigonal_right_to_left_count++;
        }
    }
        if (daigonal_left_to_right_count == size || daigonal_right_to_left_count == size){
            return true;
        }
    return false;
}

init();