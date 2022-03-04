import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('photo-capture')
export class PhotoCapture extends LitElement {

  static get styles() {
    return css`
      #picture-zone {
        width: 320px;
        height: 240px;
      }

      #video {
        display: block
        position: absolute;
      }

      #canvas {
        display: block;
        position: absolute;
      }

      .gone {
        display: none;
      }

      .hidden {
        opacity: 0;
      }

      #controls {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px 20px;
      }

      #controls > * {
        background: #333399;
        corner-radius: 90px;
        width: 48px;
        height: 48px;
        line-height: 48px;
        text-align: center;
      }

      #controls > *:hover {
        cursor: pointer;
        background: #3333BB;
      }

    `;
  }

  private video = document.createElement('video')
  private canvas = document.createElement('canvas')
  private photo = new Image()
  private stream: MediaStream | null = null


  @property({type: Boolean})
  private isStreaming = false;

  @property({type: Boolean})
  private isLoaded = false;

  private videoProperties = {
      width: 320,
      height: 0
  }

  constructor() {
    super();
    this.video.id = "video";
  }

  async firstUpdated() {

  }

  public async start() {
    this.activateCaptureDevice()
  }

  public async stop() {
    this.deactivateCaptureDevice()
  }


  async activateCaptureDevice() {
    // Loading
    this.isLoaded = false

    // Clear preview area
    this.clearPicture()

    // Get media
    this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    if (this.stream != null) {
        this.video.srcObject = this.stream;
        this.video.play();

        this.video.addEventListener('canplay', ev => {
            if (!this.isStreaming) {
                this.videoProperties.height = this.video.videoHeight / (this.video.videoWidth / this.videoProperties.width)
                this.video.setAttribute('width', this.videoProperties.width.toString())
                this.video.setAttribute('height', this.videoProperties.height.toString())
                this.canvas.setAttribute('width', this.videoProperties.width.toString())
                this.canvas.setAttribute('height', this.videoProperties.height.toString())
                this.isStreaming = true
                this.isLoaded = true
            }
        }, false)
    }
  }

  async clearPicture() {
    // Get the context and clear area
    let context = this.canvas.getContext('2d')
    if (context != null) {
        context.fillStyle = "#AAA"
        context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }
    // Save "clear" data
    let data = this.canvas.toDataURL('image/png')
    this.photo.setAttribute('src', data);
    // Hide canvas
    this.video.classList.remove('gone')
    this.canvas.classList.add('gone')

  }

  async deactivateCaptureDevice() {
    // Stop every track and reset capture object
    this.stream?.getTracks().forEach(track => track.stop())
    this.video.srcObject = null
    // Show the preview
    this.canvas.classList.remove('gone')
    this.video.classList.add('gone')
    this.isStreaming = false;
  }



  async takePicture() {
    let context = this.canvas.getContext('2d')
    if (this.videoProperties.width && this.videoProperties.height && context != null) {
        this.canvas.width = this.videoProperties.width;
        this.canvas.height = this.videoProperties.height;
        context.drawImage(this.video, 0, 0, this.videoProperties.width, this.videoProperties.height)

        let data = this.canvas.toDataURL('image/png')
        this.photo.setAttribute('src', data);
    } else {
        this.clearPicture()
    }

  }


  async onTakePhotoClick() {
    this.takePicture()
    this.deactivateCaptureDevice()
  }

  async onRedoPhotoClick() {
    console.log("redo")
    this.activateCaptureDevice()
  }

  async onAcceptPhotoClick() {
    console.log("accept")
    this.deactivateCaptureDevice()
  }



  render() {
    return html`
    <div>
        <div id="picture-zone">
          ${this.video}
          ${this.canvas}
        </div>

        <div id="controls" class="${this.isLoaded ? "" : "hidden"}">
          <div id="cancel" class="${this.isStreaming ? "hidden" : ""}" @click=${this.onRedoPhotoClick}>x</div>
          <div id="take-photo" class="${this.isStreaming ? "" : "hidden"}" @click=${this.onTakePhotoClick}>O</div>
          <div id="accept" class="${this.isStreaming ? "hidden" : ""}" @click=${this.onAcceptPhotoClick}>v</div>
        </div>

        <!--
        <div class="camera">
            ${this.video}
            <button id="startbutton" @click=${this.takePhoto}>Take photo</button>
        </div>
  -->

    </div>
    `;
  }
}
