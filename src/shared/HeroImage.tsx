import React, { useEffect } from "react";

import styled from "styled-components";

const HeroImage = ({ image, display, description, siteTitle }) => {
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

const srcSizes = `(max-width: 720px) 100vw, 720px`;

export const getImageAttrs = (src, sizes) => {
  if (!src) return {};
  const base64Url = makeCloudinaryUrl(src, 30);
  const url = new URL(src);

  if (url.hostname.includes("cloudinary")) {
    const srcSet = sizes.map(w => makeCloudinaryImage(src, w)).join(", ");
    return {
      src: makeCloudinaryUrl(src, sizes[sizes.length - 1]),
      sizes: srcSizes,
      "data-srcset": srcSet,
      srcset: [base64Url],
      width: "100%",
      loading: "lazy",
    };
  }

  if (url.hostname.includes("unsplash")) {
    const base64Url = makeUnsplashUrl(src, 30);
    const srcSet = sizes.map(w => makeUnsplashImage(src, w)).join(", ");
    return {
      src: makeUnsplashUrl(src, sizes[sizes.length - 1]),
      sizes: srcSizes,
      "data-srcset": srcSet,
      srcset: [base64Url],
      width: "100%",
      loading: "lazy",
    };
  }
  return {
    src,
    width: "100%",
    loading: "lazy",
  };
};

export function makeUnsplashImage(src: string, width: number, extras = "") {
  return `${makeUnsplashUrl(src, width, extras)} ${width}w`;
}

export function makeCloudinaryImage(src: string, width: number) {
  return `${makeCloudinaryUrl(src, width)} ${width}w`;
}

export function makeUnsplashUrl(src: string, width: number, extras = "") {
  const url = new URL(src);
  const baseUrl = `${url.protocol}//${url.hostname}${url.pathname}`;
  return `${baseUrl}?w=${width}&auto=format&lossless=true${extras}`;
}

export function makeCloudinaryUrl(src, width) {
  const replace = /image\/upload\/(.*)\/blog-images/;
  const url = src.replace(
    replace,
    `image/upload/q_auto,f_auto,w_${width}/v1/blog-images`,
  );

  return url;
}
