import React, { useState, useEffect } from "react";
import $ from 'jquery';
// import videojs from "video.js";
// import '/node_modules/video.js/dist/video-js.css';
// import VideoJS from "./components/Video/VideoJs";
import videoArr from "./components/data/videoData.json";
import hotspotArr from "./components/data/hotspotData.json";
// import Header from "./components/Header/Header";
import BackEndClient from "./components/Api/dataApi";
import Navigation from "./components/Navigation/Navigation";
import Video from "./components/Video/Video";
import Wrapper from "./components/Wrapper/Wrapper";
// import nySrc from "https://eygb.sharepoint.com/sites/WireWaxPoC/SiteAssets/Pages/media/exports/UKC-025203_PROJECT_WW_DIGITAL_AUDIT_CH2_NYC.mp4";
// import singaporeSrc from "https://eygb.sharepoint.com/sites/WireWaxPoC/SiteAssets/Pages/media/exports/UKC-025203_PROJECT_WW_DIGITAL_AUDIT_CH3_SINGAPORE.mp4";
// import londonSrc from "https://eygb.sharepoint.com/sites/WireWaxPoC/SiteAssets/Pages/media/exports/UKC-025203_PROJECT_WW_DIGITAL_AUDIT_CH4_LONDON.mp4";
// import stuttgartSrc from 'https://eygb.sharepoint.com/sites/WireWaxPoC/SiteAssets/Pages/media/exports/UKC-025203_PROJECT_WW_DIGITAL_AUDIT_CH5_STUTTGART.mp4';
// import amsterdamSrc from 'https://eygb.sharepoint.com/sites/WireWaxPoC/SiteAssets/Pages/media/exports/UKC-025203_PROJECT_WW_DIGITAL_AUDIT_CH6_AMSTERDAM.mp4';
// import outroSrc from 'https://eygb.sharepoint.com/sites/WireWaxPoC/SiteAssets/Pages/media/exports/UKC-025203_PROJECT_WW_DIGITAL_AUDIT_CH7_OUTRO.mp4';


// const videoArr = [
//   {
//     id: 1,
//     name: 'New York',
//     src: 'https://eygb.sharepoint.com/sites/WireWaxPoC/SiteAssets/Pages/media/exports/UKC-025203_PROJECT_WW_DIGITAL_AUDIT_CH2_NYC.mp4',
//     description: 'New York video description',
//     hotSpotArr: [
//       {
//         name: 'Project Everest',
//         time: '33'
//       },
//       {
//         name: 'The Neon Program',
//         time: '525'
//       },
//       {
//         name: 'Expectations',
//         time: '652'
//       }
//     ]
//   },
//   {
//     id: 2,
//     name: 'Singapore',
//     src: 'https://eygb.sharepoint.com/sites/WireWaxPoC/SiteAssets/Pages/media/exports/UKC-025203_PROJECT_WW_DIGITAL_AUDIT_CH3_SINGAPORE.mp4',
//     description: 'Singapore video description',
//     hotSpotArr: [
//       {
//         name: 'Connecting',
//         time: '44'
//       },
//       {
//         name: 'EY Canvas',
//         time: '84'
//       },
//       {
//         name: 'Communicating',
//         time: '350'
//       }
//     ]
//   },
//   {
//     id: 3,
//     name: 'London',
//     src: 'https://eygb.sharepoint.com/sites/WireWaxPoC/SiteAssets/Pages/media/exports/UKC-025203_PROJECT_WW_DIGITAL_AUDIT_CH4_LONDON.mp4',
//     description: 'London video description',
//     hotSpotArr: [
//       {
//         name: 'Animation',
//         time: '40'
//       },
//       {
//         name: 'Automating',
//         time: '300'
//       },
//       {
//         name: 'My new hotspot',
//         time: '360'
//       }
//     ]
//   },
//   {
//     id: 4,
//     name: 'Stuttgart',
//     src: 'https://eygb.sharepoint.com/sites/WireWaxPoC/SiteAssets/Pages/media/exports/UKC-025203_PROJECT_WW_DIGITAL_AUDIT_CH5_STUTTGART.mp4',
//     description: 'Stuttgart video description',
//     hotSpotArr: [
//       {
//         name: 'Driving value',
//         time: '100'
//       },
//       {
//         name: 'Evaluation',
//         time: '280'
//       }
//     ]
//   },
//   {
//     id: 5,
//     name: 'Amsterdam',
//     description: 'Amsterdam video description',
//     src: 'https://eygb.sharepoint.com/sites/WireWaxPoC/SiteAssets/Pages/media/exports/UKC-025203_PROJECT_WW_DIGITAL_AUDIT_CH6_AMSTERDAM.mp4',
//     hotSpotArr: [
//       {
//         name: 'Analyzing',
//         time: '300'
//       },
//       {
//         name: 'Antonio',
//         time: '360'
//       }
//     ]
//   },
//   {
//     id: 6,
//     name: 'Outro',
//     description: 'Outro video description',
//     src: 'https://eygb.sharepoint.com/sites/WireWaxPoC/SiteAssets/Pages/media/exports/UKC-025203_PROJECT_WW_DIGITAL_AUDIT_CH7_OUTRO.mp4',
//     hotSpotArr: []
//   }
// ];

function App() {
  const [startTime, setStartTime] = useState(0);
  const [videoDetails, setVideoDetails] = useState(videoArr[0]);
  const [sameVideo, setSameVideo] = useState(false);
  const [videoData, setVideoData] = useState(videoArr);
  const [hotspotData, setHotspotData] = useState(hotspotArr);
  const [showSummary, setShowSummary] = useState(false);
  const [progressBar, setProgressBar] = useState(0);

  // const playerRef = React.useRef(null);

  // const videoJsOptions = {
  //   autoplay: true,
  //   controls: true,
  //   responsive: true,
  //   fluid: true,
  //   sources: [{
  //     src: 'https://eygb.sharepoint.com/sites/WireWaxPoC/SiteAssets/Pages/media/exports/UKC-025203_PROJECT_WW_DIGITAL_AUDIT_CH2_NYC.mp4',
  //     type: 'video/mp4'
  //   }]
  // };

  // const handlePlayerReady = (player) => {
  //   playerRef.current = player;

  //   // You can handle player events here, for example:
  //   player.on('waiting', () => {
  //     videojs.log('player is waiting');
  //   });

  //   player.on('dispose', () => {
  //     videojs.log('player will dispose');
  //   });
  // };


  async function getLstInteractiveData() {
    const response = await BackEndClient.get(`getByTitle('Lst_Interactive-Data')/items?$select=*&top=5000`);
    //console.log('response ', response)
    return response.data.d.results;
  }

  async function getLstHotspotData() {
    const response = await BackEndClient.get(`getByTitle('Lst_Hotspots')/items?$select=*&top=5000`);
    //console.log('response ', response)
    return response.data.d.results;
  }

  const changeVideoState = () => {
    setSameVideo(false);
  }

  const goToVideo = (video, hotspot) => {
    //console.log('goToVideo details ', video, hotspot);
    video === videoDetails ? setSameVideo(true) : setSameVideo(false);
    hotspot === undefined ? setStartTime(0) : setStartTime(hotspot.time);
    setVideoDetails(video);
  };

  useEffect(() => {
    // console.log('startTime in app ', startTime);
  }, [startTime, sameVideo]);

  useEffect(() => {
    // setNewsArchiveActiveIndex(4);
    // console.log('useEffect 11111111111111111111111111111');
    (async () => {
      try {
        const InteractiveData = await getLstInteractiveData();
        setVideoData(InteractiveData);
        //console.log('videoData ', videoData);

      } catch (error) {
        //console.log('======== Video Data useEffect() will be set by .json file ========');

      }
    })();

    (async () => {
      try {
        const HotspotData = await getLstHotspotData();
        setHotspotData(HotspotData);
        //console.log('hotspotData ', hotspotData);

      } catch (error) {
        //console.log('======== Hotspot Data useEffect() will be set by .json file ========');

      }
    })();


  }, [videoData, hotspotData]);

  videoData.map(video => {
    video.hotSpotArr = [];
    hotspotData.map(hotspot => {
      if(video.ID === hotspot.Video_x002d_NameId){
        video.hotSpotArr.push({
          name : hotspot.Title,
          time : hotspot.Timing
        })
      }
    });
  });

  //console.log('videoData w hotspots', videoData);

  // const gotoVideo = (videoName) => {
  //   setStartTime(0);
  //   let clickedVideoSrc = videoArr.filter(video => video.name === videoName)[0]['src'];
  //   setVideoSrc(clickedVideoSrc);
  //   setVideoDetails(videoArr.filter(video => video.name === videoName)[0]);
  // };


  return (
    <div className="App">
      <Wrapper>
        <Navigation videoArr={videoData} showSummary={showSummary} onVideoLinkClick={goToVideo} onHotSpotClick={goToVideo} />
        <Video sameVideo={sameVideo} onClickSameVideo={changeVideoState} videoDetails={videoDetails} startTime={startTime} videoArr={videoData} onVideoLinkClick={goToVideo} />
        {/* <VideoJS options={videoJsOptions} onReady={handlePlayerReady} /> */}
      </Wrapper>
    </div>
  );
}

export default App;
