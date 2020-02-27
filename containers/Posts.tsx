import ArticleListItem from "../components/Post/ArticleListItem";
import HeroImage from "../components/HeroImage";
import { IThemeContainer } from "../../../types";
import Loader from "../components/Loader";
import OhSnap from "../components/OhSnap";
import Paginate from "../components/Paginate";
import Pagination from "../styled/Pagination";
import { Post } from "../../../../__generated__/gqlTypes";
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

  return (
    <section className="post-list">
      <HeroImage
        description={site_description.value}
        image={banner.value}
        display={banner.value.length > 0}
        siteTitle={site_title.value}
      />

      {(posts.rows as Post[]).map((post, i) => (
        <ArticleListItem key={i} post={post} isStatic={false} />
      ))}

      <Pagination className="pagination-wrapper">
        <Paginate limit={10} count={posts.count} match={router.match} />
      </Pagination>
    </section>
  );
};

export default Posts;
