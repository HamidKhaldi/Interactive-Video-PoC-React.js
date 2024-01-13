import React, { useState, useEffect } from "react";
import $ from 'jquery';
// import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import Video from "./components/Video/Video";
import Wrapper from "./components/Wrapper/Wrapper";


const videoArr = [
  {
    id: 1,
    name: 'New York',
    src: nySrc,
    description: 'New York video description',
    hotSpotArr: [
      {
        name: 'Project Everest',
        time: '33'
      },
      {
        name: 'The Neon Program',
        time: '525'
      },
      {
        name: 'Expectations',
        time: '652'
      }
    ]
  },
  {
    id: 2,
    name: 'Singapore',
    src: singaporeSrc,
    description: 'Singapore video description',
    hotSpotArr: [
      {
        name: 'Connecting',
        time: '44'
      },
      {
        name: 'EY Canvas',
        time: '84'
      },
      {
        name: 'Communicating',
        time: '350'
      }
    ]
  },
  {
    id: 3,
    name: 'London',
    src: londonSrc,
    description: 'London video description',
    hotSpotArr: [
      {
        name: 'Animation',
        time: '40'
      },
      {
        name: 'Automating',
        time: '300'
      },
      {
        name: 'My new hotspot',
        time: '360'
      }
    ]
  },
  {
    id: 4,
    name: 'Stuttgart',
    src: stuttgartSrc,
    description: 'Stuttgart video description',
    hotSpotArr: [
      {
        name: 'Driving value',
        time: '100'
      },
      {
        name: 'Evaluation',
        time: '280'
      }
    ]
  },
  {
    id: 5,
    name: 'Amsterdam',
    description: 'Amsterdam video description',
    src: amsterdamSrc,
    hotSpotArr: [
      {
        name: 'Analyzing',
        time: '300'
      },
      {
        name: 'Antonio',
        time: '360'
      }
    ]
  },
  {
    id: 6,
    name: 'Outro',
    description: 'Outro video description',
    src: outroSrc,
    hotSpotArr: []
  }
];

function App() {
  const [startTime, setStartTime] = useState(0);
  const [videoDetails, setVideoDetails] = useState(videoArr[0]);
  const [sameVideo, setSameVideo] = useState(false);

  const changeVideoState = () => {
    setSameVideo(false);
  }

  const goToVideo = (video, hotspot) => {
    console.log('goToVideo details ', video, hotspot);
    video === videoDetails ? setSameVideo(true) : setSameVideo(false);
    hotspot === undefined ? setStartTime(0) : setStartTime(hotspot.time);
    setVideoDetails(video);
  };

  useEffect(() => {
    // console.log('startTime in app ', startTime);
  }, [startTime, sameVideo]);

  return (
    <div className="App">
      <Wrapper>
        <Navigation videoArr={videoArr} onVideoLinkClick={goToVideo} onHotSpotClick={goToVideo} />
        <Video sameVideo={sameVideo} onClickSameVideo={changeVideoState} videoDetails={videoDetails} startTime={startTime} videoArr={videoArr} onVideoLinkClick={goToVideo} />
      </Wrapper>
    </div>
  );
}

export default App;
