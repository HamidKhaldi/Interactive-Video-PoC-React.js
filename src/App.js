import React, { useState, useEffect } from "react";
import $ from 'jquery';
import videoArr from "./components/data/videoData.json";
import hotspotArr from "./components/data/hotspotData.json";
import BackEndClient from "./components/Api/dataApi";
import Navigation from "./components/Navigation/Navigation";
import Video from "./components/Video/Video";
import Wrapper from "./components/Wrapper/Wrapper";

function App() {
  const [startTime, setStartTime] = useState(0);
  const [videoDetails, setVideoDetails] = useState(videoArr[0]);
  const [sameVideo, setSameVideo] = useState(false);
  const [videoData, setVideoData] = useState(videoArr);
  const [hotspotData, setHotspotData] = useState(hotspotArr);
  const [showSummary, setShowSummary] = useState(false);
  const [progressBar, setProgressBar] = useState(0);

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
