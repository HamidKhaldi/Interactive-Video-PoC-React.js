import $ from 'jquery';
//import featherlight  from 'featherlight';

let videoHalfway = 0;
let formattedHalfway = 0;

let choicePart = 49;
let hotspot = 8;
let linkOnePart = 13;
let linkTwoPart = 18;
let linkThreePart = 34;
let goodChoiceMade = false;

let question1Asked = false;

let video1;

let videoArr = [
	{
		id: 1,
		name: 'Intro',
		src: 'assets/media/exports/UKC-025203_PROJECT_WW_DIGITAL_AUDIT_CH1_INTRO.mp4'
	}, 
	{
		id: 2,
		name: 'New York',
		src: 'assets/media/exports/UKC-025203_PROJECT_WW_DIGITAL_AUDIT_CH2_NYC.mp4'
	},
	{
		id: 3,
		name: 'Singapore',
		src: 'assets/media/exports/UKC-025203_PROJECT_WW_DIGITAL_AUDIT_CH3_SINGAPORE.mp4'
	},  
	{
		id: 4,
		name: 'London',
		src: 'assets/media/exports/UKC-025203_PROJECT_WW_DIGITAL_AUDIT_CH4_LONDON.mp4'
	}, 
	{
		id: 5,
		name: 'Stuttgart',
		src: 'assets/media/exports/UKC-025203_PROJECT_WW_DIGITAL_AUDIT_CH5_STUTTGART.mp4'
	}, 
	{
		id: 6,
		name: 'Amsterdam',
		src: 'assets/media/exports/UKC-025203_PROJECT_WW_DIGITAL_AUDIT_CH6_AMSTERDAM.mp4'
	}, 
	{
		id: 7,
		name: 'Outro',
		src: 'assets/media/exports/UKC-025203_PROJECT_WW_DIGITAL_AUDIT_CH7_OUTRO.mp4'
	}
];

// let playAllVideos = (arr, videoEl) => {
// 	console.log(' in function');
// 	for (let i=0; i < arr.length-1; i++){
// 		$(videoEl).on('ended', ()=>{
// 			let videoSrc = $(videoEl).get(0).currentSrc;
// 			videoSrc = arr[i+1]['src'];
// 			videoEl[0].play();
// 			console.log('current src', arr[i+1], videoSrc);
// 		});
// 	}
// }

// $(document).ready(function(){

	$.featherlight.defaults.afterClose = playPauseVideo;
	
	video1 = $('#video1');
	// video2 = $('#video2');
	 
	//playAllVideos(videoArr, video1);

	// $(video1).on('ended', ()=>{
	// 	console.log('vid ended');
	// 	console.log('src current', $(video1).get(0).currentSrc);
	// 	let vidSrc = $(video1).get(0).currentSrc;
	// 	vidSrc = 'assets/media/UKC-025607_GERI_3_NO-WHEEL.mp4';
	// 	video1[0].play();
	// });

	// $('.box1').on('click', function(){
	// 	playPauseVideo('.persona1PopUp');
	// });

	// $('.box2').on('click', function(){
	// 	playPauseVideo('.persona2PopUp');
	// });

	$('.link-one').on('click', function(){
		$.featherlight.close();
		video1[0].currentTime = linkOnePart;
		// goodChoiceMade = true;
	});

	// $('.link-two').on('click', function(){
	// 	$.featherlight.close();
	// 	video1[0].currentTime = linkTwoPart;
	// });

	$('.link-three').on('click', function(){
		$.featherlight.close();
		video1[0].currentTime = linkThreePart;
	});

	$(video1).on('loadeddata', function(){
		videoHalfway = Math.round(this.duration/2);
		console.log('videoHalfway', videoHalfway);
	});

	$(video1).on('timeupdate', function(){

		// $(video1).on('ended', ()=>{
		// 	let videoSrc = $(video1).attr('src');
		// 	console.log('current src ', videoSrc);
		// 	let path = 'assets/media/exports';
		// 	// videoSrc = videoSrc.slice(videoSrc.indexOf(path)+ path.length);
		// 	// let videoIndex = videoArr.findIndex(video => video['src'].includes(videoSrc));
		// 	// console.log('videoIndex', videoIndex);
		// 	// if(videoIndex < videoArr.length-1){
		// 	// 	console.log('src index + 1', videoArr[videoIndex + 1]['src']);
		// 	// 	$(video1).src = videoArr[videoIndex + 1]['src'];
		// 	// 	console.log('new vid src', $(video1).get(0).currentSrc);
		// 	// 	video1[0].load();
		// 	// 	video1[0].play();
		// 	// } else {
		// 	// 	videoSrc = videoArr[1]['src'];
		// 	// 	video1[0].pause();
		// 	// }
		// });	
		
		let currentTime = Math.round(this.currentTime);
		let durationNum = Math.round(this.duration);
		onTrackedVideoFrame(currentTime, durationNum);

		if(currentTime < choicePart){
			question1Asked = false;
		}

		if(currentTime === choicePart && question1Asked === false){
			question1Asked = true;
			video1[0].pause();
			$.featherlight($('.highlights-overlay'));
		}

		// if(currentTime === videoHalfway){
		// 	//halfway point
		// }

		// if(currentTime === badChoicePart && goodChoiceMade === true){
		// 	video1[0].pause();
		// }

		// if(currentTime === durationNum){
		// 	//end point
		// }
	});

	// $(video2).on('timeupdate', function(){
	// 	let currentTime = Math.round(this.currentTime);
	// 	let durationNum = Math.round(this.duration);
	// 	//onTrackedVideoFrame(currentTime, durationNum);

	// 	if(currentTime < hotspot){
	// 		$('.hotspot').css({'animation' : 'none'});
	// 		$('.svg-1>path').css({'animation' : 'none'});
	// 		$('.hotspot-content').css({'animation' : 'none'});
	// 	}

	// 	if(currentTime === hotspot){
	// 		// video2[0].pause();
	// 		$('.hotspot').css({'animation' : 'showContent 1s normal', 'animation-fill-mode':'forwards'});
	// 		$('.svg-1>path').css({'animation' : 'draw 4s reverse', 'animation-fill-mode':'forwards'});
	// 		$('.hotspot-content').css({'animation' : 'showContent 2s normal 2s ease-in-out', 'animation-fill-mode':'forwards'});
	// 	}

	// 	if(currentTime === (hotspot + 12)){			
	// 		console.log(' hotspot + 12', currentTime);
	// 		$('.hotspot-content').css({'animation' : 'removeContent 2s normal ease-in-out', 'animation-fill-mode':'forwards'});
	// 		$('.svg-1>path').css({'animation' : 'removePath 3s reverse ease-in-out', 'animation-fill-mode':'forwards'});			
	// 		$('.hotspot').css({'animation' : 'removeContent 1s normal 3s', 'animation-fill-mode':'backwards'});
	// 	}
	// });

// });

function onTrackedVideoFrame(currentTime, duration){
	$('.current').text(secondsToHms(currentTime));
	$('.duration').text(secondsToHms(duration));
}

function playPauseVideo(popUp){
	if(video1[0].paused){
		video1[0].play();
	} else {
		video1[0].pause();
		$.featherlight($(popUp));
	}
}


	


/* DO NOT DELETE: Converting the time into minutes and seconds */
function secondsToHms(d) {
	d = Number(d);
	let h = Math.floor(d / 3600);
	let m = Math.floor(d % 3600 / 60);
	let s = Math.floor(d % 3600 % 60);
	return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s); 
}

// console.log('video1', $('#video1').selector);
// let video1Selector = $('#video1').selector;
// let player = videojs(video1Selector);

//    //load the marker plugin
//    player.markers({
//       markerTip:{
//          display: true,
//          text: function(marker) {
//             return "This is a break: " + marker.text;
//          }
//       },
//       breakOverlay:{
//          display: true,
//          displayTime: 3,
//          text: function(marker) {
//             return "This is an break overlay: " + marker.text;
//          }
//       },
//       onMarkerReached: function(marker) {
//          $('.event-list').append("<div>marker reached: " + marker.text + "</div>");

//       },
//       onMarkerClick: function(marker){
//          $('.event-list').append("<div>marker clicked: " + marker.text + "</div>");

//       },
//       markers: [
//          {
//             time: 9.5,
//             text: "this"
//          },
//          {
//             time: 16,
//             text: "is"
//          },
//          {
//             time: 23.6,
//             text: "so"
//          },
//          {
//             time: 28,
//             text: "cool"
//          },
//          {
//             time: 36,
//             text: ":)"
//          }
//       ]
//    });

//    $(".next").click(function(){
//       player.markers.next();
//    });
//    $(".prev").click(function(){
//       player.markers.prev();
//    });
//    $(".remove").click(function(){
//       player.markers.remove([0,1]);
//    })
//    $(".add").click(function(){
//       player.markers.add([{
//             time: 25,
//             text: "I'm NEW"
//          }]);
//    });
//    $(".updateTime").click(function(){
//       let markers = player.markers.getMarkers();
//       for (let i = 0; i < markers.length; i++) {
//          markers[i].time += 1;
//       }
//       player.markers.updateTime();
//    });

//    $(".reset").click(function(){
//       player.markers.reset([{
//             time: 40,
//             text: "I'm NEW"
//          },
//          {
//             time:20,
//             text: "Brand new"
//          }]);
//    });
//    $(".destroy").click(function(){
//       player.markers.destroy();
//    })
