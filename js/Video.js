var Video = function(video, playButton, timeLine, muteButton){
	this.video = document.getElementById("video1");
	this.playButton = document.getElementById("playPauseToggle");
	this.timeLine = document.getElementById("timeLine");
	this.muteButton = document.getElementById('mute');
	this.fullScreen = document.getElementById('fullscreen');
}

Video.prototype.playPause = function()
{
	
	if(this.video.paused){
		this.video.play();
		this.playButton.innerHTML = "Pause";
	} else {
		this.video.pause();
		this.playButton.innerHTML = "Play";
	}
	
}

Video.prototype.vidSeek = function(seekto)
{
	this.seekto = this.video.duration * (this.timeLine.value / 100);
	this.video.currentTime = this.seekto;
}

Video.prototype.timeUpdate = function()
{
	this.timeLine.value = this.video.currentTime * (100 / this.video.duration);
}

Video.prototype.mute = function () 
{
	if(this.video.muted){
		this.video.muted = false;
		this.muteButton.innerHTML = "Mute";
	} else {
		this.video.muted = true;
		this.muteButton.innerHTML = "Unmute";
	}
}

Video.prototype.fullScreenMode = function()
{
	if(this.video.requestFullScreen) {
		this.video.requestFullScreen();
	} else if (this.video.webkitRequestFullScreen) {
		this.video.webkitRequestFullScreen();
	} else if (this.video.mozRequestFullScreen) {
		this.video.mozRequestFullScreen();
	}
}


