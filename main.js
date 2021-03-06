Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach(camera);

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("output").innerHTML='<img id="capture_image" src="'+data_uri+'">';

    });

}

console.log("ml5version:",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/AjERH5cCT/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model Is Loaded !!!!")
    
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data1="the first prediction is "+ prediction_1;
    speak_data2=" and the second prediction is "+ prediction_2; 
    var utterThis= new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}
function Predict(){
    img=document.getElementById("capture_image")
    classifier.classify(img,gotResult)

}
 function gotResult(error,results){
    if(error){
        console.error(error);


    }
    else{
        console.log(results);
       document.getElementById("result_emotion_name").innerHTML=results[0].label;
       document.getElementById("result_emotion_name2").innerHTML=results[1].label;
       prediction_1=results[0].label;
       prediction_2=results[1].label;
      speak();
       if(results[0].label=="Ok"){
           document.getElementById("update_emoji").innerHTML="&#128076;";
       }
       if(results[0].label=="Thumbs Up"){
        document.getElementById("update_emoji").innerHTML="&#128077;";
    }
    if(results[0].label=="Thumbs Down"){
        document.getElementById("update_emoji").innerHTML="&#128078;";
    }
    if(results[0].label=="Prayer"){
        document.getElementById("update_emoji").innerHTML="&#128079;";
    }
    if(results[0].label=="Fingers Crossed"){
        document.getElementById("update_emoji").innerHTML="&#9996;";
    }
    
    if(results[1].label=="Ok"){
        document.getElementById("update_emoji2").innerHTML="&#128076;";
    }
    if(results[1].label=="Thumbs Down"){
     document.getElementById("update_emoji2").innerHTML="&#128078;";
 }
 if(results [1].label=="Thumbs Up"){
     document.getElementById("update_emoji2").innerHTML="&#128077;";
 }
 if(results [1].label=="Praying"){
    document.getElementById("update_emoji2").innerHTML="&#128079;";
}
if(results [1].label=="Fingers Crossed"){
    document.getElementById("update_emoji2").innerHTML="&#9996;";
}




    }

}
