var moment = require('moment');
moment().format();
var readline = require('readline');
var promts = readline.createInterface(process.stdin, process.stdout);


promts.question("Please enter the occurrence (Default = 10) ", function(answeroccurrence){
    var occurrence = answeroccurrence;
    
    promts.question("Please enter the every value 1 or 2  ", function(answerevery){
        var every = answerevery;
    
        promts.question("Please enter the starting date  ", function(answerstartingdate){
            var starting_date = answerstartingdate;

            promts.question("Please enter the index  ", function(answerindex){
                var index = answerindex;
            
                promts.question("Please Select the day of a week 1=Mo 2=Tu 3=We 4=Th 5=Fr 6=Sa 7=Su  ", function(answerday){
                    var day_of_week = answerday;
                    console.log(returnDates(occurrence,every,starting_date,index,day_of_week));
                });
            });
        })
    });
});

function returnDates(occurrence,every,starting_date,index,day_of_week)
{
    occurrence = parseInt(occurrence);
    every = parseInt(every);
    index = parseInt(index);
    day_of_week = parseInt(day_of_week);
    
    var result = [];
    var d = new Date(starting_date);
   
    for(i=0;i<occurrence;i++)
    {
        var localIndex = index;
        // Start of the month of the given startDate
        var myMonth = moment(starting_date, 'YYYY-MM-DD').startOf('month');
        // dayOfWeek of the first week of the month
        var firstDayOfWeek = myMonth.clone().weekday(day_of_week);
        // Check if first firstDayOfWeek is in the given month
        if( firstDayOfWeek.month() != myMonth.month() ){
            localIndex++;
        }

        var date = firstDayOfWeek.clone().add(localIndex-1, 'weeks');
        result.push(date);
       
        starting_date = date.clone().month(date.month()+every).format('YYYY-MM-DD');
    }
    return result;
}
