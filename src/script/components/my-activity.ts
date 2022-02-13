import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

const imgWidth = css`95px`;
const imgHeight = imgWidth;
const nameWidth = css`55px`;
const ballSize = css`14px`;
const cameraSize = css`20px`;


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
    private filePicker: HTMLInputElement | null | undefined = null;
    private marcinBalls: Element | null | undefined = null;
    private martaBalls: Element | null | undefined = null;

    checksMarcinBall: any[] = []
    checksMartaBall: any[] = []

    nextTurnName: string = ""
    lastCheckDate: any = {}


    constructor() {
        super()
    }

    async firstUpdated() {
        // Set variables
        this.image.id = "photo";
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

        // Ordering all dates
        if (this.checksMarcin != null && this.checksMarcin != undefined) this.checksMarcin = this.checksMarcin.sort()
        if (this.checksMarta != null && this.checksMarta != undefined) this.checksMarta = this.checksMarta.sort()

        // Set the reference to balls container
        this.marcinBalls = this.shadowRoot?.querySelector('#marcin-balls');
        this.martaBalls = this.shadowRoot?.querySelector('#marta-balls');

        this.requestUpdate();
    }

    getNextTurnName(): string {
        if (this.checksMarcin.length > this.checksMarta.length) {
            return "Marta"
        }
        if (this.checksMarcin.length < this.checksMarta.length) {
            return "Marcin"
        }
        if (this.checksMarcin.length == 0) {
            return "Marcin"
        }
        if (this.checksMarta.length == 0) {
            return "Marta"
        }

        return "Sto cazzo"
    }

    getLastCheckDate(): any {
        var maxDateMarcin = null;
        var maxDateMarta = null;

        if (this.checksMarcin != null && this.checksMarcin.length > 0) {
            maxDateMarcin = this.checksMarcin[this.checksMarcin.length-1];
        }
        if (this.checksMarta != null && this.checksMarta.length > 0) {
            maxDateMarta = this.checksMarta[this.checksMarta.length-1];
        }

        if (maxDateMarcin != null && maxDateMarta != null) {
            if (maxDateMarcin >= maxDateMarta) {
                return {
                    date: maxDateMarcin,
                    who: "Marcin"
                }
            } else {
                return {
                    date: maxDateMarta,
                    who: "Marta"
                }
            }
        } else {
            if (maxDateMarcin != null) {
                return {
                    date: maxDateMarcin,
                    who: "Marcin"
                }
            } else if (maxDateMarta != null) {
                return {
                    date: maxDateMarta,
                    who: "Marcin"
                }
            } else {
                return {
                    date: null,
                    who: null
                }
            }
        }
    }

    setBalls() {
        this.checksMarcin.forEach(check => {
            if (check == this.lastCheckDate.date) {
                this.checksMarcinBall.push({
                    type: "main",
                    date: check
                })
            } else {
                this.checksMarcinBall.push({
                    type: "full",
                    date: check
                })
            }
        })

        this.checksMarta.forEach(check => {
            if (check == this.lastCheckDate.date) {
                this.checksMartaBall.push({
                    type: "main",
                    date: check
                })
            } else {
                this.checksMartaBall.push({
                    type: "full",
                    date: check
                })
            }
        })

        if (this.nextTurnName == "Marta") {
            this.checksMartaBall.push({
                type: "empty",
                date: null
            })
        } else {
            this.checksMarcinBall.push({
                type: "empty",
                date: null
            })
        }
    }

    async onFileChoosen() {
        await this.upload();
    }

    private upload(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {

            if (!this.filePicker || !this.filePicker.files || this.filePicker.files.length <= 0) {
                reject('No file selected.');
                return;
            }
            const myFile = this.filePicker.files[0];
            console.log(myFile);

            resolve();
        });
    }

    private timeConverter(timestamp: any){
        if (timestamp != null && timestamp != undefined) {
            var a = new Date(timestamp.seconds * 1000)
            var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
            var year = a.getFullYear()
            var month = months[a.getMonth()]
            var date = a.getDate()
            var hour = a.getHours()
            var min = a.getMinutes()

            var realDay = date.toString().length == 1 ? "0" + date.toString() : date.toString();
            var realHour = hour.toString().length == 1 ? "0" + hour.toString() : hour.toString();
            var realMin = min.toString().length == 1 ? "0" + min.toString() : min.toString();

            var time = realDay + '/' + month + '/' + year + '   ' + realHour + ':' + realMin
            return time
        } else {
            return "You suck"
        }
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
                box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 2px 5px 0 rgba(0, 0, 0, 0.19);
                /*min-width: 350px;
                max-width: 350px;*/
                padding: 15px;
                background: var(--background);
            }

            #image-button {
                margin-right: 15px;
            }


            #photo {
                object-fit: fill;
                min-with: ${imgWidth};
                width: ${imgWidth};
                max-width: ${imgWidth};
                min-height: ${imgHeight};
                height: ${imgHeight};
                max-height: ${imgHeight};
                border-radius: 15px;
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
                margin-left: -5px;
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
                align-items: center;
                flex: 1;
                margin-right: 5px;
            }

            #camera {
                position: relative;
                min-with: ${cameraSize};
                width: ${cameraSize};
                max-width: ${cameraSize};
                min-height: ${cameraSize};
                height: ${cameraSize};
                max-height: ${cameraSize};
                z-idex: 999;
            }

            #image-container {
                position: relative;
                min-with: ${imgWidth};
                width: ${imgWidth};
                max-width: ${imgWidth};
                min-height: ${imgHeight};
                height: ${imgHeight};
                max-height: ${imgHeight};
            }

            #image-button-border {
                background: rgba(0, 0, 0, 0.6);
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                padding: 5px;
                box-sizing: border-box;
                border-radius: 0px 0px 15px 15px;
                border: 1px solid rgba(0, 0, 0, 0.6);
            }

            #image-button-border:hover {
                cursor: pointer;
                background: rgba(0, 0, 0, 0.45);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

        `;
      }

    onPhotoClick() {
        console.log("Click!")
    }


    render() {
        return html`
            <div>
                <div id="card" class="card">
                    <div id="image-button">
                        <div id="image-container">
                            ${this.image}

                            <form>
                                <label for="image-input" id="image-button-border">
                                    <img id="camera" src="assets/icons/camera-64.png" />
                                </label>
                                <input type="file" id="image-input" name="image-input" accept="image/x-png,image/jpeg,image/gif" style="display: none;" @change="${this.onFileChoosen}"/>
                            </form>

                            <!--
                            <div id="image-button-border">
                                <img id="camera" src="assets/icons/camera-64.png" />
                            </div>-->
                        </div>
                    </div>

                    <div id="content">
                        <h1>${this.title}</h1>

                        <div id="members">
                            <div class="member">
                                <h2>Marcin</h2>
                                <div id="balls-marcin" class="balls">
                                    ${this.checksMarcinBall.map(i => html`<div class="ball ${i.type}"></div>`)}
                                    <!--
                                    <div class="ball full"></div>
                                    <div class="ball full"></div>
                                    <div class="ball main"></div>-->
                                </div>
                            </div>

                            <div class="member">
                                <h2>Marta</h2>
                                <div id="balls-marta" class="balls">
                                    ${this.checksMartaBall.map(i => html`<div class="ball ${i.type}"></div>`)}
                                    <!--<div class="ball empty"></div>-->
                                </div>
                            </div>
                        </div>

                        <div id="details">
                            <div id="date" class="detail">
                                <span>${this.timeConverter(this.lastCheckDate.date)}</span>
                            </div>

                            <div id="next" class="detail">
                                <span>➥ ${this.nextTurnName}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "my-activity": MyActivity
    }
}