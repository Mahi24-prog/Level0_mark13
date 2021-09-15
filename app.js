var birthDate =  document.querySelector("#date-of-birth");
var checkBtn = document.querySelector(".check-btn");
var errMsg = document.querySelector(".err-msg");
var result = document.querySelector(".result");


function reversrString(str){
    return str.split("").reverse().join("");
}

function checkPlindrome(str){
    var reverseStr = reversrString(str);
    return str === reverseStr;
}

function datetoString(date){
    let day = "";
    let month = "";
    let year = "";
    if(date.day < 10 && date.day.length != 2){
        day = "0"+date.day;
    }
    else{
        day =  date.day.toString();
    }

    if(date.month < 10 && date.month.length != 2){
        month = "0"+date.month;
    }else{
        month = date.month.toString();
    }

  
    year = date.year.toString();

    return {day:day,month:month,year:year}

}

function dateAllFormat(date){
    var strDate = datetoString(date);

    var DDMMYYYY = strDate.day + strDate.month + strDate.year;
    var MMDDYYYY = strDate.month + strDate.day + strDate.year;
    var YYYYMMDD = strDate.year + strDate.month + strDate.day;
    var DDMMYY = strDate.day + strDate.month + strDate.year.slice(-2);
    var MMDDYY = strDate.month + strDate.day + strDate.year.slice(-2);
    var YYMMDD = strDate.year.slice(-2) + strDate.month + strDate.day;

    return [DDMMYYYY, MMDDYYYY, YYYYMMDD, DDMMYY, MMDDYY, YYMMDD]
}

function checkPlindromeForAllFormat(date){
    var dateFormatList = dateAllFormat(date)

    for(i of dateFormatList){
        if(checkPlindrome(i)){
            return true;
        }
    } 
    return false;
}

function checkLeapYear(year){

    parseInt(year);
    if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
        return true;
    } else {
        return false;
    }
}

function findNextPalindromeDate(date){
    let day = parseInt(date.day);
    let month = parseInt(date.month);
    let year = parseInt(date.year);
    let count = 0;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    while(1){
        day++;
        count++;
        if (checkLeapYear(year)){
            daysInMonth[1] = 29;
        }
        
        if (day > daysInMonth[month-1]){
            day = 1;
            month +=1;
        }
        if(month > 12){
            month = 1;
            year +=1;
        }
        if(checkPlindromeForAllFormat({day:day,month:month,year:year})){
            return([count, {day:day,month:month,year:year}]);    
        }
    }
    return false
}

function findPreviousPalindromeDate(date){
    let day = parseInt(date.day);
    let month = parseInt(date.month);
    let year = parseInt(date.year);
    let count = 0;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


    while(1){
        day--;
        count++;
        if (checkLeapYear(year)){
            daysInMonth[1] = 29;
        }
        
        if (day < 1){
            month -=1;
            day = daysInMonth[month-1];
        }
        if(month < 1){
            month = 12;
            day = daysInMonth[month-1];
            year -=1;
        }
        if(checkPlindromeForAllFormat({day:day,month:month,year:year})){
            return([count, {day:day,month:month,year:year}]);    
        }
       
    }
    return false
}


function clickHandler(){

    var date = {
        day : birthDate.value.slice(-2),
        month : birthDate.value.slice(5,7),
        year : birthDate.value.slice(0,4)
    }
    
    let nextDate = [];
    let prevDate = [];

    console.log(findNextPalindromeDate(date)[0]);
    console.log(findPreviousPalindromeDate(date)[0]);

    if(checkPlindromeForAllFormat(date)){
        result.innerText = "Yay! Your birthday is palindrome!";
    }else if(findNextPalindromeDate(date)[0] < findPreviousPalindromeDate(date)[0]){
        nextDate = findNextPalindromeDate(date);
        result.innerText = `The nearest palindrome date is ${nextDate[1].day}- ${nextDate[1].month}- ${nextDate[1].year}, you missed by ${nextDate[0]} days.`
    }else{
        prevDate = findPreviousPalindromeDate(date);
        result.innerText = `The nearest palindrome date is ${prevDate[1].day}- ${prevDate[1].month}- ${prevDate[1].year}, you missed by ${prevDate[0]} days.`
    }
    
}


checkBtn.addEventListener("click", clickHandler);

