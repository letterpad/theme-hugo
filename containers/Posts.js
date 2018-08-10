import React, { Component } from "react";
import ArticleListItem from "../components/Post/ArticleListItem";
import Loader from "../components/Loader";
import config from "../../../../config";
import Paginate from "../components/Paginate";
import OhSnap from "../components/OhSnap";
import PostsData from "shared/data-connectors/PostsData";
import Pagination from "../styled/Pagination";
import HeroImage from "../components/HeroImage";

class Posts extends Component {
    componentDidMount() {
        document.body.classList.add("posts-page");
    }

    componentWillUnmount() {
        document.body.classList.remove("posts-page");
    }

    render() {
        if (this.props.loading) {
            return <Loader />;
        }
        if (!this.props.posts) {
            return (
                <OhSnap message={this.props.settings.search_notFound.value} />
            );
        }
        if (this.props.posts.length === 0) {
            return (
                <OhSnap message={this.props.settings.text_posts_empty.value} />
            );
        }
        const articles = this.props.posts.map((post, i) => {
            return <ArticleListItem key={i} post={post} />;
        });

        return (
            <section className="post-list">
                <HeroImage
                    image={config.baseName + this.props.settings.banner.value}
                    display={this.props.settings.banner.value.length > 0}
                />
                {articles}
                <Pagination className="pagination-wrapper">
                    <Paginate
                        count={this.props.total}
                        match={this.props.match}
                    />
                </Pagination>
            </section>
        );
    }
}

export default PostsData(Posts);
