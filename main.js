var prompt = require('prompt-sync')();

var ages=[16,32,33,48]
var result=ages.filter(checkage)

function checkage(age)
{
    return age>=18
}

console.log(result)

var a=prompt("enter age")
console.log("your age is",a)