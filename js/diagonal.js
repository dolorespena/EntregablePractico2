var array = ["ABCD","EFGH","IJKL"];

var Ylength = array.length;
var Xlength = array[0].length;
var maxLength = Math.max(Xlength, Ylength);
var temp;
for (var k = 0; k <= 2 * (maxLength - 1); ++k) {
    temp = [];
    for (var y = Ylength - 1; y >= 0; --y) {
        var x = k - y;
        if (x >= 0 && x < Xlength) {
            temp.push(array[y][x]);
        }
    }
    if(temp.length > 0) {
        console.log(temp);
    }
}