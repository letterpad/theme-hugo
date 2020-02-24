import Home from "./containers/Home";
import Layout from "./containers/Layout";
import NotFound from "./containers/NotFound";
import Posts from "./containers/Posts";
import Search from "./containers/Search";
// import SinglePage from "./containers/SinglePage";
import SinglePost from "./containers/SinglePost";

export default {
  SinglePage: import("./containers/SinglePage"),
  Home: Home,
  Layout: Layout,
  Posts: Posts,
  NotFound: NotFound,
  SinglePost: SinglePost,
  Search: Search,
};
