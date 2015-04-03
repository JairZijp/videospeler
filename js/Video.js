var Video = function(){}

var video = document.getElementById("video1");
var playButton = document.getElementById("playPauseToggle");
var timeLine = document.getElementById("timeLine");

Video.prototype.playPause = function()
{
	
	if(video.paused){
		video.play();
		playButton.innerHTML = "Pause";
	} else {
		video.pause();
		playButton.innerHTML = "Play";
	}
	
}

Video.prototype.vidSeek = function()
{
	var seekto = video.duration * (timeLine.value / 100);
	video.currentTime = seekto;
}

Video.prototype.timeUpdate = function()
{
	timeLine.value = video.currentTime * (100 / video.duration);
}


