import { css } from 'lit';

const buttonSize = css`2.5em`;
const photoSize = css`1.4em`;
const badgeHeight = css`1.7em`;

export function modernCardStyle() {

return css`
.card {
    border-radius: var(--app-border-radius-big);
    box-shadow: var(--app-shadow);
    min-width: var(--app-min-card-width);
    background: var(--card-background);
    overflow: hidden;
    box-sizing: border-box;
    outline: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.image-container {
    position: relative;
    width: 100%;
}

#image {
    z-index: -1;
    object-fit: cover;
    width: 100%;
    max-height: 7em;
    margin: 0;
}

.badge-container {
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
    gap: 1em;
    bottom: 1em;
    left: 1em;
}

.badge {
    color: white;
    border-radius: 0.8em;
    height: ${badgeHeight};
    background: #1E2019BB;
}

.badge-icon, .badge-content {
    height: ${badgeHeight};
    line-height: ${badgeHeight};
    text-align: center;
    color: white;
}

.badge-icon {
    float: left;
    background: var(--app-color-green);
    border-radius: 0.8em;
    font-size: 1em;
    font-weight: bold;
    margin-right: 0.6em;
    width: 2.8em;
}

.badge-icon.red {
    background: var(--app-color-red);
}

.badge-content {
    float: right;
    margin-top: 0.1em;
    margin-right: 1em;
    height: 100%;
    font-size: 0.9em;
}

.content {
    display: flex;
    flex-directon: row;
    margin-top: 0.8em;
    margin-bottom: 1em;
    margin-left: 1.2em;
    margin-right: 1.2em;
    align-content: center;
    align-items: center;
    justify-content: space-between;
}

h1, h2 {
    margin: 0;
    padding: 0;
}

h1 {
    font-size: 1.1em;
    font-weight: 600;
}

h2 {
    font-size: 0.9em;
    font-weight: 300;
}

.action {
    position: relative;
    border-radius: 100%;
    box-sizing: border-box;
    background: var(--app-color-primary);
    max-width: ${buttonSize};
    max-height: ${buttonSize};
    width: ${buttonSize};
    height: ${buttonSize};
}

.action-photo {
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    max-width: ${photoSize};
    max-height: ${photoSize};
    width: ${photoSize};
    height: ${photoSize};
}

`
}