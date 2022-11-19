song=""
leftwristx= 0;
leftwristy = 0;
rightwristx= 0;
rightwristy = 0;
score_leftwrist= 0;
function setup(){
    canvas= createCanvas(600,500)
    canvas.center()
    video=createCapture(VIDEO);
    video.hide()
    poseNet = ml5.poseNet(video,modelLoaded)
    poseNet.on('pose', gotPoses)

}
function gotPoses(results){
    if(results.length > 0){
        console.log(results)
        score_leftwrist= results[0].pose.keypoints[9].score
        console.log(score_leftwrist)
        leftwristx= results[0].pose.leftWrist.x
        leftwristy= results[0].pose.leftWrist.y
        rightwristx= results[0].pose.rightWrist.x
        rightwristy= results[0].pose.rightWrist.y
        console.log("leftwristx="+ leftwristx +"leftwristy=" + leftwristy) 
        console.log("rightwristx="+ rightwristx +"rightwristy=" + rightwristy)

    }
}
function modelLoaded(){
    console.log("poseNet is intialised")
}
function preload(){
song= loadSound("music.mp3")
}
function draw(){
    image(video,0,0,600,500)
    fill("#F90000")
    stroke("#F90000")
    circle(leftwristx,leftwristy,15)
    InNumberleftwristy= Number(leftwristy)
    remove_decimals= floor(InNumberleftwristy)
    volume= remove_decimals/500
    if(score_leftwrist >0.2){
        fill("#F90000")
    stroke("#F90000")
    circle(leftwristx,leftwristy,15)
    InNumberleftwristy= Number(leftwristy)
    remove_decimals= floor(InNumberleftwristy)
    volume= remove_decimals/500
    document.getElementById("volume").innerHTML= volume
    song.setVolume(volume)
    }
}
function play(){
    song.play();
    song.setVolume(1)
    song.rate(1)
}
function pause_song(){
    song.pause();
    console.log("pause")
}