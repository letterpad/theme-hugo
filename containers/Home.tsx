import { EnumContentType, IThemeContainer } from "../../../types";

import Posts from "./Posts";
import React from "react";
import SinglePage from "./SinglePage";

const Home: IThemeContainer = props => {
  if (props.contentType === EnumContentType.POSTS) {
    return <Posts {...props} />;
  }
  return <SinglePage {...props} />;
};

export default Home;
