import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

const imgWidth = css`110px`;
const imgHeight = css`100px`;
const nameWidth = css`55px`;
const ballHeight = css`14px`;
const ballWidth = css`40px`;
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
    private fillImage = new Image()
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
        this.image.id = "image";
        this.image.src = "data:image/png;base64," + this.imageBase64;
        this.fillImage.id = "fill-image";
        this.fillImage.src = this.image.src;
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
                    date: check,
                    content: ""
                })
            } else {
                this.checksMarcinBall.push({
                    type: "full",
                    date: check,
                    content: ""
                })
            }
        })

        this.checksMarta.forEach(check => {
            if (check == this.lastCheckDate.date) {
                this.checksMartaBall.push({
                    type: "main",
                    date: check,
                    content: ""
                })
            } else {
                this.checksMartaBall.push({
                    type: "full",
                    date: check,
                    content: ""
                })
            }
        })

        if (this.nextTurnName == "Marta") {
            this.checksMartaBall.push({
                type: "empty",
                date: null,
                content: "next"
            })
        } else {
            this.checksMarcinBall.push({
                type: "empty",
                date: null,
                content: "next"
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
            /* ------------------------------------------ */
            /* HEADER */

            .card {
                display: flex;
                flex-flow: column;
                border-radius: 25px;
                box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 2px 5px 0 rgba(0, 0, 0, 0.19);
                min-width: 330px;
                max-width: 380px;
                min-height: 200px;
                height: 200px;
                max-height: 200px;
                background: var(--background);
                flex: 1;
                overflow: hidden;
                outline: none;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                outline: 0;
            }

            #top {
                min-height: 100px;
                height: 100px;
                max-height: 100px;
                width: 100%;
                position: relative;
                overflow: hidden;
            }

            #image-blur {
                z-index: 0;
            }

            #fill-image {
                min-height: 100px;
                height: 100px;
                max-height: 100px;
                width: 100%;
                filter: blur(8px);
            }

            #image-container {
                position: absolute;
                top: 0;
                left: 50%;
                -webkit-transform: translateX(-50%);
                transform: translateX(-50%)
                z-index: 10;
            }

            #tags {
                padding: 15px;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                z-index: 20;
                display: flex;
                flex-flow: row;
                justify-content: space-between;
            }

            .tag {
                display: flex;
                justify-content: center;
                align-items: center;
                background: rgba(0, 0, 0, 0.7);
                border-radius: 15px;
                padding: 5px 15px;
                font-size: 0.9em;
                color: white;
            }

            .tag.next {
                background: rgba(0, 50, 0, 0.8);
            }




            /* ------------------------------------------ */
            /* BODY */
            #body {
                width: 100%;
                height: 100%;
                display: flex;
                flex-flow: row;
            }

            #left-body {
                padding: 15px;
                flex: 1;
            }

            h1 {
                margin: 0;
                padding: 0;
                font-size: 1.2em;
            }

            #users {
                margin-top: 5px;
            }

            .user {
                margin-bottom: 3px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-flow: row;
                width: 100%;
            }

            .name {
                width: 60px;
                min-width: 60px;
                max-width: 60px;
            }

            .progress {
                flex: 1;
                border-radius: 15px;
                height: 5px;
                width: 100%;
                border: 1px solid var(--full-color);
            }

            .counter {
                display: flex;
                justify-content: right;
                align-items: center;
                width: 25px;
                min-width: 25px;
                max-width: 25px;
            }


            #right-body {
                background: var(--full-color);
                display: flex;
                justify-content: center;
                align-items: center;
                padding-left: 20px;
                padding-right: 20px;
            }

            #right-body:hover {
                cursor: pointer;
                box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
            }

            #right-body:active {
                cursor: pointer;
                box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.2);
            }


            #camera {
                min-with: ${cameraSize};
                width: ${cameraSize};
                max-width: ${cameraSize};
                min-height: ${cameraSize};
                height: ${cameraSize};
                max-height: ${cameraSize};
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
                    <div id="top">

                        <div id="image-blur">
                            ${this.fillImage}
                        </div>

                        <div id="image-container">
                            ${this.image}
                        </div>

                        <div id="tags">
                            <div class="tag">${this.lastCheckDate.who + " - " + this.timeConverter(this.lastCheckDate.date)}</div>
                            <div class="tag next">➥ ${this.nextTurnName}</div>
                        </div>

                    </div>

                    <div id=body>
                        <div id="left-body">
                            <h1>${this.title}</h1>

                            <div id="users">
                                <div class="user">
                                    <div class="name">Maricn</div>
                                    <div class="progress" id="progressMarcin"></div>
                                    <div class="counter">3</div>
                                </div>

                                <div class="user">
                                    <div class="name">Marta</div>
                                    <div class="progress" id="progressMarta"></div>
                                    <div class="counter">1</div>
                                </div>
                            </div>
                        </div>

                        <div id="right-body">
                            <img id="camera" src="assets/icons/camera-64.png" />
                        </div>

                    </div>


                    <!--<div id="card-top">-->
                        <!--<div id="details">
                            <div id="next" class="detail">
                                <span>➥ ${this.nextTurnName}</span>
                            </div>

                            <div id="date" class="detail">
                                <img id="calendar" class="small-icon" src="assets/icons/calendar.png" />
                                <span>${this.timeConverter(this.lastCheckDate.date)}</span>
                            </div>
                        </div>-->
                    <!--</div>-->

                    <!--
                        <div id="image-button">
                            <div id="image-container">
                                ${this.image}

                                <form>
                                    <label for="image-input" id="image-button-border">
                                        <img id="camera" src="assets/icons/camera-64.png" />
                                    </label>
                                    <input type="file" id="image-input" name="image-input" accept="image/x-png,image/jpeg,image/gif" style="display: none;" @change="${this.onFileChoosen}"/>
                                </form>
                            </div>
                        </div>

                        <div id="content">
                            <div id="details">
                                <div id="date" class="detail">
                                    <img id="calendar" class="small-icon" src="assets/icons/calendar.png" />
                                    <span>${this.timeConverter(this.lastCheckDate.date)}</span>
                                </div>
                            </div>
                            <h1>${this.title}</h1>

                            <div id="members">
                                <div class="member">
                                    <h2>Marcin</h2>
                                    <div id="balls-marcin" class="balls">
                                        ${this.checksMarcinBall.map(i => html`<div class="ball ${i.type}">${i.content}</div>`)}

                                    </div>
                                </div>

                                <div class="member">
                                    <h2>Marta</h2>
                                    <div id="balls-marta" class="balls">
                                        ${this.checksMartaBall.map(i => html`<div class="ball ${i.type}">${i.content}</div>`)}

                                    </div>
                                </div>
                            </div>
                        </div>

                </div>-->
            </div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "my-activity": MyActivity
    }
}