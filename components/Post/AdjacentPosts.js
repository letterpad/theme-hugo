import React from "react";
import { Link } from "react-router-dom";
import AdjacentPostsData from "shared/data-connectors/AdjacentPostsData";
import PropTypes from "prop-types";

const Post = ({ post, label, direction }) => {
    return (
        <Link
            to={"/post/" + post.slug}
            className={"adjacent-post-item " + direction}
        >
            <label>
                {direction == "next" && label + " →"}
                {direction == "previous" && "← " + label}
            </label>
        </Link>
    );
};

const AdjacentPosts = ({ adjacentPosts }) => {
    if (!adjacentPosts) return <div />;
    let prev = adjacentPosts.previous ? (
        <Post
            direction="previous"
            post={adjacentPosts.previous}
            label="Previous"
        />
    ) : (
        ""
    );
    let next = adjacentPosts.next ? (
        <Post direction="next" post={adjacentPosts.next} label="Next" />
    ) : (
        ""
    );
    return (
        <div className="adjacent-posts">
            {prev}
            {next}
        </div>
    );
};

AdjacentPosts.propTypes = {
    adjacentPosts: PropTypes.object
};

export default AdjacentPostsData(AdjacentPosts);
