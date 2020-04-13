import ArticleListItem from "./ArticleListItem";
import HeroImage from "../shared/HeroImage";
import { IThemeContainer } from "../../../../types";
import Loader from "../shared/Loader";
import OhSnap from "../shared/OhSnap";
import Paginate from "../shared/Paginate";
import { Post } from "../../../../../__generated__/gqlTypes";
import React from "react";

const Posts: IThemeContainer["Posts"] = ({
  router,
  settings,
  initialProps,
  loading,
  data,
  helpers,
  ...rest
}) => {
  const posts = data;

  if (loading) return <Loader />;
  if (!posts) {
    return (
      <OhSnap message="Something wrong happened. Please try again later" />
    );
  }

  if (posts.rows.length === 0) {
    return <OhSnap message="No posts found" />;
  }

  const { banner, site_title, site_description } = settings;
  return (
    <section className="post-list">
      <HeroImage
        description={site_description}
        image={banner}
        display={banner.src.length > 0}
        siteTitle={site_title}
        getImageAttrs={helpers.getImageAttrs}
      />
      {(posts.rows as Post[]).map((post, i) => (
        <ArticleListItem
          key={i}
          post={post}
          isStatic={false}
          getImageAttrs={helpers.getImageAttrs}
        />
      ))}

      <Paginate limit={10} count={posts.count} match={router.match} />
    </section>
  );
};

export default Posts;
