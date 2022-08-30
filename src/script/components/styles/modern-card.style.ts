import { css } from 'lit';

const buttonSize = css`2.5em`;
const photoSize = css`1.4em`;

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
    gap: 1em;
    bottom: 1em;
    left: 1em;
}

.badge {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: center;
    color: white;
    border-radius: 0.8em;
    font-size: 0.85em;
    background: #1E2019BB;
}

.badge-icon {
    background: var(--app-color-green);
    border-radius: 0.8em;
    height: 100%;
    text-align: center;
    font-weight: bold;
    color: white;
    padding: 0.4em;
    margin-right: 0.6em;
    width: 2em;
    font-size: 1em;
}

.badge-icon.red {
    background: var(--app-color-red);
}

.badge-content {
    margin-right: 1em;
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

.actions {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    justify-content: flex-end;
}

.action {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    box-sizing: border-box;
    background: var(--app-color-primary);
    max-width: ${buttonSize};
    max-height: ${buttonSize};
    width: ${buttonSize};
    height: ${buttonSize};
}

.action-photo {
    max-width: ${photoSize};
    max-height: ${photoSize};
    width: ${photoSize};
    height: ${photoSize};
}

`

/*
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
    bottom: 1em;
    left: 0.5em;
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

.content-all {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5em;
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

    /*position: absolute;
    bottom: 0em;
    margin: 1em;
    color: white;
    /*border-radius: 0.8em;
    padding: 0.4em 0.8em 0.4em 0.8em;
    background: #1E2019BB;
}

h1 {
    margin: 0;
    padding: 0;
    font-size: 1.4em;
    line-height: 1.4em;
    color: --var(--app-color-black);
}

.badge {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: center;
    color: white;
    border-radius: 0.8em;
    font-size: 0.75em;
    padding: 0.4em 0.8em 0.4em 0.8em;
    background: #1E2019BB;
}

.badge > * {
    text-align: center;
    line-height: 1em;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    font-size: 1em;
}

/*
.badge-number {
    width: 2em;
    background: var(--app-color-primary);
    border-radius: 0.8em;
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
    //border-radius: 0 0.4em 0.4em 0;
    margin-left: -1.5em;
    color: var(--app-color-black);
    //border: 1px solid var(--app-color-primary);
}

.badge-text.red {
    //border: 1px solid var(--app-color-red);
}

.content-counters {
    display: flex;
    flex-flow: row;
    align-items: center;
    margin: 0;
    padding: 0;
    overflow: hidden;
    box-sizing: border-box;
    gap: 1em;
}

.content-counters.centered {
    justify-content: center;
    flex: 1;
}

.content-counters.centered > * {
    flex: 1;

}

.counter-container {
    background: rgb(215 230 238);
    border-radius: 1em;
    padding: 0.8em;
    padding-bottom: 0.6em;
    min-width: 4.5em;
    max-width: 5.5em;
}

.counter-container.red {
    background: rgb(255 206 206);
}

.counter {
    display: flex;
    justify-content: center;
    text-align: center;
}

.counter.text {
    font-size: 0.8em;
    color: var(--app-color-black);
    margin-bottom: 0.2em;
}

.counter.number {
    font-size: 1.3em;
    color: var(--app-color-black);
    font-weight: bold;
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
    width: 4.5em;
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
}*/