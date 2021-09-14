var birthDate =  document.querySelector("#date-of-birth");
var checkBtn = document.querySelector(".check-btn");
var errMsg = document.querySelector(".err-msg");
var result = document.querySelector(".result");


function reversrString(str){
    return str.split("").reverse().join("");
}

console.log(reversrString("mahendra"))