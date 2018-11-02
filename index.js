
window.onload = start;

var selectedVariantsID = [];
var steps = [1, 2, 3, 4, 5, 6, 7];
var currentStep = 0;
var takeBanksMonyStep = null;
var loanValue = null;

function randGenerator() {
    var risk = parseInt(Math.random()*100,10);
    var price = parseInt(Math.random()*100,10);
    var profit = parseInt(Math.random()*100,10);
    return  risk + ':' + price + ':' + profit;
}

function start() {
    document.getElementById('var1').value = randGenerator();
    document.getElementById('var2').value = randGenerator();
    document.getElementById('var3').value = randGenerator();
    document.getElementById("oneMoreVariant").style.display = "none";
    document.getElementById("generate").style.display = "none";
}

function pick(selectedVariantName) {
   var selectedVariantValue = document.getElementById(selectedVariantName).value ;
   var selectedPrice= selectedVariantValue.split(':')[1] ;

   if (parseInt( document.getElementById('cash').value) >= parseInt(selectedPrice) ) {
       document.getElementById('cash').value = document.getElementById('cash').value - selectedPrice ;
       selectedVariantsID.push(selectedVariantName.replace('var',''));
       document.getElementById('pick' + selectedVariantName).style.display = "none";
       document.getElementById("generate").style.display = "block";
   }
   console.log(selectedPrice);

}

function genetateRick() {

    document.getElementById('rick1').value = parseInt(Math.random()*100,10);
    document.getElementById('rick2').value = parseInt(Math.random()*100,10);
    document.getElementById('rick3').value = parseInt(Math.random()*100,10);

     selectedVariantsID.forEach(function (id) {
         //
         if( parseInt(document.getElementById('var' + id).value.split(":")[0]) <= parseInt( document.getElementById('rick' + id).value  )
         ){
             document.getElementById('cash').value =      parseInt(document.getElementById('var' + id).value.split(":")[2])
                                                        + parseInt(document.getElementById('cash').value)
                                                        + parseInt(document.getElementById('var' + id).value.split(":")[1]) ;

         }
     });
}

function nextTurn() {
    if (selectedVariantsID.length === 0){
        document.getElementById('cash').value = parseInt(document.getElementById('cash').value) - 10;
    }

    start();

    document.getElementById('rick1').value = 0;
    document.getElementById('rick2').value = 0;
    document.getElementById('rick3').value = 0;
    selectedVariantsID = [];
    currentStep = currentStep +1;

    if ( currentStep === takeBanksMonyStep + 2){
        document.getElementById('cash').value = parseInt(document.getElementById('cash').value) - loanValue*1.1;
    }
    console.log(currentStep);
    document.getElementById("takeFromBank").style.display = "block";
    document.getElementById('oneMoreVariant').style.display = "none";
    document.getElementById('pickvar1').style.display = "block";
    document.getElementById('pickvar2').style.display = "block";
    document.getElementById('pickvar3').style.display = "block";
    document.getElementById('turnLine').innerText = document.getElementById('turnLine').innerText.substr(2) ;
    document.getElementById("generate").style.display = "none";

   if (   currentStep > 7
       || parseInt(document.getElementById('cash').value) < 0
      )
   {
       finish( document.getElementById('cash').value)
   }
}


function oneMore() {

    if ( parseInt(document.getElementById('cash').value) >= 30 ){
        document.getElementById('cash').value = parseInt(document.getElementById('cash').value) - 30;
        document.getElementById("oneMoreVariant").style.display = "block";
    }
}

function takeFromBank() {
    document.getElementById('cash').value = parseInt(document.getElementById('cash').value) + parseInt(document.getElementById('bank').value);
    takeBanksMonyStep = currentStep;
    loanValue = parseInt(document.getElementById('bank').value);
    console.log('takeBanksMonyStep: ' + takeBanksMonyStep);
    document.getElementById("takeFromBank").style.display = "none";
}

function finish(score) {
   alert('you score is ' + score);
   start();
}


