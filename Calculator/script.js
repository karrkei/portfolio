//Hashmaps of number input IDs and calculator objects 
var numCalcMap = new Map();
//Current active calculator 
var currentCal;

$(document).ready(function(){
    //Get number inputs 
    var numInputElems = $('.number');
    for (var i=0; i<numInputElems.length; i++){
        //Put in map
        numCalcMap[numInputElems[i].id] = new Calculator(numInputElems[i].id);
    }

    //On focus of number fields, show calculator 
    $('.number').focus(function(){
        //Set current active calculator 
        currentCal = numCalcMap[$(this).attr('id')];
        //Set calc screen val
        if ($(this).val() == ''){
            currentCal.calcScreenVal = '0';
        }

        else{
            //If calculator not currently storing results 
            if (currentCal.getCalcSmallScreenVal() == ''){
                currentCal.setCalcScreenVal($(this).val());
                currentCal.setCalcSmallScreenVal('');
            }
        }
        currentCal.updateScreenElemVal();
        currentCal.updateSmallScreenElemVal();

        //Show calc
        $('#calculator').show();
    })


    //On click of calc buttons 
    $('.btn').click(function(){
        currentCal.clicked($(this).attr('id'));
    });

    //On key press
    $(document).keypress(function(e){
        if($('#calculator').is(':visible')){
            if(e.keyCode == '49'){
                currentCal.clicked('1');
            }

            else if(e.keyCode == '50'){
                currentCal.clicked('2');
            }

            else if(e.keyCode == '51'){
                currentCal.clicked('3');
            }

            else if(e.keyCode == '52'){
                currentCal.clicked('4');
            }
            else if(e.keyCode == '53'){
                currentCal.clicked('5');
            }

            else if(e.keyCode == '54'){
                currentCal.clicked('6');
            }

            else if(e.keyCode == '55'){
                currentCal.clicked('7');
            }

            else if(e.keyCode == '56'){
                currentCal.clicked('8');
            }

            else if(e.keyCode == '57'){
                currentCal.clicked('9');
            }

            else if(e.keyCode == '48'){
                currentCal.clicked('0');
            }

            else if(e.keyCode == '42'){
                currentCal.clicked('mult');
            }

            else if(e.keyCode == '43'){
                currentCal.clicked('plus');
            }

            else if(e.keyCode == '45'){
                currentCal.clicked('minus');
            }

            else if(e.keyCode == '46'){
                currentCal.clicked('point');
            }

            else if(e.keyCode == '47'){
                currentCal.clicked('divide');
            }

            else if(e.keyCode == '13'){
                currentCal.clicked('equals');
            }
        }
    });

});





class Calculator{
    constructor (inputID){
        this.inputID = inputID;
        this.calcScreenVal = '';
        this.calcSmallScreenVal = '';
        this.latestEqualsOp = '';
    }

    getInputID(){
        return this.inputID;
    }

    setCalcScreenVal(val){
        if (val != ''){
            //If not decimal 
            if (!String(val).includes('.')){
                var formattedVal;
                if (parseInt(val) >= -9999999999999999n && parseInt(val) <= 9999999999999999n){
                    formattedVal = parseInt(val).toLocaleString('en-US');
                }
                else{
                    formattedVal = parseInt(val).toExponential();                   
                }
            }

            //If decimal
            else{
                formattedVal = val;
            }

            this.calcScreenVal = String(formattedVal);
        }

        else{
            this.calcScreenVal = '';
        }
    }

    getCalcScreenVal(){
        return this.calcScreenVal.replaceAll(',' , '');
    }

    getCalcScreenValComma(){
        return this.calcScreenVal;
    }

    setCalcSmallScreenVal(val){
        this.calcSmallScreenVal = String(val);
    }

    getCalcSmallScreenVal(){
        return this.calcSmallScreenVal;
    }

    setLatestEqualsOp(op){
        this.latestEqualsOp = op;
    }

    getLatestEqualsOp(){
        return this.latestEqualsOp;
    }

    hideCalculator(){
        $('#calculator').hide();
    }

    updateScreenElemVal(){
        $('#calc-screen').val(this.calcScreenVal);
    }

    updateSmallScreenElemVal(){
        $('#calc-screen-s').html(this.calcSmallScreenVal);
    }

    getCurrentOp(){
        return this.getCalcSmallScreenVal()[this.getCalcSmallScreenVal().length-1];
    }

    clicked(btnID){
        var plusSign = '+';
        var minusSign = '-';
        var multSign = '*';
        var divideSign = '/';
        //Get calculator screen
        var calcScreen = $('#calc-screen');

        //If close, hide calculator 
        if (btnID=='close'){
            this.hideCalculator();
        }

        else if (btnID == 'plus' || btnID == 'minus' || btnID == 'mult' || btnID == 'divide'){
            var sign;
            if (btnID=='plus'){
                sign = plusSign;
            }

            else if (btnID=='minus'){
                sign = minusSign;
            }

            else if (btnID=='mult'){
                sign = multSign;
            }

            else if (btnID=='divide'){
                sign = divideSign;
            }

            //If not val on small screen
            if (this.getCalcSmallScreenVal() == ''){
                //Update screens 
                this.setCalcSmallScreenVal(this.getCalcScreenVal() + sign);
                this.updateSmallScreenElemVal();
                this.setCalcScreenVal('');
                this.updateScreenElemVal();
            }

            //If value exists on small screen
            else{
                //If value exists on screen
                if (this.getCalcScreenVal() != ''){
                    //If current operation is not equals 
                    if (this.getCurrentOp() != '='){
                        //Evaluate 
                        var eq = this.getCalcSmallScreenVal() + this.getCalcScreenVal();
                        var result = String(eval(eq));
                        //Update screens 
                        this.setCalcSmallScreenVal(result + sign);
                        this.updateSmallScreenElemVal();
                        this.setCalcScreenVal('');
                        this.updateScreenElemVal();

                    }

                    //If current operation is equals, append sign
                    else{
                         //Update screens 
                         this.setCalcSmallScreenVal(this.getCalcScreenVal() + sign);
                         this.updateSmallScreenElemVal();
                         this.setCalcScreenVal('');
                         this.updateScreenElemVal();
                    }
                }

                //If no value
                else{ 
                    //Update sign
                    var val = this.getCalcSmallScreenVal().substring(0, this.getCalcSmallScreenVal().length-1);
                    this.setCalcSmallScreenVal(val + sign);
                    this.updateSmallScreenElemVal();
                }
            }
        }

        //Point btn
        else if (btnID == 'point'){
            if (this.getCalcScreenVal() == ''){
                this.setCalcScreenVal('0.');
                this.updateScreenElemVal();
            }

            else {
                //If curent operation is = 
                if (this.getCurrentOp() == '='){
                    //Update screens 
                    this.setCalcSmallScreenVal('');
                    this.updateSmallScreenElemVal();
                    this.setCalcScreenVal('0.');
                    this.updateScreenElemVal();
                }

                else{
                    if (!this.getCalcScreenVal().includes('.')){
                    this.setCalcScreenVal(this.getCalcScreenValComma() + '.');
                    this.updateScreenElemVal();
                    }
                }
          }
        }

        //Plus minus btn
        else if (btnID == 'plus-minus'){
            if (this.getCalcScreenVal() != ''){
                if (this.getCalcScreenVal() != '0'){
                    if (parseFloat(this.getCalcScreenVal())>0){
                    this.setCalcScreenVal('-' + this.getCalcScreenVal());
                    this.updateScreenElemVal();
                    }

                    else{
                        this.setCalcScreenVal(Math.abs(parseFloat(this.getCalcScreenVal())));
                        this.updateScreenElemVal();
                    }
                }
                
            }
        }

        //Copy btn
        else if (btnID == 'copy'){
            //Copy to input box 
            $('#'+this.getInputID()).val(this.getCalcScreenVal());
        }

        //C btn
        else if (btnID == 'c'){
            this.setCalcSmallScreenVal('');
            this.updateSmallScreenElemVal();
            this.setCalcScreenVal('0');
            this.updateScreenElemVal();
        }

        //Backspace btn
        else if (btnID == 'backspace'){
            //Get small screen operation 
            var op = this.getCalcSmallScreenVal()[this.getCalcSmallScreenVal().length-1];

            //If operation is = 
            if (op == '='){
                //Erase small screen 
                this.setCalcSmallScreenVal('');
                this.updateSmallScreenElemVal();
            }

            
            else{
                //If negative number on screen
                if (parseFloat(this.getCalcScreenVal()) < 0){
                    //Set to 0 when last digit (-ve sign + digit)
                    if (this.getCalcScreenVal().length == 2){
                        this.setCalcScreenVal('0');
                        this.updateScreenElemVal();
                    }

                    else{
                        this.setCalcScreenVal(this.getCalcScreenVal().substring(0, this.getCalcScreenVal().length-1));
                        this.updateScreenElemVal();
                    }
                }

                //If +ve num on screen
                else{
                    //Set to 0 when last digit 
                    if (this,this.getCalcScreenVal().length==1){
                        this.setCalcScreenVal('0');
                        this.updateScreenElemVal();
                    }

                    else{
                        this.setCalcScreenVal(this.getCalcScreenVal().substring(0, this.getCalcScreenVal().length-1));
                        this.updateScreenElemVal();
                    }
                }
            }
        }

        //Equals btn
        else if (btnID == 'equals'){
            //Get operation 
            var op = this.getCalcSmallScreenVal()[this.getCalcSmallScreenVal().length-1];

            //If current op is = 
            if (op == '='){
                //Evaluate
                var eq = this.getCalcScreenVal() + this.getLatestEqualsOp();
                var result = String(eval(eq));
                //Update screens 
                this.setCalcSmallScreenVal(eq + '=');
                this.updateSmallScreenElemVal();
                this.setCalcScreenVal(result);
                this.updateScreenElemVal();
            }

            //If both screens not empty and operation is not = 
            else if (op != '=' && this.getCalcScreenVal() != '' && this.getCalcSmallScreenVal() != ''){
                //Save op 
                this.setLatestEqualsOp(op + this.getCalcScreenVal());
                //Evaluate
                var eq = this.getCalcSmallScreenVal() + this.getCalcScreenVal();
                var result = String(eval(eq));
                //Update screens 
                this.setCalcSmallScreenVal(eq + '=');
                this.updateSmallScreenElemVal();
                this.setCalcScreenVal(result);
                this.updateScreenElemVal();
            }
        }

        else {
            //If current op is not =
            if (this.getCurrentOp() != '='){
                //If current val is 0, set button value
                if (this.getCalcScreenVal() == '0'){
                    this.setCalcScreenVal(btnID);
                    this.updateScreenElemVal();
                }
                //Else, append button value 
                else {
                    //If decimal number 
                    if (this.getCalcScreenVal().includes('.')){
                        var decIndex = this.getCalcScreenVal().indexOf('.');
                        var decNum = this.getCalcScreenVal().substring(decIndex+1);

                        if (decNum.length <= 15){
                            this.setCalcScreenVal(this.getCalcScreenValComma() + btnID);
                            this.updateScreenElemVal();
                        }
                    }

                    else{
                        if (parseInt(this.getCalcScreenVal() + btnID) <= 999999999999999n){
                            this.setCalcScreenVal(this.getCalcScreenVal() + btnID);
                            this.updateScreenElemVal();
                        }
                    }
                }

            }

            //If current op is = 
            else{
                this.setCalcSmallScreenVal(btnID);
                this.updateSmallScreenElemVal();
                this.setCalcScreenVal();
                this.updateScreenElemVal();
            }
        }



    }

}