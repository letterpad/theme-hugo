import ArticleListItem from "./Item";
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
  ...rest
}) => {
  const posts = data;

  if (loading) return <Loader />;
  if (!posts) {
    return <OhSnap message={settings.text_notfound.value} />;
  }

  if (posts.rows.length === 0) {
    return <OhSnap message={settings.text_posts_empty.value} />;
  }

  const { banner, site_title, site_description } = settings;
  const bannerAttrs = JSON.parse(banner.value);
  console.log("bannerAttrs :", bannerAttrs);
  return (
    <section className="post-list">
      <HeroImage
        description={site_description.value}
        image={bannerAttrs}
        display={bannerAttrs.src.length > 0}
        siteTitle={site_title.value}
      />
      {(posts.rows as Post[]).map((post, i) => (
        <ArticleListItem key={i} post={post} isStatic={false} />
      ))}

      <Paginate limit={10} count={posts.count} match={router.match} />
    </section>
  );
};

export default Posts;
