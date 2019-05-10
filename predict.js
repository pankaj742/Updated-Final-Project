
 $(document).ready()
{
  $('.progress-bar').hide();
  $("#selected-image").attr("src",sessionStorage.getItem("url"));

}
var data={};
data["array"]=new Array();

$("#image-selector").change(function(){
    let reader = new FileReader();

    reader.onload = function(){
        let dataURL = reader.result;
        $("#selected-image").attr("src",dataURL);
        $("#prediction-list").empty();
    }
    let file = $("#image-selector").prop('files')[0];
    reader.readAsDataURL(file);
});

//model selector 
$("#model-selector").change(function(){
    loadModel($("#model-selector").val());
    $('.progress-bar').show();
})
let prob=0;
let clas="";


//shoes

let clas1="";
let prob1=0;

// jeans


let prob2=0;
let clas2="";

let prob3=0;
let clas3="";

let prob4=0;
let clas4="";

let prob5=0;
let clas5="";

let prob6=0;
let clas6="";


//shirt

let prob7=0;
let clas7="";

let prob8=0;
let clas8="";

let prob9=0;
let clas9="";

let prob10=0;
let clas10="";

let prob11=0;
let clas11="";




//shoes


let prob12=0;
let clas12="";

let prob13=0;
let clas13="";

let prob14=0;
let clas14="";

let prob15=0;
let clas15="";

let prob16=0;
let clas16="";

let prob17=0;
let clas17="";

let prob18=0;
let clas18="";

let prob19=0;
let clas19="";

let prob20=0;
let clas20="";

let prob21=0;
let clas21="";


//tshirt
let prob22=0;
let clas22="";

let prob23=0;
let clas23="";

let prob24=0;
let clas24="";

let prob25=0;
let clas25="";

let prob26=0;
let clas26="";









let model;
async function loadModel(name){
    model=await tf.loadModel(`http://localhost:8081/${name}/model.json`);
    $('.progress-bar').hide();
}

//predicting results

$("#predict-button").click(async function(){
   
    let image= $('#selected-image').get(0);
    


   
    let tensor = preprocessImage(image,"HKMODEL");
    let prediction = await model.predict(tensor).data();
    const prediction1 = await model.predict(tensor).dataSync()[0];
    const prediction2 = await model.predict(tensor).dataSync()[1];
    const prediction3 = await model.predict(tensor).dataSync()[2];
    const prediction4 = await model.predict(tensor).dataSync()[3];
   

     document.getElementById('hkresult1').value =prediction1;
    document.getElementById('hkresult2').value =prediction2;
    document.getElementById('hkresult3').value =prediction3;
    document.getElementById('hkresult4').value =prediction4;  
    
    
    let top5=Array.from(prediction)
                .map(function(p,i){
    return {
        probability: p,
        className: TYPE[i]
    };
    }).sort(function(a,b){
        return b.probability-a.probability;
    }).slice(0,5);

$("#prediction-list").empty();
top5.forEach(function(p){
   
            
    if(prob<p.probability)
    {

        prob=p.probability;
        clas=p.className;
    }
    $("#prediction-list").append(`<li>${p.className}:${p.probability.toFixed(5)}</li>`);
    data["category"]=clas;
   

 
});
data["category"]=clas;
data["array"].push("category");

//document.getElementById('result').innerHTML=prob;
//document.getElementById('class').innerHTML=clas;


//loading model for jeans category


if(clas=="Jeans")
{
   model1=await tf.loadModel(`http://localhost:8081/jeans/fit/model.json`);
   model2=await tf.loadModel(`http://localhost:8081/jeans/distress/model.json`);
   model3=await tf.loadModel(`http://localhost:8081/jeans/fade/model.json`);
   model4=await tf.loadModel(`http://localhost:8081/jeans/rise/model.json`);
   model5=await tf.loadModel(`http://localhost:8081/jeans/theme/model.json`);
  


    let image= $('#selected-image').get(0);
    let tensor1 = preprocessImage(image,"fit");
    let prediction1 = await model1.predict(tensor1).data();

    const predict1 = await model1.predict(tensor1).dataSync()[0];
    const predict2 = await model1.predict(tensor1).dataSync()[1];
    const predict3 = await model1.predict(tensor1).dataSync()[2];
    const predict4 = await model1.predict(tensor1).dataSync()[3];
    const predict5 = await model1.predict(tensor1).dataSync()[4];

    document.getElementById('hkresult5').value =predict1;
    document.getElementById('hkresult6').value=predict2;
    document.getElementById('hkresult7').value =predict3;
    document.getElementById('hkresult8').value =predict4;
    document.getElementById('hkresult9').value =predict5;
 
  





   let tensor2 = preprocessImage(image,"distress");
   let prediction2 = await model2.predict(tensor2).data();

   const predict6 = await model2.predict(tensor2).dataSync()[0];
    const predict7 = await model2.predict(tensor2).dataSync()[1];
    const predict8 = await model2.predict(tensor2).dataSync()[2];
    const predict9 = await model2.predict(tensor2).dataSync()[3];
    const predict10 = await model2.predict(tensor2).dataSync()[4];
    
    document.getElementById('hkresult10').value =predict6;
    document.getElementById('hkresult11').value =predict7;
    document.getElementById('hkresult12').value =predict8;
    document.getElementById('hkresult13').value =predict9;
    document.getElementById('hkresult14').value =predict10;



   let tensor3 = preprocessImage(image,"fade");
   let prediction3 = await model3.predict(tensor3).data();

   const predict11 = await model3.predict(tensor3).dataSync()[0];
   const predict12 = await model3.predict(tensor3).dataSync()[1];
   const predict13 = await model3.predict(tensor3).dataSync()[2];

   document.getElementById('hkresult15').value =predict11;
   document.getElementById('hkresult16').value =predict12;
   document.getElementById('hkresult17').value =predict13;






   let tensor4 = preprocessImage(image,"rise");
   let prediction4 = await model4.predict(tensor4).data();

   const predict16 = await model4.predict(tensor4).dataSync()[0];
   const predict17 = await model4.predict(tensor4).dataSync()[1];
   const predict18 = await model4.predict(tensor4).dataSync()[2];

   document.getElementById('hkresult20').value =predict16;
   document.getElementById('hkresult21').value =predict17;
   document.getElementById('hkresult22').value =predict18;



   let tensor5 = preprocessImage(image,"theme");
   let prediction5 = await model5.predict(tensor5).data();

   const predict21 = await model5.predict(tensor4).dataSync()[0];
   const predict22 = await model5.predict(tensor4).dataSync()[1];
   const predict23 = await model5.predict(tensor4).dataSync()[2];
   const predict24 = await model5.predict(tensor4).dataSync()[3];
   const predict25 = await model5.predict(tensor4).dataSync()[4];
   
   document.getElementById('hkresult25').value =predict21;
   document.getElementById('hkresult26').value =predict22;
   document.getElementById('hkresult27').value =predict23;
   document.getElementById('hkresult28').value =predict24;
   document.getElementById('hkresult29').value =predict25;


  
  
   
 
   


 let top5=Array.from(prediction1)
   .map(function(p,i){
return {
probability: p,
className: FIT[i]
};
}).sort(function(a,b){
return b.probability-a.probability;
}).slice(0,5);
$("#result1").empty();
top5.forEach(function(p){
    if(prob2<p.probability)
    {

        prob2=p.probability;
        clas2=p.className;
    }
  
    $("#result1").append(`<li>${p.className}:${p.probability.toFixed(5)}</li>`);

 
});
data["fit"]=clas2;
data["array"].push("fit");

   


 top5=Array.from(prediction2)
.map(function(p,i){
return {
probability: p,
className: DISTRESS[i]
};
}).sort(function(a,b){
return b.probability-a.probability;
}).slice(0,5);
$("#result2").empty();
top5.forEach(function(p){
    if(prob3<p.probability)
    {

        prob3=p.probability;
        clas3=p.className;
    }
 
 $("#result2").append(`<li>${p.className}:${p.probability.toFixed(5)}</li>`);


});
data["distress"]=clas3;
data["array"].push("distress");


top5=Array.from(prediction3)
.map(function(p,i){
return {
probability: p,
className: FADE[i]
};
}).sort(function(a,b){
return b.probability-a.probability;
}).slice(0,5);
$("#result3").empty();
top5.forEach(function(p){
    if(prob4<p.probability)
    {

        prob4=p.probability;
        clas4=p.className;
    }
 
 $("#result3").append(`<li>${p.className}:${p.probability.toFixed(5)}</li>`);


});
data["fade"]=clas4;
data["array"].push("fade");


 top5=Array.from(prediction4)
.map(function(p,i){
return {
probability: p,
className: RISE[i]
};
}).sort(function(a,b){
return b.probability-a.probability;
}).slice(0,5);
$("#result4").empty();
top5.forEach(function(p){
    if(prob5<p.probability)
    {

        prob5=p.probability;
        clas5=p.className;
    }
 
 $("#result4").append(`<li>${p.className}:${p.probability.toFixed(5)}</li>`);


});
data["rise"]=clas5;
data["array"].push("rise");


 top5=Array.from(prediction5)
.map(function(p,i){
return {
probability: p,
className: THEME[i]
};
}).sort(function(a,b){
return b.probability-a.probability;
}).slice(0,5);
$("#result5").empty();
top5.forEach(function(p){
 if(prob6<p.probability)
 {
     prob6=p.probability;
     clas6=p.className;
 }
 $("#result5").append(`<li>${p.className}:${p.probability.toFixed(5)}</li>`);


});

   
data["theme"]=clas6;
data["array"].push("theme");
   
}




// loading model for shirt category

 if(clas=="Shirt")
{
   model1=await tf.loadModel(`http://localhost:8081/shirt/fabric/model.json`);
   model2=await tf.loadModel(`http://localhost:8081/shirt/fit/model.json`);
   model3=await tf.loadModel(`http://localhost:8081/shirt/occasion/model.json`);
   model4=await tf.loadModel(`http://localhost:8081/shirt/pattern/model.json`);
   model5=await tf.loadModel(`http://localhost:8081/shirt/sleeves/model.json`);
  


   let image= $('#selected-image').get(0);
   let tensor1 = preprocessImage(image,"fabric");
   let tensor2 = preprocessImage(image,"fit");
   let tensor3 = preprocessImage(image,"occasion");
   let tensor4 = preprocessImage(image,"pattern");
   let tensor5 = preprocessImage(image,"sleeves");
   let prediction1 = await model1.predict(tensor1).data();
   let prediction2 = await model2.predict(tensor2).data();
   let prediction3 = await model3.predict(tensor3).data();
   let prediction4 = await model4.predict(tensor4).data();
   let prediction5 = await model5.predict(tensor5).data();
   


 let top5=Array.from(prediction1)
   .map(function(p,i){
return {
probability: p,
className: FABRIC[i]
};
}).sort(function(a,b){
return b.probability-a.probability;
}).slice(0,5);
$("#result1").empty();
top5.forEach(function(p){
    if(prob7<p.probability)
    {

        prob7=p.probability;
        clas7=p.className;
    }
  
    $("#result1").append(`<li>${p.className}:${p.probability.toFixed(5)}</li>`);

 
});
data[" shirt fabric"]=clas7;
data["array"].push("shirt fabric");   


 top5=Array.from(prediction2)
.map(function(p,i){
return {
probability: p,
className: SFIT[i]
};
}).sort(function(a,b){
return b.probability-a.probability;
}).slice(0,5);
$("#result2").empty();
top5.forEach(function(p){
    if(prob8<p.probability)
    {

        prob8=p.probability;
        clas8=p.className;
    }
 
 $("#result2").append(`<li>${p.className}:${p.probability.toFixed(5)}</li>`);


});
data["shirt fit"]=clas8;
data["array"].push("shirt fit");


top5=Array.from(prediction3)
.map(function(p,i){
return {
probability: p,
className: OCCASION[i]
};
}).sort(function(a,b){
return b.probability-a.probability;
}).slice(0,5);
$("#result3").empty();
top5.forEach(function(p){
    if(prob9<p.probability)
    {

        prob9=p.probability;
        clas9=p.className;
    }
 
 $("#result3").append(`<li>${p.className}:${p.probability.toFixed(5)}</li>`);


});
data["occasion"]=clas9;
data["array"].push("occasion");


 top5=Array.from(prediction4)
.map(function(p,i){
return {
probability: p,
className: PATTERN[i]
};
}).sort(function(a,b){
return b.probability-a.probability;
}).slice(0,5);
$("#result4").empty();
top5.forEach(function(p){
    if(prob10<p.probability)
    {

        prob10=p.probability;
        clas10=p.className;
    }
 $("#result4").append(`<li>${p.className}:${p.probability.toFixed(5)}</li>`);


});
data["pattern"]=clas10;
data["array"].push("pattern");


 top5=Array.from(prediction5)
.map(function(p,i){
return {
probability: p,
className: SLEEVES[i]
};
}).sort(function(a,b){
return b.probability-a.probability;
}).slice(0,5);
$("#result5").empty();
top5.forEach(function(p){
 if(prob11<p.probability)
 {
     prob11=p.probability;
     clas11=p.className;
 }
 $("#result5").append(`<li>${p.className}:${p.probability.toFixed(5)}</li>`);


});
data["sleeves"]=clas11;
data["array"].push("sleeves");


   
}



// loading model for shoes category




else if(clas=="Shoes")
{
 model1=await tf.loadModel(`http://localhost:8081/shoes/type/model.json`); 
  


   let image= $('#selected-image').get(0);
    let tensor1 = preprocessImage(image,"type"); 

   let prediction1 = await model1.predict(tensor1).data(); 
   
   





 top5=Array.from(prediction1)
.map(function(p,i){
return {
probability: p,
className: STYPE[i]
};
}).sort(function(a,b){
return b.probability-a.probability;
}).slice(0,5);
$("#result1").empty();
top5.forEach(function(p){
 if(prob12<p.probability)
 {
     prob12=p.probability;
     clas12=p.className;
 }

 $("#result1").append(`<li>${p.className}:${p.probability.toFixed(5)}</li>`);


});
data["shoes type"]=clas12;
data["array"].push("shoes type");


if(clas1=="SportsShoes")
{


    model1=await tf.loadModel(`http://localhost:8081/shoes/sports/type/model.json`); 
    model2=await tf.loadModel(`http://localhost:8081/shoes/sports/brand/model.json`); 


    let image= $('#selected-image').get(0);


     let tensor1 = preprocessImage(image,"type"); 
     let tensor2 = preprocessImage(image,"brand"); 
 
    let prediction1 = await model1.predict(tensor1).data(); 
    let prediction2 = await model2.predict(tensor2).data(); 


    top5=Array.from(prediction1)
    .map(function(p,i){
    return {
    probability: p,
    className: SPORT[i]
    };
    }).sort(function(a,b){
    return b.probability-a.probability;
    }).slice(0,5);
    $("#result2").empty();
    top5.forEach(function(p){
        if(prob13<p.probability)
        {
    
            prob13=p.probability;
            clas13=p.className;
        }
    
    
     $("#result2").append(`<li>${p.className}:${p.probability.toFixed(5)}</li>`);
    
    
    });
    data["sport type"]=clas13;
    data["array"].push("sport type");

    top5=Array.from(prediction2)
    .map(function(p,i){
    return {
    probability: p,
    className: SABRAND[i]
    };
    }).sort(function(a,b){
    return b.probability-a.probability;
    }).slice(0,5);
    $("#result3").empty();
    top5.forEach(function(p){
        if(prob14<p.probability)
        {
    
            prob14=p.probability;
            clas14=p.className;
        }
    
    
     $("#result3").append(`<li>${p.className}:${p.probability.toFixed(5)}</li>`);
    
    
    });
    data["sport brand"]=clas14;
    data["array"].push("sport brand");

    









}

if(clas1=="CasualShoes")
{
    model1=await tf.loadModel(`http://localhost:8081/shoes/casual/model.json`); 
  


    let image= $('#selected-image').get(0);


     let tensor1 = preprocessImage(image,"casual"); 
     
 
    let prediction1 = await model1.predict(tensor1).data(); 
   


    top5=Array.from(prediction1)
    .map(function(p,i){
    return {
    probability: p,
    className: CASUALS[i]
    };
    }).sort(function(a,b){
    return b.probability-a.probability;
    }).slice(0,5);
    $("#result2").empty();
    top5.forEach(function(p){
        if(prob15<p.probability)
        {
    
            prob15=p.probability;
            clas15=p.className;
        }
    
    
     $("#result2").append(`<li>${p.className}:${p.probability.toFixed(5)}</li>`);
    
    
    });
    data["casual type"]=clas15;
    data["array"].push("casual type");



}
if(clas1=="Sandals")
{
    model1=await tf.loadModel(`http://localhost:8081/shoes/sandals/type/model.json`); 
    model2=await tf.loadModel(`http://localhost:8081/shoes/sandals/brand/model.json`); 


    let image= $('#selected-image').get(0);


     let tensor1 = preprocessImage(image,"type"); 
     let tensor2 = preprocessImage(image,"brand"); 
 
    let prediction1 = await model1.predict(tensor1).data(); 
    let prediction2 = await model2.predict(tensor2).data(); 


    top5=Array.from(prediction1)
    .map(function(p,i){
    return {
    probability: p,
    className: SANDALS[i]
    };
    }).sort(function(a,b){
    return b.probability-a.probability;
    }).slice(0,5);
    $("#result2").empty();
    top5.forEach(function(p){
        if(prob16<p.probability)
        {
    
            prob16=p.probability;
            clas16=p.className;
        }
    
    
     $("#result2").append(`<li>${p.className}:${p.probability.toFixed(5)}</li>`);
    
    
    });
    data["sandals"]=clas16;
    data["array"].push("sandals");

    top5=Array.from(prediction2)
    .map(function(p,i){
    return {
    probability: p,
    className: SBRAND[i]
    };
    }).sort(function(a,b){
    return b.probability-a.probability;
    }).slice(0,5);
    $("#result3").empty();
    top5.forEach(function(p){
        if(prob17<p.probability)
    {

        prob17=p.probability;
        clas17=p.className;
    }
    
     $("#result3").append(`<li>${p.className}:${p.probability.toFixed(5)}</li>`);
    
    
    });
    data["sandals brand"]=clas17;
    data["array"].push("sandals brand");


}
if(clas1=="FormalShoes")
{
    model1=await tf.loadModel(`http://localhost:8081/shoes/formal/tone/model.json`); 
    model2=await tf.loadModel(`http://localhost:8081/shoes/formal/type/model.json`); 


    let image= $('#selected-image').get(0);


     let tensor1 = preprocessImage(image,"tone"); 
     let tensor2 = preprocessImage(image,"type"); 
 
    let prediction1 = await model1.predict(tensor1).data(); 
    let prediction2 = await model2.predict(tensor2).data(); 


    top5=Array.from(prediction1)
    .map(function(p,i){
    return {
    probability: p,
    className: FTYPE[i]
    };
    }).sort(function(a,b){
    return b.probability-a.probability;
    }).slice(0,5);
    $("#result2").empty();
    top5.forEach(function(p){
        if(prob18<p.probability)
        {
    
            prob18=p.probability;
            clas18=p.className;
        }
    
    
     $("#result2").append(`<li>${p.className}:${p.probability.toFixed(5)}</li>`);
    
    
    });

    data["formal tone"]=clas18;
    data["array"].push("formal tone");

    top5=Array.from(prediction2)
    .map(function(p,i){
    return {
    probability: p,
    className: FORMAL[i]
    };
    }).sort(function(a,b){
    return b.probability-a.probability;
    }).slice(0,5);
    $("#result3").empty();
    top5.forEach(function(p){
        if(prob19<p.probability)
        {
    
            prob19=p.probability;
            clas19=p.className;
        }
    
    
     $("#result3").append(`<li>${p.className}:${p.probability.toFixed(5)}</li>`);
    
    
    });
    data["formal type"]=clas19;
    data["array"].push("formal type");

}
if(clas=="Flipflops")
{

    model1=await tf.loadModel(`http://localhost:8081/shoes/flipflops/type/model.json`); 
    model2=await tf.loadModel(`http://localhost:8081/shoes/flipflops/brand/model.json`); 


    let image= $('#selected-image').get(0);


     let tensor1 = preprocessImage(image,"type"); 
     let tensor2 = preprocessImage(image,"brand"); 
 
    let prediction1 = await model1.predict(tensor1).data(); 
    let prediction2 = await model2.predict(tensor2).data(); 


    top5=Array.from(prediction1)
    .map(function(p,i){
    return {
    probability: p,
    className: FLIPFLOP[i]
    };
    }).sort(function(a,b){
    return b.probability-a.probability;
    }).slice(0,5);
    $("#result2").empty();
    top5.forEach(function(p){
        if(prob20<p.probability)
    {

        prob20=p.probability;
        clas20=p.className;
    }
    
     $("#result2").append(`<li>${p.className}:${p.probability.toFixed(5)}</li>`);
    
    
    });
    data["flipflop type"]=clas20;
    data["array"].push("flipflop type");


    top5=Array.from(prediction2)
    .map(function(p,i){
    return {
    probability: p,
    className: FBRAND[i]
    };
    }).sort(function(a,b){
    return b.probability-a.probability;
    }).slice(0,5);
    $("#result3").empty();
    top5.forEach(function(p){
        if(prob21<p.probability)
        {
    
            prob21=p.probability;
            clas21=p.className;
        }
    
    
     $("#result3").append(`<li>${p.className}:${p.probability.toFixed(5)}</li>`);
    
    
    });
    data["flipflop brand"]=clas21;
    data["array"].push("flipflop brand");
}




    


   
} 














// loading model for tshirt category

 else if(clas=="Tshirt")
{
 model1=await tf.loadModel(`http://localhost:8081/tshirt/occasion/model.json`); 
   model2=await tf.loadModel(`http://localhost:8081/tshirt/pattern/model.json`);
   model3=await tf.loadModel(`http://localhost:8081/tshirt/sleeves/model.json`);
   model4=await tf.loadModel(`http://localhost:8081/tshirt/type/model.json`);
 model5=await tf.loadModel(`http://localhost:8081/tshirt/fabric/model.json`); 
  


   let image= $('#selected-image').get(0);
    let tensor1 = preprocessImage(image,"occasion"); 
   let tensor2 = preprocessImage(image,"pattern");
   let tensor3 = preprocessImage(image,"sleeves");
   let tensor4 = preprocessImage(image,"type");
    let tensor5 = preprocessImage(image,"fabric"); 
   let prediction1 = await model1.predict(tensor1).data(); 
   let prediction2 = await model2.predict(tensor2).data();
   let prediction3 = await model3.predict(tensor3).data();
   let prediction4 = await model4.predict(tensor4).data();
  let prediction5 = await model5.predict(tensor5).data(); 
   


 let top5=Array.from(prediction1)
   .map(function(p,i){
return {
probability: p,
className: TOCCASSION[i]
};
}).sort(function(a,b){
return b.probability-a.probability;
}).slice(0,5);
$("#result1").empty();
top5.forEach(function(p){
    if(prob22<p.probability)
    {

        prob22=p.probability;
        clas22=p.className;
    }
  
    $("#result1").append(`<li>${p.className}:${p.probability.toFixed(5)}</li>`);

 
}); 
data["tshirt occasion"]=clas22;
data["array"].push("tshirt occasion");

 top5=Array.from(prediction2)
.map(function(p,i){
return {
probability: p,
className: TPATTERN[i]
};
}).sort(function(a,b){
return b.probability-a.probability;
}).slice(0,5);
$("#result2").empty();
top5.forEach(function(p){
    if(prob23<p.probability)
    {

        prob23=p.probability;
        clas23=p.className;
    }
 
 $("#result2").append(`<li>${p.className}:${p.probability.toFixed(5)}</li>`);


});
data["tshirt pattern"]=clas23;
data["array"].push("tshirt pattern");


top5=Array.from(prediction3)
.map(function(p,i){
return {
probability: p,
className: TSLEEVES[i]
};
}).sort(function(a,b){
return b.probability-a.probability;
}).slice(0,5);
$("#result3").empty();
top5.forEach(function(p){
    if(prob24<p.probability)
    {

        prob24=p.probability;
        clas24=p.className;
    }
 
 $("#result3").append(`<li>${p.className}:${p.probability.toFixed(5)}</li>`);


});
data["tshirt sleeves"]=clas24;
data["array"].push("tshirt sleeves");


 top5=Array.from(prediction4)
.map(function(p,i){
return {
probability: p,
className: NTYPE[i]
};
}).sort(function(a,b){
return b.probability-a.probability;
}).slice(0,5);
$("#result4").empty();
top5.forEach(function(p){
    if(prob25<p.probability)
    {

        prob25=p.probability;
        clas25=p.className;
    }
 
 $("#result4").append(`<li>${p.className}:${p.probability.toFixed(5)}</li>`);


});
data["neck type"]=clas25;
data["array"].push("neck type");


 top5=Array.from(prediction5)
.map(function(p,i){
return {
probability: p,
className: FABRIC[i]
};
}).sort(function(a,b){
return b.probability-a.probability;
}).slice(0,5);
$("#result5").empty();
top5.forEach(function(p){
 if(prob26<p.probability)
 {
     prob26=p.probability;
     clas26=p.className;
 }
 $("#result5").append(`<li>${p.className}:${p.probability.toFixed(5)}</li>`);


});
data[" tshirt fabric"]=clas26;
data["array"].push("tshirt fabric");

    


   
} 

sessionStorage.setItem("data",JSON.stringify(data));
window.location="generate_result.html";



console.log(data);




});



//Image prepration for our model


function preprocessImage(image,modelName)
{
    let tensor=tf.fromPixels(image)
    .resizeNearestNeighbor([224,224])
    .toFloat();//sub(meanImageNetRGB);
          
    if(modelName=="hk")
    {
        return tensor;
    }
    else if(modelName=="hk")
    {
        let meanImageNetRGB= tf.tensor1d([123.68,116.779,103.939]);
        return tensor.sub(meanImageNetRGB)
                    .reverse(2)
                    .expandDims();
    }
    else if(modelName=="HKMODEL" || modelName=="distress" || modelName=="fit"|| modelName=="fade"|| modelName=="rise" || modelName=="theme" ||modelName=="occasion" || modelName=="pattern"|| modelName=="sleeves"|| modelName=="type"||modelName=="fabric" || modelName=="brand" || modelName=="tone")
    {
        let offset=tf.scalar(127.5);
        return tensor.sub(offset)
                    .div(offset)
                    .expandDims();
    }
    else
    {
        throw new Error("UnKnown Model error");
    }
}






























