import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';



const imgWidth = css`95px`;
const imgHeight = imgWidth;
const nameWidth = css`55px`;
const ballSize = css`14px`;

@customElement('my-activity')
export class MyActivity extends LitElement {

    @property({type: String})
    title: string = 'Title';

    @property({type: String})
    imageBase64: string = 'src';

    @property({type: Array})
    checksMarcin: Date[] = [];

    @property({type: Array})
    checksMarta: Date[]= [];


    private dominantRGB: any;
    private image = new Image()

    nextTurnName: string = ""
    lastCheckDate: string = "";


    constructor() {
        super()
    }

    async firstUpdated() {
        // Set variables
        this.image.src = "data:image/png;base64," + this.imageBase64;
        this.nextTurnName = this.getNextTurnName();
        this.lastCheckDate = this.getLastCheckDate();

        // Set the balls for users
        this.setBalls()

        // Set the dominant color
        this.image.onload= (event) => {
            this.dominantRGB = this.getAverageRGB(this.image);
            this.style.setProperty("--background", this.getBackgroundFromAvg())
            this.style.setProperty("--accent-color", this.getAccentFromAvg())
            this.style.setProperty("--full-color", this.getMainColorFromAvg())
        };

        this.requestUpdate();
    }

    getNextTurnName(): string {
        return "Marta"
    }

    getLastCheckDate(): string {
        return "12/02/2022   17:22"
    }

    setBalls() {

    }
    /*

    getLatestDate(data: Date[]) : Date | null {
        if (data != null && data.length > 0) {
            // convert to timestamp and sort
            var sorted_ms = data.map(e => e.getTime()).sort();
            // take latest
            var latest_ms = sorted_ms[sorted_ms.length-1];
            // convert to js date object
            return new Date(latest_ms);
        }

        return null
    }

    getLastDoneDate(): Date | null {
        // Get who is the last
        var maxMarcinDate = this.getLatestDate(this.checksMarcin)
        var maxMartaDate = this.getLatestDate(this.checksMarta)

        if (maxMarcinDate == null && maxMartaDate == null) {
            // No checks yet
            return null
        }
        else if (maxMarcinDate != null && maxMartaDate == null) {
            // Marta has not done yet
            return maxMartaDate
        }
        else if (maxMarcinDate = null && maxMartaDate != null) {
            // Marcin has not done yet
            return maxMarcinDate
        }
        else if (maxMarcinDate != null && maxMartaDate != null) {
            // Both are done
            if (maxMarcinDate > maxMartaDate) {
                return maxMarcinDate
            }
            else if (maxMarcinDate < maxMartaDate) {
                return maxMartaDate
            }
            else {
                return null
            }
        }

        return null
    }

    getLastDoneUser(): string {
        // Get who is the last
        var maxMarcinDate = this.getLatestDate(this.checksMarcin)
        var maxMartaDate = this.getLatestDate(this.checksMarta)

        if (maxMarcinDate == null && maxMartaDate == null) {
            // No checks yet
            return ""
        }
        else if (maxMarcinDate != null && maxMartaDate == null) {
            // Marta has not done yet
            return "Marta"
        }
        else if (maxMarcinDate = null && maxMartaDate != null) {
            // Marcin has not done yet
            return "Marcin"
        }
        else if (maxMarcinDate != null && maxMartaDate != null) {
            // Both are done
            if (maxMarcinDate > maxMartaDate) {
                return "Marta"
            }
            else if (maxMarcinDate < maxMartaDate) {
                return "Marcin"
            }
            else {
                ""
            }
        }


        return ""
    }

    getNextTurnName(): string {
        if (this.checksMarcin.length > this.checksMarta.length) {
            return "Marta"
        }
        else if (this.checksMarcin.length < this.checksMarta.length) {
            return "Marcin"
        }
        else {
            return "Stocazzo"
        }
    }*/

    private getAverageRGB(imgEl: any) {

        var blockSize = 5, // only visit every 5 pixels
            defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
            canvas = document.createElement('canvas'),
            context = canvas.getContext && canvas.getContext('2d'),
            data, width, height,
            i = -4,
            length,
            rgb = {r:0,g:0,b:0},
            count = 0;

        if (!context) {
            return defaultRGB;
        }

        height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
        width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

        context.drawImage(imgEl, 0, 0);

        try {
            data = context.getImageData(0, 0, width, height);
        } catch(e) {
            /* security error, img on diff domain */alert('x');
            return defaultRGB;
        }

        length = data.data.length;

        while ( (i += blockSize * 4) < length ) {
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i+1];
            rgb.b += data.data[i+2];
        }

        // ~~ used to floor values
        rgb.r = ~~(rgb.r/count);
        rgb.g = ~~(rgb.g/count);
        rgb.b = ~~(rgb.b/count);

        return rgb;
    }

    private getMainColorFromAvg(): string {
        return 'rgba(' + [Math.trunc(this.dominantRGB.r), Math.trunc(this.dominantRGB.g), Math.trunc(this.dominantRGB.b)].join(',') + ', 1)'
    }

    private getBackgroundFromAvg(): string {
        return 'rgba(' + [Math.trunc(this.dominantRGB.r), Math.trunc(this.dominantRGB.g), Math.trunc(this.dominantRGB.b)].join(',') + ', 0.2)'
    }

    private getAccentFromAvg(): string {
        return 'rgba(' + [Math.trunc(this.dominantRGB.r), Math.trunc(this.dominantRGB.g), Math.trunc(this.dominantRGB.b)].join(',') + ', 0.4)'
    }



    static get styles() {
        return css`
            .card {
                display: flex;
                flex-flow: row;
                border-radius: 25px;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
                min-width: 380px;
                max-width: 420px;
                padding: 15px;
                background: var(--background);
            }

            #image {
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                min-with: ${imgWidth};
                width: ${imgWidth};
                max-width: ${imgWidth};
                min-height: ${imgHeight};
                height: ${imgHeight};
                max-height: ${imgHeight};
                border-radius: 10px;
                margin-right: 15px;
            }

            #content {
                margin-top: 2px;
            }

            h1 {
                margin: 0;
                padding: 0;
                font-size: 1.1em;
            }

            #members {
                margin-top: 5px;
            }

            .member {
                margin-top: 3px;
                display: flex;
                flex-flow: row;
            }

            h2 {
                margin: 0px;
                padding: 0px;
                min-width: ${nameWidth};
                font-size: 1em;
                font-weight: normal;
            }

            .balls {
                display: flex;
                flex-flow: row;
            }

            .ball {
                width: ${ballSize};
                height: ${ballSize};
                border-radius: 25px;
                margin-right: 5px;
            }

            .ball.full {
                background: var(--accent-color);
                border: 1px solid var(--full-color);
            }

            .ball.main {
                background: var(--full-color);
                border: 1px solid transparent;
            }

            .ball.empty {
                border: 1px solid var(--full-color);
            }

            #details {
                margin-top: 5px;
                display: flex;
                flex-flow: row;
                flex: 1;
            }

            .detail {
                border-radius: 5px;
                padding: 5px 10px;
                color: white;
                font-size: 0.9em;
                line-height: 0.9em;
            }

            #date {
                background: rgba(0, 0, 0, 0.3);
                margin-right: 5px;
            }

            #next {
                background: rgba(0, 0, 0, 0.45);
            }

            #button {
                display: flex;
                justify-content: flex-end;
                align-items: right;
                flex: 1;
            }

        /*
            #activity-card {
                max-width: 300px;
                min-width: 280px;
                width: 280px;
                margin: 0;
                padding: 0;
            }

            .header-container {
                position: relative;
            }

            .header {
                position: absolute;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                top: 0;
                left: 0;
                width: 100%;
                z-index: 999;
                margin: 0;
                padding: 12px 16px;
                background: rgba(255, 255, 255, 0.8);
                box-sizing: border-box;
            }

            .header .title {
                font-size: 1.1em;
                font-weight: bold;
                color: #333333;
            }

            .header .subtitle {
                font-size: 0.9em;
                font-weight: normal;
                color: #333333;
            }

            .button {
                display: flex;
                justify-content: center;
                width: 58px;
                height: 38px;
                border-radius: 90px;
                background: rgb(66, 135, 245);
                line-height: 38px;
                text-align: center;
            }

            .button:hover {
                background: rgba(66, 135, 245, 0.8);
                cursor: pointer;
            }

            .fill {
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden
            }
            .fill img {
                flex-shrink: 0;
                min-width: 100%;
                min-height: 100%;
                max-height: 200px;
            }

            .content {
                padding: 12px;
            }

            .spaced-table {
                margin-top: 10px;
            }

            .table-column {
                min-width: 70px;
                text-align: right;
                padding-right: 10px;
            }

            .table-full-column {
                width: 100%;
                box-sizing: border-box;
            }

            .dot-container {
                display: flex;
                flex-direction: row;
            }

            .dot {
                width: 12px;
                height: 12px;
                background: rgb(66, 135, 245);
                border-radius: 90px;
                border: 1px solid transparent;
                margin-right: 3px;
                border: 1px solid #333333;
            }

            .dot.empty {
                background: transparent;
            }*/
        `;
      }

    onPhotoClick() {
        console.log("Click!")
    }


    render() {
        return html`
            <div>
                <div id="card" class="card">
                    <div id="image">
                        ${this.image}
                    </div>

                    <div id="content">
                        <h1>${this.title}</h1>

                        <div id="members">
                            <div class="member">
                                <h2>Marcin</h2>
                                <div class="balls">
                                    <div class="ball full"></div>
                                    <div class="ball full"></div>
                                    <div class="ball main"></div>
                                </div>
                            </div>

                            <div class="member">
                                <h2>Marta</h2>
                                <div class="balls">
                                    <div class="ball empty"></div>
                                </div>
                            </div>
                        </div>

                        <div id="details">
                            <div id="date" class="detail">
                                <span>${this.lastCheckDate}</span>
                            </div>

                            <div id="next" class="detail">
                                <span>➥ ${this.nextTurnName}</span>
                            </div>
                        </div>
                    </div>

                    <div id="button">
                        <img src="./assets/icons/camera-64.png">
                    </div>
                </div>

                <!--
                <fluent-card id="activity-card">
                    <div class="header-container">
                        <div class="header">
                            <div>
                                <div class="title">${this.title}</div>
                                <div class="subtitle">➥ ${this.nextTurnName}</div>
                            </div>

                            <div class="button">
                                <div>📷</div>
                            </div>
                        </div>

                        <div class="fill">
                            ${this.image}
                        </div>
                    </div>

                    <div class="content">
                        <table>
                            <tr>
                                <td class="table-column">Marcin</td>
                                <td class="table-full-column">
                                    <div class="dot-container">
                                        <div class="dot"></div>
                                        <div class="dot"></div>
                                        <div class="dot"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="table-column">Marta</td>
                                <td class="table-full-column">
                                    <div class="dot-container">
                                        <div class="dot empty"></div>
                                    </div>
                                </td>
                            </tr>
                        </table>

                        <table class="spaced-table">
                            <tr>
                                <td class="table-column">Ultimo</td>
                                <td class="table-full-column">Marcin <br/><span style="font-size: 0.8em;">30/01/2022 16:40</span></td>
                            </tr>
                            <tr>
                                <td class="table-column">Prossimo</td>
                                <td class="table-full-column">Marta</td>
                            </tr>
                        </table>
                    </div>
                </fluent-card>-->
            </div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "my-activity": MyActivity
    }
}