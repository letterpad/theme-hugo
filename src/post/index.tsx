// import AdjacentPosts from "../../components/Post/AdjacentPosts";
import Article from "../shared/article";
import HeroImage from "../shared/HeroImage";
import { IThemeContainer } from "../../../../types";
import Loader from "../shared/Loader";
import OhSnap from "../shared/OhSnap";
import React from "react";

const Post: IThemeContainer["Post"] = ({ settings, loading, data }) => {
  const post = data;
  if (loading) return <Loader />;
  if (!post) {
    return (
      <OhSnap message="Sorry, this post does not exist or might be restricted." />
    );
  }
  const displayAuthor = JSON.parse(settings.displayAuthorInfo.value); // convert "true" to true

  return (
    <div>
      <section className="post-detail">
        <HeroImage
          image={post.cover_image}
          display={post.cover_image.length > 0}
          description=""
          siteTitle=""
        />
        <Article
          post={post}
          displayAuthor={displayAuthor}
          settings={settings}
          displayComments={true}
        />
      </section>
    </div>
  );
};
export default Post;
