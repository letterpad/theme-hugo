import AdjacentPosts from "../components/Post/AdjacentPosts";
import Article from "../components/Post/Article";
import { IThemeContainer } from "../../../types";
import Loader from "../components/Loader";
import OhSnap from "../components/OhSnap";
import React from "react";

const SinglePost: IThemeContainer["Post"] = ({ settings, loading, data }) => {
  const post = data;
  if (loading) return <Loader />;
  if (!post) {
    return (
      <OhSnap message="Sorry, this post does not exist or might be restricted." />
    );
  }

  return (
    <div>
      <Article
        post={post}
        settings={settings}
        adjacentPosts={<AdjacentPosts slug={post.slug} />}
      />
    </div>
  );
};
export default SinglePost;
