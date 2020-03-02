import React from "react";
import styled from "styled-components";

const HeroImage = ({ image, display, description, siteTitle }) => {
  if (!display) return null;
  return (
    <StyledHero className="hero-banner">
      <img width="100%" src={image} />
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
    max-height: 600px;
    object-fit: cover;
  }
  @media screen and (max-width: 800px) {
    display: none;
  }
`;
