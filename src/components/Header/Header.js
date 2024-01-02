import React from "react";

import '../../assets/scss/_components/_header.scss';
import eyLogo from "../../assets/images/ey-logo.png";
import menuIcon from "../../assets/images/menu.png";

const Header = props => {
    return <header>
        <img src={eyLogo} alt="EY logo" className="ey-logo" />
        <img src={menuIcon} alt="menu icon" className="menu-icon" />
    </header>
};

export default Header;
