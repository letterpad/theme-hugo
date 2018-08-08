import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

export default ({ post, href }) => {
    return (
        <article className="post-entry">
            <div className="post-details">
                <header className="post-header">
                    <h3 className="post-title">
                        <Link className="post-link" to={href}>
                            {post.title}
                        </Link>
                    </h3>
                    <p className="post-meta">
                        {moment(new Date(post.published_at)).format("LL")}·{" "}
                    </p>
                </header>
                <p className="post-summary">{post.excerpt}</p>
                <footer className="post-footer">
                    <Link className="read-more" to={href}>
                        Read More →
                    </Link>
                </footer>
            </div>
        </article>
    );
};
