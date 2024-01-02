import React, { Fragment, useState } from "react";

import menuIcon from "../../assets/images/menu.png";
import closeImg from "../../assets/images/close.png";
import '@fortawesome/fontawesome-svg-core/styles.css';

import './Navigation.scss'

const Navigation = props => {
    
    const [navClosed, setNavClosed] = useState(true);
    const videoArr = props.videoArr;
    //console.log('videoArr', videoArr);
    
    const showNav = () => {
        setNavClosed(false);
    };

    const closeNav = () => {
        setNavClosed(true);
    };

    return (
        <Fragment>
            <img src={menuIcon} onClick={showNav} alt="arrow-circle" className={`menu-icon ` + `${navClosed ? '' : 'hide-menu'}`} />
            <div className={`nav-container ` + `${navClosed ? 'close-nav' : ''}`}>
                <div className="nav-top-cont">
                    <h3 className="nav-heading">Navigate to... </h3>
                    <div onClick={closeNav} className="nav-close-btn">
                        <img src={closeImg} alt="close" />
                    </div>
                </div>
                <ul className="nav-list">
                    {videoArr.map((video, index) => { return (
                        <li key={index} className="nav-list--item">
                            <ul className="hotspot-list">
                                <li className="hotspot-list--item section-name" onClick={()=>{
                                    props.onVideoLinkClick(video, 0);
                                    closeNav();
                                    }}>{video.Title}</li>
                                {video.hotSpotArr.map((hotspot, hotspotIndex) => { return(
                                    <li key={hotspotIndex} className="hotspot-list--item" onClick={() =>{
                                        props.onHotSpotClick(video, hotspot);
                                        closeNav();
                                    }}>{hotspot.name}</li>
                                )})}
                            </ul>
                        </li>
                    )})
                    }
                </ul>
            </div>
        </Fragment>
    )
};

export default Navigation;