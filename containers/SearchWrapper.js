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
import Paginate from "client/helpers/Paginate";
import OhSnap from "../components/OhSnap";
import SearchItem from "../components/SearchItem";
import Pagination from "../styled/Pagination";

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
        EventBusInstance.on("SEARCH_QUERY", data => {
            if (data.query == "") {
                this.setState({ posts: [], total: 0, isSearch: false });
                return;
            }
            this.loadData(data);
        });
        this.loadData({
            type: this.props.type,
            query: this.props.match.params.query
        });
        document.body.classList.add("posts", "search-page");
    }
    componentWillUnmount() {
        EventBusInstance.unregisterAllCallbacks();
        document.body.classList.remove("posts", "posts-page");
    }
    loadData = async ({ type, query }) => {
        if (!query) return;
        let num = this.props.match.params.page_no || 1;
        const offset = (num - 1) * config.itemsPerPage;
        if (type === "post") {
            let result = await appoloClient().query({
                query: SEARCH_POSTS_FUZY,
                variables: {
                    query: query
                }
            });
            this.setState({
                loading: false,
                posts: [...result.data.search.posts],
                total: result.data.search.count,
                pageNo: {
                    ...this.state.pageNo,
                    post: num
                },
                isSearch: true
            });
        } else if (type === "category") {
            let result = await appoloClient().query({
                query: SEARCH_POSTS_BY_TAXONOMY,
                variables: {
                    type: "post_category",
                    slug: query,
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
                },
                isSearch: false
            });
        } else if (type === "tag") {
            let result = await appoloClient().query({
                query: SEARCH_POSTS_BY_TAXONOMY,
                variables: {
                    type: "post_tag",
                    slug: query,
                    postType: "post",
                    limit: config.itemsPerPage,
                    offset: offset
                }
            });
            this.setState({
                loading: false,
                posts: [...result.data.postsByTaxSlug.posts],
                total: result.data.postsByTaxSlug.count,
                pageNo: {
                    ...this.state.pageNo,
                    tag: num
                },
                isSearch: false
            });
        }
    };

    render() {
        if (this.state.loading && this.state.isSearch) {
            return <Loader />;
        }

        const posts = this.state.posts.map((post, i) => {
            let href = `/${post.type}/${post.slug}`;
            return <SearchItem key={i} post={post} href={href} />;
        });

        if (!this.state.isSearch && posts.length === 0) {
            return (
                <div className="post-list">
                    <p>Start your search..</p>
                </div>
            );
        }
        if (posts.length === 0) {
            return (
                <OhSnap message="We couldn't find anything related to your search" />
            );
        }
        const { type } = this.props;
        return (
            <section className="post-list">
                {posts}
                <Pagination className="pagination-wrapper">
                    <Paginate
                        count={this.state.total}
                        page={this.state.pageNo[type]}
                        match={this.props.match}
                    />
                </Pagination>
            </section>
        );
    }
}
export default SearchWrapper;
