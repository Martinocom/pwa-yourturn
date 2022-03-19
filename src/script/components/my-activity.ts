import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { Activity } from '../model/activity';

const cameraSize = css`20px`;

@customElement('my-activity')
export class MyActivity extends LitElement {

    @property({type: String})
    id: string = '';

    @property({ type: Activity })
    activity!: Activity;

    @property({type: Boolean})
    isLoadingModeEnabled: boolean = false;


    private dominantRGB: any;
    private image = new Image()
    private fillImage = new Image()
    private filePicker: HTMLInputElement | null | undefined = null;


    constructor() {
        super()
    }

    async firstUpdated() {
        if (!this.isLoadingModeEnabled) {
            // Set variables
            this.image.id = "image";
            this.image.src = this.activity.image
            this.fillImage.id = "fill-image";
            this.fillImage.src = this.image.src;

            // Set the dominant color
            this.image.onload= (_) => {
                this.dominantRGB = this.getAverageRGB(this.image);
                this.style.setProperty("--background", this.getBackgroundFromAvg())
                this.style.setProperty("--accent-color", this.getAccentFromAvg())
                this.style.setProperty("--full-color", this.getMainColorFromAvg())
            };

            // TODO remove?
            //this.requestUpdate();
        } else {
            this.image.id = "image";
            this.image.src = "";
            this.fillImage.id = "fill-image";
            this.fillImage.src = "";
            this.dominantRGB = this.getAverageRGB(this.image);
            this.style.setProperty("--background", "#FEFEFE")
            this.style.setProperty("--accent-color", "#F1F1F1")
            this.style.setProperty("--full-color", "#EDEDED")
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
            var a = new Date(timestamp * 1000)
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

    private getAverageRGB(imgEl: any) {

        var blockSize = 5, // only visit every 5 pixels
            defaultRGB = {r:150,g:150,b:200}, // for non-supporting envs
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

        const increment = 15;
        if (rgb.r < 100) {
            rgb.r += increment
        }
        if (rgb.g < 100) {
            rgb.g += increment
        }
        if (rgb.b < 100) {
            rgb.b += increment
        }

        if (rgb.r > rgb.g && rgb.r > rgb.b) {
            // Red dominant
            if (rgb.r + increment <= 250) {
                rgb.r += increment
            }
        }

        else if (rgb.g > rgb.r && rgb.r > rgb.b) {
            // Green dominant
            if (rgb.g + increment <= 250) {
                rgb.g += increment
            }
        }

        else {
            // Blue dominant
            if (rgb.b + increment <= 250) {
                rgb.b += increment
            }
        }

        return rgb;
    }

    private getMainColorFromAvg(): string {
        return 'rgba(' + [Math.trunc(this.dominantRGB.r), Math.trunc(this.dominantRGB.g), Math.trunc(this.dominantRGB.b)].join(',') + ', 1)'
    }

    private getBackgroundFromAvg(): string {
        return 'rgba(' + [Math.trunc(this.dominantRGB.r), Math.trunc(this.dominantRGB.g), Math.trunc(this.dominantRGB.b)].join(',') + ', 0.1)'
    }

    private getAccentFromAvg(): string {
        return 'rgba(' + [Math.trunc(this.dominantRGB.r), Math.trunc(this.dominantRGB.g), Math.trunc(this.dominantRGB.b)].join(',') + ', 0.5)'
    }



    static get styles() {
        return css`
            /* ------------------------------------------ */
            /* HEADER */

            .card {
                display: flex;
                flex-flow: column;
                border-radius: 25px;
                box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.07), 0 2px 3px 0 rgba(0, 0, 0, 0.15);
                min-width: 330px;
                max-width: var(--app-card-max-size);
                height: 210px;
                background: var(--background);
                overflow: hidden;
                outline: none;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }

            #top {
                min-height: 110px;
                height: 110px;
                max-height: 110px;
                width: 100%;
                position: relative;
                overflow: hidden;
                flex-grow: 1;
            }

            #image-blur {
                z-index: 0;
            }

            #image {
                position: relative;
                top: -45px;
                max-height: 200px;
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
                flex: 1;
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
                background: rgba(14, 38, 17, 0.8);
            }


            /* ------------------------------------------ */
            /* BODY */
            #body {
                width: 100%;
                height: 100%;
                display: flex;
                flex-flow: row;
                flex: 1;
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
                margin-top: 10px;
            }

            .user {
                margin-bottom: 3px;
                display: flex;
                justify-content: space-between;
                align-items: baseline;
                flex-flow: row;
                width: 100%;
            }

            .name {
                width: 50px;
                min-width: 50px;
                max-width: 50px;
                color: #000000;
                text-align: right;
                margin-right: 10px;
            }

            .progress {
                flex: 1;
                border-radius: 15px;
                height: 10px;
                width: 100%;
                border: 1px solid var(--accent-color);
                box-sizing: border-box;
                -moz-box-sizing: border-box;
                -ms-box-sizing: border-box;
                -webkit-box-sizing: border-box;
            }


            .counter {
                display: flex;
                justify-content: right;
                align-items: center;
                width: 25px;
                min-width: 25px;
                max-width: 25px;
                font-size: 0.9em;
                color: var(--full-color);
            }


            #right-body {
                background: var(--full-color);
                display: flex;
                justify-content: center;
                align-items: center;
            }

            #right-body > *:first-child {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                width: 48px;
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

            #upload-photo {
                opacity: 0;
                position: absolute;
                z-index: -1;
            }

        `;
      }

    onPhotoClick() {
        console.log("Click!")
    }


    render() {
        return html`
            <div id="card" class="card">
                <!--<div id="top">
                    <div id="image-blur">
                        ${this.fillImage}
                    </div>

                    <div id="image-container">
                        ${this.image}
                    </div>

                    <div id="tags">
                        <div class="tag">${this.activity.lastCheck.name + " - " + this.timeConverter(this.activity.lastCheck.date)}</div>
                        <div class="tag next">➥ ${this.activity.nextTurnName}</div>
                    </div>
                </div>

                <div id=body>
                    <div id="left-body">
                        <h1>${this.activity.title}</h1>

                        <div id="users">
                            <div class="user">
                                <div class="name">Marcin</div>
                                <div class="progress" style="background: linear-gradient(90deg,
                                    var(--accent-color) 0%,
                                    var(--accent-color) ${this.activity.percentMarcin}%,
                                    transparent ${this.activity.percentMarcin}%,
                                    transparent ${100 - this.activity.percentMarcin}%)" >
                                </div>
                                <div class="counter">${this.activity.checksMarcin.length}</div>
                            </div>

                            <div class="user">
                                <div class="name">Marta</div>
                                <div class="progress" style="background: linear-gradient(90deg,
                                    var(--accent-color) 0%,
                                    var(--accent-color) ${this.activity.percentMarta}%,
                                    transparent ${this.activity.percentMarta}%,
                                    transparent ${100 - this.activity.percentMarta}%)" >
                                </div>
                                <div class="counter">${this.activity.checksMarta.length}</div>
                            </div>
                        </div>
                    </div>


                    <div id="right-body" @click="${() => { this.dispatchEvent(new CustomEvent('take-photo', { detail: { id: this.id }})) }}">
                        <label for="upload-photo">
                            <img id="camera" src="assets/icons/camera-64.png" />
                        </label>
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