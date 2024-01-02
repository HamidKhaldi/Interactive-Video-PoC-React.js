import React, { Fragment, useState, useEffect, useRef } from "react";

import "./Video.scss";
import ReactPlayer from "react-player/lazy";
import $ from 'jquery';
import featherlight from 'featherlight';
// import chevron from "../../assets/images/chevron_yellow.png";
// import wheel from "../../assets/images/wheel.png";
import arrowImg from "../../assets/images/arrow-circle.png";
// import closeImg from "../../assets/images/close.png";
import neonImg from "../../assets/images/neon.png";


const Video = props => {

    let clickedHotspot = props.startTime;
    let clickedVideo = props.videoDetails;
    let videoHalfway = 0;
    // let formattedHalfway = 0;
    let choicePart = 49;
    let neonHotspot = 42;
    let neonMention = 525;
    let linkOnePart = 13;
    // let linkTwoPart = 18;
    let linkThreePart = 34;
    // let goodChoiceMade = false;
    let question1Asked = false;
    let video1 = $('.video');

    const videoArr = props.videoArr;
    console.log('videoArr', videoArr);

    const videoPlayerRef = useRef();
    // const [videoSrc, setVideoSrc] = useState(props.videoSrc);
    const [showHotspot, setShowHotspot] = useState(false);
    const [showSummary, setShowSummary] = useState(false);
    // const [videoName, setVideoName] = useState('');
    const [nextVideo, setNextVideo] = useState({});
    const [overlayClosed, setOverlayClosed] = useState(true);
    const [highlightOverlayClosed, setHighlightOverlayClosed] = useState(true);

    const getNextVideo = (currentSrc) => {
        let trimmedVideoPath = currentSrc.substring(
            currentSrc.lastIndexOf("/") + 1,
            currentSrc.indexOf(".")
        );
        let videoIndex = videoArr.findIndex(video => video['src'].includes(trimmedVideoPath));
        if (videoIndex < videoArr.length - 1) {
            setNextVideo(videoArr[(videoIndex + 1)]);
        } else {
            setNextVideo(videoArr[0]);
            $('.video').autoplay = false;
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const playNextVideo = () => {
        setShowSummary(false);
    }

    useEffect(() => {
    }, [playNextVideo, props.videoDetails.src, nextVideo, clickedHotspot]);

    const showOverlay = () => {
        setOverlayClosed(false);
        video1[0].pause();
    };

    const hideOverlay = () => {
        setOverlayClosed(true);
        video1[0].play();
    };

    const toggleHighlightOverlay = () => {
        highlightOverlayClosed ? setHighlightOverlayClosed(false) : setHighlightOverlayClosed(true);
        video1[0].paused ? video1[0].play() : video1[0].pause();
    }

    const goToHotspot = () => {
        video1[0].currentTime = neonMention;
        setOverlayClosed(true);
        video1[0].play();
    }

    /* DO NOT DELETE: Converting the time into minutes and seconds */
    const secondsToHms = (d) => {
        d = Number(d);
        let h = Math.floor(d / 3600);
        let m = Math.floor(d % 3600 / 60);
        let s = Math.floor(d % 3600 % 60);
        return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
    }

    const onTrackedVideoFrame = (currentTime, duration) => {
        $('.current').text(secondsToHms(currentTime));
        $('.duration').text(secondsToHms(duration));
    }

    const playPauseVideo = (popUp) => {
        if (video1[0].paused) {
            video1[0].play();
        } else {
            video1[0].pause();
            $.featherlight($(popUp));
        }
    }

    $.featherlight.defaults.afterClose = playPauseVideo;
    //console.log('featherlight ', $.featherlight.defaults.afterClose);

    // $(video1).on('ended', ()=>{
    // 	console.log('vid ended');
    // 	console.log('src current', $(video1).get(0).currentSrc);
    // 	let vidSrc = $(video1).get(0).currentSrc;
    // 	vidSrc = 'assets/media/UKC-025607_GERI_3_NO-WHEEL.mp4';
    // 	video1[0].play();
    // });

    // $('.link-one').on('click', function () {
    //     $.featherlight.close();
    //     video1[0].currentTime = linkOnePart;
    //     // goodChoiceMade = true;
    // });

    // $('.link-three').on('click', function () {
    //     $.featherlight.close();
    //     video1[0].currentTime = linkThreePart;
    // });

    //$('.video').css('opacity', 0);
    // $('.video').oncanplaythrough = function() {
    //     setTimeout(function() {
    //         var e = document.getElementById('video1');
    //         fade(e);
    //     }, 5000);
    // };

    if (props.sameVideo) {
        $('.video')[0].currentTime = clickedHotspot;
    }


    const launchAnimations = () => {

        $('.video').on('loadeddata', function () {
            $('.video').autoplay = true;
            console.log('duration ', this.duration);
            // $('.video').fadeIn(3000);
            console.log('clickedHotspot ', clickedHotspot);
            videoHalfway = Math.round(this.duration / 2);
            clickedHotspot ? this.currentTime = clickedHotspot : this.currentTime = 0;
            getNextVideo(props.videoDetails.src);
            setShowSummary(false);
        });


        $('.video').on('timeupdate', function () {

            let currentTime = Math.round(this.currentTime);
            let durationNum = Math.round(this.duration);

            onTrackedVideoFrame(currentTime, durationNum);

            if (currentTime === 0) {
                console.log('FADEIN');
                $('.video').fadeIn(3000);
            }

            if (currentTime >= (durationNum - 30)) {
                setShowSummary(true);
            }

            if (currentTime < choicePart) {
                question1Asked = false;
            }

            if (currentTime === choicePart && question1Asked === false) {
                question1Asked = true;
                //$('.video')[0].pause();
                //$.featherlight($('.highlights-overlay'));
            }

            if (currentTime < neonHotspot) {
                if (props.videoDetails.id !== 1) {
                    setShowHotspot(false);
                }
                $('.hotspot').css({ 'animation': 'none' });
                $('.svg-1>path').css({ 'animation': 'none' });
                $('.hotspot-content').css({ 'animation': 'none' });
            }

            if (currentTime === neonHotspot) {
                if (props.videoDetails.id === 1) {
                    setShowHotspot(true);
                }
                $('.hotspot').css({ 'animation': 'showContent 1s normal', 'animation-fill-mode': 'forwards' });
                $('.svg-1>path').css({ 'animation': 'draw 4s reverse', 'animation-fill-mode': 'forwards' });
                $('.hotspot-content').css({ 'animation': 'showContent 2s normal 2s ease-in-out', 'animation-fill-mode': 'forwards' });
            }

            if (currentTime === (neonHotspot + 12)) {
                if (props.videoDetails.id !== 1) {
                    setShowHotspot(false);
                }
                $('.hotspot-content').css({ 'animation': 'removeContent 2s normal ease-in-out', 'animation-fill-mode': 'forwards' });
                $('.svg-1>path').css({ 'animation': 'removePath 3s reverse ease-in-out', 'animation-fill-mode': 'forwards' });
                $('.hotspot').css({ 'animation': 'removeContent 1s normal 3s', 'animation-fill-mode': 'backwards' });
            }

            if (currentTime === (durationNum - 3)) {
                console.log('FADEOUT');
                $('.video').fadeOut(3000);
            }
        });
    };

    return (
        <Fragment>
            <div className="container">
                <div className="row videoArea">
                    {/* <video id="video1" ref={videoPlayerRef} key={props.videoDetails.id} onLoadStart={launchAnimations} onEnded={() => { props.onVideoLinkClick(nextVideo) }} controls autoPlay={true} mute="true">
                        <source src={props.videoDetails.src} type="video/mp4" />
                        your browser does not support the video tag
                    </video> */}
                    {
                        videoArr.map((videoItem) => {
                            return (
                                <video className="video" video id={`video` + videoItem.id} ref={videoPlayerRef} key={videoItem.id} onLoadStart={launchAnimations} onEnded={() => { props.onVideoLinkClick(nextVideo) }} controls autoPlay={true} mute="true">
                                    <source src={videoItem.src} type="video/mp4" />
                                    your browser does not support the video tag
                                </video>
                            )
                        })
                    }
                    {showHotspot &&
                        <div className="overlay-link" onClick={showOverlay}>
                            <img src={arrowImg} alt="arrow-right" className="overlay-link-img" />
                            <p className="overlay-link-para">The Neon Program</p>
                        </div>
                    }
                    <div className="overlay-mask"></div>
                    {props.videoDetails.id === 1 && <div className={`hotspot-overlay ` + `${overlayClosed ? 'hide-overlay' : ''}`}>
                        <h3 className="hotspot-overlay-heading">The Neon Program</h3>
                        {/* <img src={closeImg} alt="close" className="hotspot-overlay-close" onClick={hideOverlay} /> */}
                        <div className="hotspot-overlay-container">
                            <img src={neonImg} alt="neon-img" className="hotspot-overlay-img" />
                            <div className="hotspot-overlay-content">
                                <div className="hotspot-overlay-para">
                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</div>
                                <button className="overlay-button" onClick={goToHotspot}>Learn more</button>
                                <button className="overlay-button yellow-btn" onClick={hideOverlay}>Return to video</button>
                            </div>
                        </div>
                    </div>
                    }
                    {showSummary &&
                        <div className={`highlight-overlay ` + `${highlightOverlayClosed ? 'hide-highlight-overlay' : ''}`}>
                            <div className="highlight-button-cont" onClick={toggleHighlightOverlay} >
                                <img src={arrowImg} alt="arrow" className={`highlight-button-img ` + `${highlightOverlayClosed ? 'hide-highlight-button-img' : ''}`} />
                            </div>
                            <div className="highlight-overlay--inner">
                                <h2 className="highlight-overlay--heading">Key Highlights</h2>
                                {/* <img src={closeImg} alt="close" className="hotspot-overlay-close" onClick={hideHighlightOverlay} /> */}
                                <ul className="highlight-list">
                                    <li className="highlight-list--item">
                                        <ul className="ind-highlight-list">
                                            <li className="ind-highlight-list--item section-name">Opportunities</li>
                                            <li className="ind-highlight-list--item">Transparency</li>
                                            <li className="ind-highlight-list--item">Trust</li>
                                            <li className="ind-highlight-list--item">Build confidence</li>
                                            <li className="ind-highlight-list--item">More aligned</li>
                                            <li className="ind-highlight-list--item">Better career path</li>
                                        </ul>
                                    </li>
                                    <li className="highlight-list--item">
                                        <ul className="ind-highlight-list">
                                            <li className="ind-highlight-list--item section-name">Commitments</li>
                                            <li className="ind-highlight-list--item">Shared reward</li>
                                            <li className="ind-highlight-list--item">Enhance learning</li>
                                            <li className="ind-highlight-list--item">Ease mobility</li>
                                            <li className="ind-highlight-list--item">Promote partners earlier</li>
                                        </ul>
                                    </li>
                                    <li className="highlight-list--item">
                                        <ul className="ind-highlight-list">
                                            <li className="ind-highlight-list--item section-name">Neon Program Pillars</li>
                                            <li className="ind-highlight-list--item">Integration: One seamless technology platform</li>
                                            <li className="ind-highlight-list--item">Transformation: Data, Intelligence and Experience</li>
                                        </ul>
                                    </li>
                                    <li className="highlight-list--item">
                                        <ul className="ind-highlight-list">
                                            <li className="ind-highlight-list--item section-name">Advice / recommendations</li>
                                            <li className="ind-highlight-list--item">Connect with clients and teams about the EY Digital Audit technology</li>
                                            <li className="ind-highlight-list--item">Contribute and share your ideas via your Regional Assurance Digital Leader</li>
                                            <li className="ind-highlight-list--item">Use the EY Digital Audit technology and explore new releases</li>
                                        </ul>
                                    </li>
                                </ul>
                                <button className="highlight-overlay--button" onClick={() => {
                                    toggleHighlightOverlay();
                                    props.onVideoLinkClick(nextVideo, 0);
                                    //playNextVideo();
                                }}>Go to {nextVideo.name}</button>
                            </div>
                        </div>
                    }
                </div>
                <div className="row descArea">
                    <p className="tag-cont">Tag</p>
                    <h5 className="video-title">{props.videoDetails.name}</h5>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd</p>
                    {/* <!-- <div className="current">0:00</div>
            <div className="duration">0:00</div> --> */}
                </div>
            </div>
            {
                props.videoDetails.id === 3 && <div className="hotspot-container">
                    <div className="hotspot"></div>
                    <svg viewBox="0 0 600 320" className="svg-1" style={{ fill: 'none', stroke: '#ffe600', strokeWidth: '1' }}>
                        <path d="M109,270 L140,110 L270,110" />
                    </svg>
                    <div className="hotspot-content">
                        <a href="https://www.ey.com/en_gl/ifrs-technical-resources/accounting-reporting-checklists" target="_blank" className="hotspot-link">click to find out more about EY Intelligent Checklists</a>
                    </div>
                </div>
            }
            {/* <div className="lightbox highlights-overlay">
                <h4 className="highlights-heading">Highlights so far</h4>
                <img src={wheel} alt="wheel" className="wheel-img" />
                <div className="highlight-cont highlight-cont--one">
                    <p className="highlight-para">1 - Unlocking more value from the ecosystem</p>
                    <a href="https://bbc.co.uk" className="highlight-link link-one">
                        <span className="highlight-link-span">Explore more</span>
                        <img src={chevron} alt="chevron" className="highlight-arrow-icon" />
                    </a>
                </div>
                <div className="highlight-cont highlight-cont--two">
                    <p className="highlight-para"> 2 - Exploring practical ways to apply data and technology</p>
                    <a href="https://www.ey.com/en_uk" target="_blank" className="highlight-link link-two" rel="noreferrer">
                        <span className="highlight-link-span">Explore more</span>
                        <img src={chevron} alt="chevron" className="highlight-arrow-icon" />
                    </a>
                </div>
                <div className="highlight-cont highlight-cont--three">
                    <p className="highlight-para">3 - Evolution of technology and data</p>
                    <a href="https://bbc.co.uk" className="highlight-link link-three">
                        <span className="highlight-link-span">Explore more</span>
                        <img src={chevron} alt="chevron" className="highlight-arrow-icon" />
                    </a>
                </div>
            </div> */}
        </Fragment >
    );
};


export default Video;