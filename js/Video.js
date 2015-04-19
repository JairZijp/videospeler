var Video = function(){
	this.video = document.getElementsByTagName('video')[0];
	this.playButton = document.getElementById("playPauseToggle");
	this.timeLine = document.getElementById("timeLine");
	this.muteButton = document.getElementById('mute');
	this.fullScreen = document.getElementById('fullscreen');
	this.currentTime = document.getElementById('currentTime');
	this.durationTime = document.getElementById('durationTime');
	this.videoList = document.getElementById("videoList");
}

Video.prototype.playPause = function()
{
	if(this.video.paused){
		this.video.play();
		this.playButton.innerHTML = '<span class="glyphicon glyphicon-pause" aria-hidden="true"></span>';
	} else {
		this.video.pause();
		this.playButton.innerHTML = '<span class="glyphicon glyphicon-play" aria-hidden="true"></span>';
	}
}

Video.prototype.dragTime = function(time)
{
	time = this.video.duration * (this.timeLine.value / 100);
	this.video.currentTime = time;
}

Video.prototype.timeUpdate = function(currentMinutes, currentSeconds, durationMinutes, durationSeconds)
{
	this.timeLine.value = this.video.currentTime * (100 / this.video.duration);
	currentMinutes = Math.floor(this.video.currentTime / 60);
	currentSeconds = Math.floor(this.video.currentTime - currentMinutes * 60);
	durationMinutes = Math.floor(this.video.duration / 60);
	durationSeconds = Math.round(this.video.duration - durationMinutes * 60);
	if(currentSeconds < 10){
		currentSeconds = "0"+currentSeconds;
	}
	if(durationSeconds < 10){
		durationSeconds = "0"+durationSeconds;
	}
	this.currentTime.innerHTML = currentMinutes + ":" + currentSeconds;
	this.durationTime.innerHTML = durationMinutes + ":" + durationSeconds;
	
}

Video.prototype.mute = function () 
{
	if(this.video.muted){
		this.video.muted = false;
		this.muteButton.innerHTML = '<span class="glyphicon glyphicon-volume-up" aria-hidden="true"></span>';
	} else {
		this.video.muted = true;
		this.muteButton.innerHTML = '<span class="glyphicon glyphicon-volume-off" aria-hidden="true"></span>';
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

Video.prototype.changeVideo = function()
{
	this.video.src = 'video/video'+event.target.value+'.mp4';
	this.video.play();
	this.playButton.innerHTML = "<span class='glyphicon glyphicon-pause' aria-hidden='true'>";
	
}


