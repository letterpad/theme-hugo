import React, { Component } from "react";
import { EventBusInstance } from "shared/eventBus";
import ArticleListItem from "../components/Post/ArticleListItem";
import appoloClient from "shared/apolloClient";
import config from "../../../../config";
import Loader from "../components/Loader";
import {
    SEARCH_POSTS_BY_TAXONOMY,
    SEARCH_POSTS_FUZY
} from "shared/queries/Queries";
import Paginate from "../components/Paginate";
import OhSnap from "../components/OhSnap";
import WithResize from "./Hoc/WithResize";

class SearchWrapper extends Component {
    state = {
        loading: true,
        posts: [],
        pageNo: {
            category: 1,
            tag: 1,
            post: 1
        },
        total: 0,
        isSearch: false
    };

    componentDidMount() {
        let { type } = this.props;
        let query = this.props.match.params.query;
        EventBusInstance.on("SEARCH_QUERY", data => {
            if (data.query == "") {
                this.setState({ posts: [], total: 0, isSearch: false });
                return;
            }
            this.loadData(data);
        });
        this.loadData({ type, query });
    }

    loadData = async ({ term, query }) => {
        const offset = (num - 1) * config.itemsPerPage;
        if (term === "post") {
            let result = await appoloClient().query({
                query: SEARCH_POSTS_FUZY,
                variables: {
                    query: query
                }
            });
            this.setState({
                loading: false,
                posts: [...this.state.posts, ...result.data.posts.rows],
                total: result.data.posts.count,
                pageNo: {
                    ...this.state.pageNo,
                    post: num
                }
            });
        } else if (term === "category") {
            let result = await appoloClient().query({
                query: SEARCH_POSTS_BY_TAXONOMY,
                variables: {
                    type: "post_category",
                    slug: this.props.match.params.query,
                    postType: "post",
                    limit: config.itemsPerPage,
                    offset: offset
                }
            });
            this.setState({
                loading: false,
                posts: [
                    ...this.state.posts,
                    ...result.data.postsByTaxSlug.posts
                ],
                total: result.data.postsByTaxSlug.count,
                pageNo: {
                    ...this.state.pageNo,
                    category: num
                }
            });
        } else if (term === "tag") {
            let result = await appoloClient().query({
                query: SEARCH_POSTS_BY_TAXONOMY,
                variables: {
                    type: "post_tag",
                    query: this.props.match.params.query,
                    postType: "post",
                    limit: config.itemsPerPage,
                    offset: offset
                }
            });
            this.setState({
                loading: false,
                posts: result.data.postsByTaxSlug.posts,
                total: result.data.postsByTaxSlug.count,
                pageNo: {
                    ...this.state.pageNo,
                    tag: num
                }
            });
        }
    };

    render() {
        if (this.state.loading && this.state.isSearch) {
            return <Loader />;
        }

        if (!this.state.isSearch) {
            return (
                <div className="post-row p-t-30 card content">
                    Start your search...
                </div>
            );
        }
        if (posts.length === 0) {
            return (
                <OhSnap message="We couldn't find anything related to your search" />
            );
        }
        const posts = this.state.posts.map((post, i) => (
            <ArticleListItem idx={i} key={i} post={post} displayType />
        ));

        return (
            <section className="main post-list">
                {posts}
                <Paginate count={this.props.total} page={this.page} />
            </section>
        );
    }
}
export default WithResize(SearchWrapper);
