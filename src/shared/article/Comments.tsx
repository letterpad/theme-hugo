import Disqus from "disqus-react";
import React from "react";

const Comments = ({ disqusShortname, disqusConfig }) => {
  if (!disqusShortname) return null;
  return (
    <div id="disqus_thread_parent">
      <Disqus.DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  );
};

export default Comments;
