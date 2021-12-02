var song1 = "";
var song2 = "";
var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;
var leftWristscore = 0;
var rightWristscore = 0;
var song1Status = "";
var song2Status = "";
function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw() {
    image(video, 0,0, 600,500);
    fill("red");
    if(leftWristscore > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop()
        if(song2 == false) {
            song1.isPlaying();
            document.getElementById("songName").innerHTML = "Harry Potter Theme";
        }
    }
    if(rightWristscore > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song1.stop()
        if(song1 == false) {
            song2.isPlaying();
            document.getElementById("songName").innerHTML = "Peter Pan";
        }
    }
}
function modelLoaded() {

}
function gotPoses(results) {
    if(results.length>0){
        console.log(results);
        
        leftWristscore = result[0].pose.keypoints[9].score;
        console.log(leftWristscore);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristscore = result[0].pose.keypoints[10].score;
        console.log(rightWristscore);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        
    }
}