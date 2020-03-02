import { EnumContentType, IThemeContainer } from "../../../../types";

import Page from "../page";
import Posts from "../posts";
import React from "react";

const Home: IThemeContainer["Home"] = props => {
  if (props.contentType === EnumContentType.POSTS) {
    return <Posts {...props} />;
  }
  return <Page {...props} />;
};

export default Home;
