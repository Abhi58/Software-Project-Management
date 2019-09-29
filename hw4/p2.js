function myNumber(s){
var arr= ['0','1','2','3','4','5','6','7','8','9','.']

var sum=0;
var flag=false;
var nan=false;
var decimal=0;

for(var i=0;i<s.length;i++){
    if(arr.indexOf(s.charAt(i)) === -1){
        nan=true;
        break;
    }
    else{
        if(s.charAt(i) === '.'){
            flag = true;
            decimal=0;
        }

        if(i===0 && s.charAt(i)!== '.'){
            sum= arr.indexOf(s.charAt(i));
        }else{
            if(s.charAt(i)==='.'){

            }else{
                sum *= 10;
                sum += arr.indexOf(s.charAt(i));
            }
        }
    }
    if(flag){
        decimal++;
    }
}

for(var j=0;j<decimal-1;j++){
    sum = sum/10;
}

if(nan){
    console.log("NaN");
}
else{
    console.log(sum);
}
}

myNumber('123.456');
myNumber('1234567890');
myNumber('1');
myNumber('abc');
myNumber('.12345');
myNumber('12345.');

