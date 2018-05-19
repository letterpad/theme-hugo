import React from "react";

const OhSnap = ({ message }) => {
    return (
        <section className="main post-detail">
            <header className="post-header">
                <h3 className="module-title">Oh Snap!</h3>
                <div className="module-subtitle">{message}</div>
            </header>
        </section>
    );
};

export default OhSnap;
