const IconTwitter = require("../../public/images/social/twitter.svg");
const IconFacebook = require("../../public/images/social/facebook.svg");
const IconGithub = require("../../public/images/social/github.svg");
const IconInstagram = require("../../public/images/social/instagram.svg");

import React, { useEffect, useState } from "react";

import { Setting } from "../../../../../__generated__/gqlTypes";

const SocialIcons: React.FC<{ settings: Setting }> = ({ settings }) => {
  const iconMap = {
    social_twitter: IconTwitter.default,
    social_facebook: IconFacebook.default,
    social_github: IconGithub.default,
    social_instagram: IconInstagram.default,
  };

  const [icons, setIcons] = useState<object>({});

  useEffect(() => {
    // since .svg files cannot be loaded on server, useEffect helps to load on client
    setIcons(iconMap);
  }, []);

  const socialIcons = Object.keys(settings)
    // get all the settings with start with "social_"
    .filter(
      setting =>
        setting.indexOf("social_") === 0 && settings[setting].length > 0,
    )
    .map(setting => {
      return (
        <li key={setting} className="social-item">
          <a
            target="_blank"
            rel="noopener"
            href={settings[setting]}
            title={setting}
          >
            <img src={icons[setting]} width="20" height="20" />
          </a>
        </li>
      );
    });
  return <ul className="social-list">{socialIcons}</ul>;
};

export default SocialIcons;
