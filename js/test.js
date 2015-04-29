var video_player = document.getElementById("video_player");
video = video_player.getElementsByTagName("video")[0],
video_links = video_player.getElementsByTagName("figcaption")[0],
source = video.getElementsByTagName("source"),
link_list = [],
vidDir = "http://demosthenes.info/assets/videos/",
currentVid = 0,
allLnks = video_links.children,
lnkNum = allLnks.length;
video.removeAttribute("controls");
video.removeAttribute("poster");

(function() {
function playVid(index) {
 video_links.children[index].classList.add("currentvid");
    source[0].src = vidDir + link_list[index] + ".webm";  
	source[1].src = vidDir + link_list[index] + ".mp4";
    currentVid = index;
    video.load();
	video.play();
}

for (var i=0; i<lnkNum; i++) {
var filename = allLnks[i].href;
link_list[i] = filename.match(/([^\/]+)(?=\.\w+$)/)[0];
(function(index){
        allLnks[i].onclick = function(i){
        i.preventDefault();  
		for (var i=0; i<lnkNum; i++) {
		allLnks[i].classList.remove("currentvid");
		}
		playVid(index);
        }    
    })(i);
}
video.addEventListener('ended', function () {
    allLnks[this.currentVideo].classList.remove("currentVideo");
    if ((this.currentVideo + 1) >= lnkNum) { 
        nextVid = 0;
    } else { 
        nextVid = this.currentVideo+1; 
    }
    playVid(nextVid);
})

video.addEventListener('mouseenter', function() {
    video.setAttribute("controls","true");
})

video.addEventListener('mouseleave', function() {
    video.removeAttribute("controls");
})

var indexOf = function(needle) {
    if(typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;
			for(i = 0; i < this.length; i++) {
                if(this[i] === needle) {
                    index = i;
                    break;
                }}
            return index;
        };}
    return indexOf.call(this, needle);
};
 	var focusedLink = document.activeElement;
 	index = indexOf.call(allLnks, focusedLink);
 	
document.addEventListener('keydown', function(e) {
if (index) {
	var focusedElement = document.activeElement;
    if (e.keyCode == 40 || e.keyCode == 39) { // down or right cursor
    var nextNode = focusedElement.nextElementSibling;
    if (nextNode) { nextNode.focus(); } else { video_links.firstElementChild.focus(); }
    }
   if (e.keyCode == 38 || e.keyCode == 37) { // up or left cursor
    var previousNode = focusedElement.previousElementSibling;
    if (previousNode) { previousNode.focus(); } else { video_links.lastElementChild.focus(); }
    }
 }
});

})();  
