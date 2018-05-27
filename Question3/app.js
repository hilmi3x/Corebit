var readline = require('readline');
var promts = readline.createInterface(process.stdin, process.stdout);


function LCS(firstelement, secondelement) {
    var resultarray = [];
    for (var i=0; i<=firstelement.length; i++) {
        resultarray.push([]);
        for (var j=0; j<=secondelement.length; j++) {
            var current = 0;
            if (i==0 || j==0) {
                current = 0;
            } else if (firstelement.charAt(i-1) == secondelement.charAt(j-1)) {
                current = resultarray[i-1][j-1] + 1;
            } else {
                current = Math.max(resultarray[i][j-1], resultarray[i-1][j]);
            }
            resultarray[i].push(current);
        }
    }

    var i = firstelement.length;
    var j = secondelement.length;

    var resultelement = '';
    while (resultarray[i][j] > 0) {
        if(firstelement.charAt(i-1) == secondelement.charAt(j-1) && (resultarray[i-1][j-1] +1 == resultarray[i][j])) {
            resultelement = firstelement.charAt(i-1) + resultelement;
            i = i-1;
            j = j-1;
        } else if (resultarray[i-1][j] > resultarray[i][j-1])
            i = i-1;
        else
            j = j-1;
    }
    return resultelement;
}


promts.question("Please Enter the first Sequence 'CASE SENSITIVE!!!' ", function(answerfirst){
    var firstinput = answerfirst;

    promts.question("Please Enter the second Sequence  'CASE SENSITIVE!!!' ", function(answersecond){
    var secondinput = answersecond;   
    var resultArray = LCS(firstinput,secondinput); 
    console.log('LCS for input \" %s \" and \" %s \" is \" %s \" of length \" %d \" ',firstinput,secondinput,resultArray,resultArray.length);
    process.exit();
    });
});
