prediction_1 = ""


Webcam.set ({
  width : 350,
  height : 300,
  image_format : "png",
  png_quality : 90  
});

camera = document.getElementById("camera");
Webcam.attach("#camera");
function take_snapshot(){
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML="<img id='captured_image' src='" + data_uri + "'/>";
    });
}
console.log ("ml5 version = ",ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/rCGKCzQRW/model.json',model_loaded);

function model_loaded(){
    console.log ("model is loaded");
}

function speak(){
    var synth = window.speechSynthesis
    speak_data1 = "first prediction is " + prediction_1;
    speak_data2 = "and second predicition is " + prediction_2;
    
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured_image");
   classifier.classify(img,got_result);
}

function got_result(error,results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    document.getElementById("result_emotion_name").innerHTML = prediction_1;
    document.getElementById("result_emotion_name_2").innerHTML = prediction_2;
 speak();
if(prediction_1 == "happy"){
    document.getElementById("update_emoji").innerHTML = "&#128522;";
}
if(prediction_1 == "sad"){
    document.getElementById("update_emoji").innerHTML = "&#128532;";
}
if(prediction_1 == "angry"){
    document.getElementById("update_emoji").innerHTML = "&#128548;";
}
if(prediction_2 == "happy"){
    document.getElementById("update_emoji_2").innerHTML = "&#128522;";
}
if(prediction_2 == "sad"){
    document.getElementById("update_emoji_2").innerHTML = "&#128532;";
}
if(prediction_2 == "angry"){
    document.getElementById("update_emoji_2").innerHTML = "&#128548;";
}
}
}