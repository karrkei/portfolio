//Populate cells on load
window.onload = populateCells();

//Generate random number from developer.mozilla.org
function getRandomNum(min, max){
    return Math.floor(Math.random() * (max-min) + min);
}

//Sort numbers from matcha.fyi
function sortNumbers(a, b){
    if (a>b){
        return 1;
    }
    else if (b>a){
        return -1;
    }
    else{
        return 0;
    }
}


function populateCells(){
    //Initialise array
    const nums = [-1, -1, -1, -1, -1];

    //Arrays for columns 
    const col1 = [];
    const col2 = [];
    const col3 = [];
    const col4 = [];
    const col5 = [];
    //Populate possible values
    for (var i=1; i<=15; i++){
        col1.push(i);
    }
    for (var i=16; i<=30; i++){
        col2.push(i);
    }
    for (var i=31; i<=45; i++){
        col3.push(i);
    }
    for (var i=46; i<=60; i++){
        col4.push(i);
    }
    for (var i=61; i<=75; i++){
        col5.push(i);
    }

    //Generate numbers and populate cells
    for (var col=1; col<6; col++){
        var colArr;
        if (col==1){
            colArr=col1;
        }
        if (col==2){
            colArr=col2;
        }
        if (col==3){
            colArr=col3;
        }
        if (col==4){
            colArr=col4;
        }
        if (col==5){
            colArr=col5;
        }

        //Generate values
        for (var i=0; i<nums.length; i++){
            //Generate random num
            var ind = getRandomNum(0, colArr.length);
            //Get value from array 
            var num = colArr[ind];
            //Add to nums 
            nums[i] = num;
            //Remove value from array
            colArr.splice(ind, 1);
        }
        //Sort array
        nums.sort(sortNumbers);

        //Populate cells 
        for (var row=1; row<6; row++){
            var cellId = 'r' + row + 'c' + col;
            if (cellId!='r3c3'){           
                document.getElementById(cellId).innerText = nums[row-1];
            }
        }


    }

}

function mark(cellId){
    var cell = document.getElementById(cellId);
    //Set cell colour 
    if (cell.className=='unmarked'){
        cell.className = 'marked';
    }

    else{
        cell.className = 'unmarked';
    }
}

function bingo(){
    //Count completed rows so far 
    var rowsCount = 0;
    //Highlight top row
    var bingoIndex = 0;

    //Check horizontal
    for (var row=1; row<6; row++){
        if (rowsCount>=5){
            break;
        }
        var allChecked = true;
        for(var col=1; col<6; col++){
            if (rowsCount>=5)
            break;
            var cellId = 'r' + row + 'c' + col;
            if (document.getElementById(cellId).className == 'unmarked'){
                //If cell unmarked, row incomplete
                allChecked = false;
            }
        }

        if (allChecked){
            //Increase completed rows count 
            rowsCount++;
            //Highlight top row 
            if (bingoIndex<=4){
                document.getElementById(bingoIndex).className = 'marked-th';
            }
            //Increase bingo index 
            bingoIndex++;
        }

    }

    //Check vertical
    for (var row=1; row<6; row++){
        if (rowsCount >= 5){
            break;
        }
        var allChecked = true;
        for (var col=1; col<6; col++){
            if (rowsCount >= 5){
                break;
            }
            var cellId = 'r' + col + 'c' + row;
            if (document.getElementById(cellId).className == 'unmarked'){
                //If cell unmarked, row incomplete
                allChecked = false;
            }
        }

        if (allChecked){
            //Increase completed rows count 
            rowsCount++;
            //Highlight top row 
            if (bingoIndex<=4){
                document.getElementById(bingoIndex).className = 'marked-th';
            }
            //Increase bingo index 
            bingoIndex++;
        }
    }

    //Check diagonal \ 
    var diag1AllChecked = true;
    for (var ind=1; ind<6; ind++){
        if (rowsCount >= 5){
            break;
        }

        var cellId = 'r' + ind + 'c' + ind; 
        if (document.getElementById(cellId).className == 'unmarked'){
            //If cell unmarked, row incomplete
            diag1AllChecked = false;
        }
    }
    if (diag1AllChecked){
        //Increase completed rows count 
        rowsCount++;
        //Highlight top row 
        if (bingoIndex<=4){
            document.getElementById(bingoIndex).className = 'marked-th';
        }
        //Increase bingo index 
        bingoIndex++;
    }

    //Check diagonal /
    var row=5;
    var col=1;
    var diag2AllChecked = true;
    while (row>=1 && col<=5){
        var cellId = 'r' + row + 'c' + col;  
        if (document.getElementById(cellId).className == 'unmarked'){
            //If cell unmarked, row incomplete
            diag2AllChecked = false;
        }
        row--;
        col++;
    }
    if (diag2AllChecked){
        //Increase completed rows count 
        rowsCount++;
        //Highlight top row 
        if (bingoIndex<=4){
            document.getElementById(bingoIndex).className = 'marked-th';
        }
        //Increase bingo index 
        bingoIndex++;
    }

    //If >= 5 rows, won 
    if (rowsCount>=5){
        document.getElementById('text-box').innerHTML = 'Congratulations, You\'ve Won!';
    }

    else{
        document.getElementById('text-box').innerHTML = 'Oops, False Alarm!';

    }

}

function clearAll(){
    window.confirm('Are you sure you want to clear everything?');
    if (confirm){
        //Clear top row 
        for (var row=0; row<=4; row++){
            document.getElementById(row).className = 'unmarked';
        }

        //Clear cells 
        for (var row=1; row<6; row++){
            for (var col=1; col<6; col++){
                var cellId = 'r' + row + 'c' + col;
                if (cellId!='r3c3'){
                    document.getElementById(cellId).className = 'unmarked';
                }
            }
        }
    }
}

var numsArr = [];

for (var i=1; i<=75; i++){
    numsArr.push(i);
}

var generatedNums = [];

function genNumber(){
    if (generatedNums.length <= 75){
        //Gen number
        var ind = getRandomNum(0, numsArr.length);
        //Get val from array 
        var num = numsArr[ind];
        //Add to generated num
        generatedNums.push(num);
        //Remove val from array 
        numsArr.splice(ind, 1);
        //Display num 
        document.getElementById('number').innerHTML = num;
        //Sort generated numbers array
        generatedNums.sort(sortNumbers);
        //Display generated numbers s
        document.getElementById('gen-nums').innerHTML = generatedNums;
    }

    else{
        document.getElementById('text-box').innerHTML = 'You\'ve Lost';
    }
}

function restart(){
    window.location.reload();
} 