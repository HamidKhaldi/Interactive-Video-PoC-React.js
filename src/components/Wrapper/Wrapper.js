import React from "react";
import ErrorBoundary from "../ErrorBoundary";
import "../../assets/scss/style.scss"

const Wrapper = props => {
    return (
        <ErrorBoundary>
            <div className="pocWrapper">{props.children}</div>
        </ErrorBoundary>
    )
};

export default Wrapper;