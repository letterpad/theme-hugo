import React, { Component } from "react";
import Article from "../components/Post/Article";
import Loader from "../components/Loader";
import SEO from "../components/SEO";
import PropTypes from "prop-types";
import OhSnap from "../components/OhSnap";
import AdjacentPostsData from "shared/data-connectors/AdjacentPostsData";
import SinglePostData from "shared/data-connectors/SinglePostData";
import moment from "moment";
import AdjacentPosts from "../components/Post/AdjacentPosts";

class SinglePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.loading && !nextProps.loading && nextProps.post) {
            this.setState({ loading: false });
            this.props.setHeroDetails({
                image: nextProps.post.cover_image,
                title: nextProps.post.title,
                subTitle: moment(new Date(nextProps.post.created_at)).format(
                    "LL"
                )
            });
        }
    }
    render() {
        if (this.props.loading || this.props.adjPostsLoading) {
            return <Loader />;
        }
        if (this.props.post === null) {
            return (
                <OhSnap message="Sorry, this page does not exist or might be restricted." />
            );
        }

        return (
            <div>
                <SEO
                    schema="BlogPosting"
                    title={this.props.post.title}
                    description={this.props.post.excerpt}
                    path={this.props.location.pathname}
                    contentType="article"
                    category={categories.join(",")}
                    tags={tags}
                    image={this.props.post.cover_image}
                    settings={this.props.settings || {}}
                />
                <Article
                    post={this.props.post}
                    settings={this.props.settings}
                    adjacentPosts={
                        <AdjacentPosts slug={this.props.post.slug} />
                    }
                />
            </div>
        );
    }
}

SinglePost.propTypes = {
    post: PropTypes.object,
    adjacentPosts: PropTypes.object,
    location: PropTypes.object,
    settings: PropTypes.settings,
    adjPostsLoading: PropTypes.bool,
    loading: PropTypes.bool,
    setHeroDetails: PropTypes.func
};
export default AdjacentPostsData(SinglePostData(SinglePost));
