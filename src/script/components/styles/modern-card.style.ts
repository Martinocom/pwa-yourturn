import { css } from 'lit';

export function modernCardStyle() {
    return css`
.card {
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
    gap: 0.5em;
    top: 0.5em;
    right: 0.5em;
}

.content {
    display: flex;
    flex-direction: row;
    padding: 0.9em 1em;
    justify-content: center;
    align-items: center;
    align-content: center;
}

.content-details {
    flex-grow: 1;
}

.content-badge-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    gap: 0.5em;
    margin-top: 0.3em;
}

.content-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-content: center;
}

h1 {
    margin: 0;
    padding: 0;
    font-size: 1.2em;
    line-height: 1.2em;
    color: --var(--app-color-black);
}

.badge {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: center;
    color: white;
    border-radius: 2em;
    font-size: 0.75em;
    padding: 0.4em 0.8em 0.4em 0.8em;
    background: #1E201999;
}

.badge > * {
    text-align: center;
    line-height: 1em;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    font-size: 1em;
}

.badge-number {
    width: 3em;
    background: var(--app-color-primary);
    border-radius: 2em;
    border: 1px solid var(--app-color-primary);
    z-index: 5;
}

.badge-number.red {
    background: var(--app-color-red);
    border: 1px solid var(--app-color-red);
}

.badge-text {
    z-index: 1;
    line-height: 1em;
    font-size: 1em;
    padding-left: 2em;
    padding-right: 1.6em;
    border-radius: 0 2em 2em 0;
    margin-left: -1em;
    color: var(--app-color-black);
    border: 1px solid var(--app-color-primary);
}

.badge-text.red {
    border: 1px solid var(--app-color-red);
}

.content-badge-container .badge {
    background: transparent;
    margin: 0;
    padding: 0;
    overflow: hidden;
    box-sizing: border-box;
}

.clickable {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: var(--app-color-primary);
    flex-grow: 0;
    border-radius: 2em;
    width: 5em;
    height: 1.5em;
}

.clickable.big {
    border-radius: 100%;
    width: 2.8em;
    height: 2.8em;
}

.hidden {
    display: none;
}

.camera {
    transform: scale(0.55);
}
`
}