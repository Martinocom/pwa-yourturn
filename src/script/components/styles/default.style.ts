import { css } from 'lit';

export function defaultStyle() {
    return css`
.card {
    display: flex;
    flex-flow: column;
    border-radius: var(--app-border-radius-big);
    box-shadow: var(--app-shadow);
    min-width: var(--app-min-card-width);
    background: var(--app-color-white);
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

#image {
    min-height: var(--image-height);
    height: var(--image-height);
    max-height: var(--image-height);
    object-fit: cover;
    width: 100%;
    margin: 0;
}


#body {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1.2em;
}

h1 {
    font-size: 1.6em;
    color: var(--app-color-black);
    font-weight: bold;
    margin: 0;
    padding: 0;
}

#photo-details {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    font-size: 0.9em;
    text-align: right;
    color: #444444;
    font-style: italic;
}

#bottom {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.stat {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--app-color-white);
    flex: 1;
    min-height: var(--app-button-height);
    text-align: center;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    min-width: 120px;
}

.clickable {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: var(--app-color-primary);
    flex-grow: 0;
    flex-shrink: 1;
    min-width: 90px;
    width: 90px;
}

.clickable:hover {
    cursor: pointer;
    background: var(--app-color-primary-clicked);
}

#camera {
    width: 32px;
    height: 32px;
}

.red {
    background: var(--app-color-green);
}

.green {
    background: var(--app-color-red);
}

.number {
    font-size: 1.6em;
    font-weight: bold;
}

.name {
    font-size: 1.1em;
    font-variant: small-caps;
}

.date {
    font-size: 0.9em;
    font-variant: small-caps;
    margin-top: 4px;
}
`;
}