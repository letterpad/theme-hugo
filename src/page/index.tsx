import Article from "../shared/article";
import HeroImage from "../shared/HeroImage";
import { IThemeContainer } from "../../../../types";
import Loader from "../shared/Loader";
import OhSnap from "../shared/OhSnap";
import React from "react";

const Page: IThemeContainer["Page"] = ({ settings, loading, data }) => {
  const page = data;
  if (loading) return <Loader />;
  if (!page) {
    return (
      <OhSnap message="Sorry, this page does not exist or might be restricted." />
    );
  }

  return (
    <div>
      <section className="page-detail">
        <HeroImage
          image={page.cover_image}
          display={page.cover_image.src.length > 0}
          description=""
          siteTitle=""
        />
        <Article
          post={page}
          displayAuthor={false}
          settings={settings}
          displayComments={false}
        />
      </section>
    </div>
  );
};
export default Page;
