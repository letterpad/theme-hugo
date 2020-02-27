import Article from "../components/Post/Article";
import { IThemeContainer } from "../../../types";
import Loader from "../components/Loader";
import OhSnap from "../components/OhSnap";
import React from "react";

const SinglePage: IThemeContainer["Page"] = ({ settings, loading, data }) => {
  if (loading) return <Loader />;
  if (!data) {
    return (
      <OhSnap message="Sorry, this page does not exist or might be restricted." />
    );
  }
  const post = data;

  return (
    <div>
      <Article post={post} settings={settings} />
    </div>
  );
};
export default SinglePage;
