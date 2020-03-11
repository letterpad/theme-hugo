import React, { useEffect } from "react";

import styled from "styled-components";

const HeroImage = ({
  image,
  display,
  description,
  siteTitle,
  getImageAttrs,
}) => {
  const { width, height, src } = image;
  if (!display) return null;
  const attrs = getImageAttrs(src, [480, 720, 960, 1200, 1440, 1600, 2000]);

  useEffect(() => {
    //@ts-ignore
    new LazyLoad({
      elements_selector: "img[loading='lazy']",
    });
  }, []);

  return (
    <StyledHero className="hero-banner">
      <img {...attrs} src={attrs.src} width={width} height={height} />
      {siteTitle && <SiteTitle>{siteTitle}</SiteTitle>}
      {description && <SiteDescription>{description}</SiteDescription>}
    </StyledHero>
  );
};

export default HeroImage;

const SiteTitle = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 19px 0px;
  width: 100%;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  font-size: 4rem;
  margin-top: -40px;
`;

const SiteDescription = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 19px 0px;
  width: 100%;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  font-size: 1rem;
  margin-top: 60px;
  overflow: hidden;
  max-width: 70vw;
  background: #00000052;
`;
const StyledHero = styled.div`
  margin: -32px -33px 33px;
  position: relative;
  img {
    height: auto;
    width: 100%;
    max-height: 600px;
  }
  @media screen and (max-width: 800px) {
    display: none;
  }
`;
