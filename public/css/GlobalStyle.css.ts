import { createGlobalStyle } from "styled-components";
export const HugoBaseCss = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Yrsa&display=swap');

    html {
        font-size: 16px;
        line-height: 1.618;
        font-family: 'Yrsa', serif;
        @media(max-width: 991px) {
            font-size: 14px;
            line-height: 1.4;
        }
        @media(max-width: 767px) {
            font-size: 14px;
            line-height: 1.4;
        }
        
    }

    body {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -moz-font-feature-settings: "liga" on;
    -webkit-tap-highlight-color: transparent;
    -webkit-overflow-scrolling: touch;
    }

    input:focus {
    outline: none;
    }
    .menu-toggle {
    display: none;
    border: none;
    outline: none;
    width: 2rem;
    height: 2rem;
    font-size: 1.5rem;
    background-color: transparent;
    transition: all ease-out 0.5s;

    @media screen and (max-width: 800px) {
        position: absolute;
        top: 1rem;
        right: 1rem;
        display: block;
    }
    }

    .post-detail {
    display: flex;
    flex-direction: column;

    .post-footer {
        margin: 2rem 0;
        line-height: 1.8;
        .post-tags {
        margin-top: 0;
        margin-bottom: 1rem;
        padding-left: 0;
        li {
            display: inline-block;
            margin-bottom: 0.5rem;
            border-radius: 3px;
            padding: 5px 10px;
            background: #f4f3f1;
            font-size: 0.8rem;
            + li {
            margin-left: 0.5rem;
            }
        }
        }
        .post-copyright {
        color: #4a4a4a;
        margin-top: 1rem;
        margin-bottom: 0;
        border-radius: 3px;
        font-size: 0.9rem;
        opacity: 0.5;
        &:hover,
        a {
            opacity: 1;
        }
        strong {
            color: #363636;
        }
        }
    }
    #cyReward > #cy-reward-click {
        display: block;
        margin: 3rem auto;
    }
    #SOHUCS {
        margin: 2rem auto;
        .invalidity {
        box-sizing: border-box;
        }
    }
    #disqus_thread {
        margin: 2rem auto;
    }
    }

    .offscreen {
    position: absolute;
    left: -1024rem;
    }

    .block-404 {
    display: flex;
    flex-direction: column;
    margin-bottom: 80px;
    .error-block {
        text-align: center;
        h1 {
        font-size: 10rem;
        margin: 0px;
        margin-bottom: 20px;
        }
        h3 {
        text-transform: uppercase;
        margin-bottom: 10px;
        font-weight: 800;
        }
        .error-message {
        font-size: 13px;
        color: #9f9f9f;
        }
        a {
        text-transform: uppercase;
        font-size: 16px;
        color: #000;
        font-weight: bold;
        }
        .go-home {
        margin-top: 40px;
        }
    }
    .image-404 {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 45px;
        margin-left: 50px;
        img {
        max-width: 280px;
        max-height: 280px;
        }
    }
    }

    @media (min-width: 800px) {
    .block-404 {
        width: 800px;
        margin: auto;
    }
    }

    @media (max-width: 800px) {
    .image-404 {
        display: none !important;
    }
    }

    #disqus_thread_parent {
    width: 100%;
    }

`;
export const Fonts = createGlobalStyle`
    

`;

export const CssVariables = createGlobalStyle`
    html {
        --color-text-primary-invert: #b7b7b7;
        --color-text-primary-light: #616161;
        --color-text-muted: rgb(185, 185, 185);
        --color-text-secondary: #000000;
        --color-text-secondary-light: #4c4c4c;

        --color-bg-primary: #27282f;
        --color-bg-secondary: #1f2129;
        --link-hover: #1a82d6;
        --color-bg-content: #fefefe;
        /*change above*/
        --fs-small: 12px;
        --fs-normal: 14px;
        --fs-medium: 16px;
        --fs-large: 18px;

        --bg-sections: #fff;
        --bg-base: #f7f7f7;
        --color-border: #e6e6e6;

        --color-base: #3d3d3d;
        --color-text-1: #595959;
        --color-text-2: #434141;
        --color-text-3: #7b7b7b;
        --color-muted: #a8a8a8;

        --color-accent: 20, 181, 239;

        --bg-primary: transparent;
        --color-primary: #333;
        --bg-hover-primary: transparent;
        --color-hover-primary: #111;

        --bg-success: #4caf50;
        --color-success: #e8f5e9;
        --bg-hover-success: #43a047;
        --color-hover-success: #fff;

        --bg-danger: #e64a19;
        --color-danger: #fbe9e7;
        --bg-hover-danger: #d84315;
        --color-hover-danger: #fff;

        --base-shade-9: #212121;
        --base-shade-8: #424242;
        --base-shade-7: #616161;
        --base-shade-6: #757575;
        --base-shade-5: #8e8e8e;
        --base-shade-4: #8e8e8e;
        --base-shade-3: #8e8e8e;
        --base-shade-2: #eeeeee;
        --base-shade-1: #f5f5f5;

        --box-shadow: 0 2px 6px rgba(150, 150, 150, 0.26),
            0 0px 6px rgba(210, 210, 210, 0.23);

        --box-shadow-inset: inset -1px 3px 9px -3px rgba(0, 0, 0, 0.32);
    }

`;

export const NormalizeCss = createGlobalStyle`
    /*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */
    html {
        line-height: 1.15;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
    }
    body {
        margin: 0;
    }
    article,
    aside,
    footer,
    header,
    nav,
    section {
        display: block;
    }
    h1 {
        font-size: 2em;
        margin: 0.67em 0;
    }
    h1, h2, h3, h4, h5, h6 {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", "Helvetica Neue", sans-serif;
    }
    figcaption,
    figure,
    main {
        display: block;
    }
    figure {
        margin: 1em 40px;
    }
    hr {
        box-sizing: content-box;
        height: 0;
        overflow: visible;
    }
    pre {
        font-family: monospace;
        font-size: 1em;
    }
    a {
        background-color: transparent;
        -webkit-text-decoration-skip: objects;
    }
    abbr[title] {
        border-bottom: none;
        text-decoration: underline;
        text-decoration: underline dotted;
    }
    b,
    strong {
        font-weight: inherit;
    }
    b,
    strong {
        font-weight: bolder;
    }
    dfn {
        font-style: italic;
    }
    mark {
        background-color: #ff0;
        color: #000;
    }
    small {
        font-size: 80%;
    }
    sub,
    sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
    }
    sub {
        bottom: -0.25em;
    }
    sup {
        top: -0.5em;
    }
    audio,
    video {
        display: inline-block;
    }
    audio:not([controls]) {
        display: none;
        height: 0;
    }
    img {
        border-style: none;
    }
    svg:not(:root) {
        overflow: hidden;
    }
    button,
    input,
    optgroup,
    select,
    textarea {
        font-family: sans-serif;
        font-size: 100%;
        line-height: 1.15;
        margin: 0;
    }
    button,
    input {
        overflow: visible;
    }
    button,
    select {
        text-transform: none;
    }
    button,
    html [type="button"],
    [type="reset"],
    [type="submit"] {
        -webkit-appearance: button;
    }
    button::-moz-focus-inner,
    [type="button"]::-moz-focus-inner,
    [type="reset"]::-moz-focus-inner,
    [type="submit"]::-moz-focus-inner {
        border-style: none;
        padding: 0;
    }
    button:-moz-focusring,
    [type="button"]:-moz-focusring,
    [type="reset"]:-moz-focusring,
    [type="submit"]:-moz-focusring {
        outline: 1px dotted ButtonText;
    }
    fieldset {
        padding: 0.35em 0.75em 0.625em;
    }
    legend {
        box-sizing: border-box;
        color: inherit;
        display: table;
        max-width: 100%;
        padding: 0;
        white-space: normal;
    }
    progress {
        display: inline-block;
        vertical-align: baseline;
    }
    textarea {
        overflow: auto;
    }
    [type="checkbox"],
    [type="radio"] {
        box-sizing: border-box;
        padding: 0;
    }
    [type="number"]::-webkit-inner-spin-button,
    [type="number"]::-webkit-outer-spin-button {
        height: auto;
    }
    [type="search"] {
        -webkit-appearance: textfield;
        outline-offset: -2px;
    }
    [type="search"]::-webkit-search-cancel-button,
    [type="search"]::-webkit-search-decoration {
        -webkit-appearance: none;
    }
    ::-webkit-file-upload-button {
        -webkit-appearance: button;
        font: inherit;
    }
    details,
    menu {
        display: block;
    }
    summary {
        display: list-item;
    }
    canvas {
        display: inline-block;
    }
    template {
        display: none;
    }
    [hidden] {
        display: none;
    }

`;
