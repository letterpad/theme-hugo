import React, { Component } from "react";
import { graphql } from "react-apollo";
import ArticleListItem from "../components/Post/ArticleListItem";
import appoloClient from "client/apolloClient";
import config from "../../../../config";
import Loader from "../components/Loader";
import { SEARCH_POSTS_BY_TAXONOMY, SEARCH_POSTS } from "shared/queries/Queries";
import Paginate from "../components/Paginate";
import OhSnap from "../components/OhSnap";
import WithResize from "./Hoc/WithResize";

class SearchWrapper extends Component {
    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.addGridOnClient = this.addGridOnClient.bind(this);
        this.state = {
            loading: true,
            posts: [],
            pageNo: {
                category: 1,
                tag: 1,
                post: 1
            },
            total: 0
        };
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData(num = 1) {
        const term = this.props.type;
        const offset = (num - 1) * config.itemsPerPage;
        if (term === "post") {
            let result = await appoloClient.query({
                query: SEARCH_POSTS,
                variables: {
                    query: JSON.stringify({
                        $like: "%" + this.props.match.params.query + "%"
                    }),
                    limit: config.itemsPerPage,
                    offset: offset
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
            let result = await appoloClient.query({
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
            let result = await appoloClient.query({
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
    }
    addGridOnClient(items) {
        if (typeof window !== "undefiend") {
            const StackGrid = require("react-stack-grid").default;
            let windowWidth = this.props.clientWidth;
            let gridWidth = "33.33%";
            if (windowWidth < 900) {
                gridWidth = "50%";
            }
            if (windowWidth < 600) {
                gridWidth = "100%";
            }
            return (
                <StackGrid
                    gridRef={grid => (this.grid = grid)}
                    className="post-grid"
                    columnWidth={gridWidth}
                    gutterWidth={24}
                    gutterHeight={24}
                    enableSSR={true}
                    appearDelay={0}
                >
                    {items}
                </StackGrid>
            );
        }
        return items;
    }
    render() {
        if (this.state.loading) {
            return <Loader />;
        }
        if (this.state.posts.length === 0) {
            return <OhSnap message="The search returned 0 resuts" />;
        }
        const posts = this.state.posts.map((post, i) => (
            <ArticleListItem idx={i} key={i} post={post} displayType />
        ));

        const type = this.props.type;
        return (
            <div>
                <Paginate
                    data={this.addGridOnClient(posts)}
                    count={this.state.total}
                    page={this.state.pageNo[type]}
                    loadMore={this.loadData}
                />
            </div>
        );
    }
}
export default WithResize(SearchWrapper);
