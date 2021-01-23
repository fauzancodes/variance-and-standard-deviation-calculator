//for input file
$(".custom-file-input").on("change", function() {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});
  
//declaring variable
var input, extension, inputArray, 
inputX, length, sumX, meanX, inputXMinusMeanX, squareInputXMinusMeanX, sumSquareInputXMinusMeanX, 
s2, s;
  
//get the input file data
function init() {
    document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
};
  
function handleFileSelect(event) {
    const reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0]);
};
  
function handleFileLoad(event){
    console.log(event);
    input = event.target.result;
};
  
//calculating the correlation
function calculation() {
    //get the file input extension
    extension = document.getElementById("fileInput").value.split(".")[1];
    console.log(extension);

    if (extension == "dat") {
        inputing();
        console.log(inputArray);
        if (length > 1) {
            calculating();
            showResult();
        }
        else {
            warning();
        };
    }
    else {
        if (extension == "txt") {
            inputing();
            console.log(inputArray);
            if (length > 1) {
                calculating();
                showResult();
            }
            else {
                warning();
            };
        }
        else {
            warning();
        };
    };
};

//inputing
function inputing() {
    //converting input data from string to array
    inputArray = input.split("\n");

    //determining x
    inputX = [];
    for (i = 0;i < inputArray.length;i++) {
        inputX[i] = inputArray[i];
        if (inputX[i] == "-999.25") {
            inputX[i] = "0";
        }
        else {
            inputX[i] = inputX[i];
        };
    };

    //determining input data x and y length
    length = inputX.length;
};

//calculating
function calculating() {
    //calculating sum of x
    sumX = eval(inputX.join("+"));

    //calculating mean of x
    meanX = sumX / length;

    //calculating x minus mean of x
    inputXMinusMeanX = [];
    for (j = 0;j < length;j++) {
        inputXMinusMeanX[j] = inputX[j] - meanX;
    };

    //calculating square of x minus mean x
    squareInputXMinusMeanX = [];
    for (k = 0;k < length;k++) {
        squareInputXMinusMeanX[k] = Math.pow(inputXMinusMeanX[k], 2);
    };

    //calculating sum of square x minus mean x
    sumSquareInputXMinusMeanX = eval(squareInputXMinusMeanX.join("+"));

    //calculating the variance
    s2 = sumSquareInputXMinusMeanX / (length - 1);

    //calculating the standard deviation
    s = Math.sqrt(s2);
};

//warning that the data doesn't meet the requierments
function warning() {
    console.log("Your data doesn't meet requierments");
    $("#fileLabel").removeClass("border-primary");
    $("#fileLabel").addClass("border-danger");
    $("#dataReq").removeClass("text-secondary");
    $("#dataReq").addClass("text-danger font-weight-bold");
    $("#details").addClass("d-none");
    $("#result").hide();
    $("#details-show").addClass("d-none");
    $("#warning").removeClass("d-none").show();
};

//showing the data result
function showResult() {
    //showing the data result
    $("#warning").hide();
    $("#result").show();
    $("#details-show").removeClass("d-none").show();
    console.log(inputX);
    document.getElementById("inputX").innerHTML = inputX.join("<p></p>");
    console.log(length);
    document.getElementById("length").innerHTML = length;
    console.log(sumX);
    document.getElementById("sumX").innerHTML = sumX;
    console.log(meanX);
    document.getElementById("meanX").innerHTML = meanX;
    console.log(inputXMinusMeanX);
    document.getElementById("inputXMinusMeanX").innerHTML = inputXMinusMeanX.join("<p></p>");
    console.log(squareInputXMinusMeanX);
    document.getElementById("squareInputXMinusMeanX").innerHTML = squareInputXMinusMeanX.join("<p></p>");
    console.log(sumSquareInputXMinusMeanX);
    document.getElementById("sumSquareInputXMinusMeanX").innerHTML = sumSquareInputXMinusMeanX;
    console.log(s2);
    document.getElementById("s2").innerHTML = s2;
    document.getElementById("s2-big").innerHTML = s2;
    console.log(s);
    document.getElementById("s").innerHTML = s;
    document.getElementById("s-big").innerHTML = s;
    $("#fileLabel").removeClass("border-danger text-danger");
    $("#fileLabel").addClass("border-primary");
    $("#dataReq").removeClass("text-danger font-weight-bold");
    $("#dataReq").addClass("text-secondary");
};

//copy to clipboard
function copy(selector){
    var $temp = $("<div>");
    $("body").append($temp);
    $temp.attr("contenteditable", true)
         .html($(selector).html()).select()
         .on("focus", function() { document.execCommand('selectAll',false,null); })
         .focus();
    document.execCommand("copy");
    $temp.remove();
};

//details button
$("#details-show").click(function() {
    $("#result").hide();
    $("#details").removeClass("d-none").show();
    $("#details-show").hide();
});
$("#details-hide").click(function() {
    $("#details").hide();
    $("#result").show();
    $("#details-show").show();
});