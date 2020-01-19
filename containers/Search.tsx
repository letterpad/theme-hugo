import React, { Component } from "react";
import { EventBusInstance } from "../../../../shared/eventBus";
import config from "../../../../config";
import Loader from "../components/Loader";
import { QUERY_POSTS } from "../../../../shared/queries/Queries";
import OhSnap from "../components/OhSnap";
import SearchItem from "../components/SearchItem";
import Pagination from "../styled/Pagination";
import { IThemeComponentProps } from "../../../types";
import {
  PostsQuery,
  PostsQueryVariables,
  Post,
} from "../../../../__generated__/gqlTypes";
import Paginate from "../components/Paginate";

interface ISearchState {
  loading: boolean;
  posts: Post[] | unknown;
  total: number;
  isSearch: boolean;
}

class Search extends Component<IThemeComponentProps, ISearchState> {
  state = {
    loading: false,
    posts: null,
    total: 0,
    isSearch: false,
  };

  getUrlParams = () => {
    return new URLSearchParams(this.props.router.history.location.search);
  };

  componentDidMount() {
    EventBusInstance.on("SEARCH_QUERY", data => {
      if (data.query == "") {
        this.setState({ posts: [], total: 0, isSearch: false });
        return;
      }
      this.loadData();
    });
    const params = this.getUrlParams();
    const query = params.get("query");
    if (query) {
      this.loadData();
    }
  }

  componentWillUnmount() {
    EventBusInstance.unregisterAllCallbacks();
  }

  fetchData = async (filters: PostsQueryVariables["filters"]) => {
    const { client } = this.props;
    const result = await client.query<PostsQuery, PostsQueryVariables>({
      query: QUERY_POSTS,
      variables: {
        filters,
      },
    });
    this.setState({
      loading: false,
      posts: [...result.data.posts.rows] as Post[],
      total: result.data.posts.count,
      isSearch: true,
    });
  };

  loadData = async () => {
    const params = this.getUrlParams();
    if (!params.get("query")) {
      return;
    }
    const query = params.get("query");
    const page = parseInt(params.get("page") || "1");
    const limit = config.itemsPerPage || 6;

    await this.fetchData({ query, page, limit });
  };

  onChangePage = (e, page) => {
    e.preventDefault();
    const query = this.getUrlParams();
    query.set("page", page);
    this.props.router.history.push({
      search: "?" + query.toString(),
    });
    this.loadData();
  };

  render() {
    let { posts, total, loading, isSearch } = this.state;
    if (loading && isSearch) {
      return <Loader />;
    }
    if (!isSearch && !posts) {
      return (
        <div className="post-list">
          <p>Start your search..</p>
        </div>
      );
    }
    if (!posts) {
      return (
        <OhSnap message="We couldn't find anything related to your search" />
      );
    }
    let data: Post[] = [];
    if (((posts as unknown) as Post[]).length > 0) {
      data = (posts as unknown) as Post[];
    }

    if (data && data.length === 0) {
      return (
        <OhSnap message="We couldn't find anything related to your search" />
      );
    }

    const { contentType } = this.props;
    let content: unknown = [];
    if (data.length > 0) {
      content = data.map((post: Post, i: number) => {
        let href = `/${post.type}/${post.slug}`;
        return <SearchItem key={i} post={post} href={href} />;
      });
    }

    const params = this.getUrlParams();
    const page = parseInt(params.get("page") || "1");
    return (
      <section className="post-list">
        {content}
        <Pagination className="pagination-wrapper">
          <Paginate
            count={total}
            limit={6}
            page={page}
            onChangePage={this.onChangePage}
          />
        </Pagination>
      </section>
    );
  }
}
export default Search;
