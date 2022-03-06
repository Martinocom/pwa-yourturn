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
        width: 320px;
        height: 240px;
        display: block
        position: absolute;
      }

      #canvas {
        width: 320px;
        height: 240px;
        display: block;
        position: absolute;
      }

      .gone {
        display: none;
      }

      .hidden {
        opacity: 0;
      }

      #close {
        display: block;
        position: relative;
        left: 265px;
        bottom: 230px;
        border-radius: 25px;
        width: 38px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        z-index: 10;
        cursor: pointer;
      }

      #rotate {
        display: block;
        position: relative;
        left: 15px;
        bottom: 268px;
        border-radius: 25px;
        width: 38px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        z-index: 10;
        cursor: pointer;
        background: var(--app-color-primary);
      }

      #rotate:hover {
        background: var(--app-color-primary-light);
      }

      #controls {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px 20px;
      }

      #controls > * {
        background: var(--app-color-primary);
        border-radius: 25px;
        width: 48px;
        height: 48px;
        line-height: 48px;
        text-align: center;
      }

      #controls :not(.hidden) > *:hover {
        cursor: pointer;
        background: var(--app-color-primary-light);
      }

      #take-photo, #cancel, #accept {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      #take-photo > * {
        border: 2px solid white;
        border-radius: 25px;
        width: 30px;
        height: 30px;
      }

      #cancel, #accept, #close, #rotate {
        font-weight: 600;
        color: white;
        font-size: 1em;
      }

      #cancel, #close {
        background: #DD1111;
      }

      #cancel:hover, #close:hover {
        background: #BB1111;
      }

      #accept {
        background: #11DD11;
      }

      #accept:hover {
        background: #11BB11;
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

  @property({type: Boolean})
  private isRotating = false;


  private constraints = {
    audio: false,
    video: {
      width: { min: 320, max: 320 },
      height: { min: 240, max: 240},
      facingMode: "environment"
    },
  };


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
    this.stream = await navigator.mediaDevices.getUserMedia(this.constraints)
    if (this.stream != null) {
        this.video.srcObject = this.stream;
        this.video.play();

        this.video.addEventListener('canplay', ev => {
            if (!this.isStreaming) {
                this.video.setAttribute('width', this.constraints.video.width.min.toString())
                this.video.setAttribute('height', this.constraints.video.height.min.toString())
                this.canvas.setAttribute('width', this.constraints.video.width.min.toString())
                this.canvas.setAttribute('height', this.constraints.video.height.min.toString())
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
    if (this.constraints.video.width.min && this.constraints.video.height.min && context != null) {
        this.canvas.width = this.constraints.video.width.min;
        this.canvas.height = this.constraints.video.height.min;
        context.drawImage(this.video, 0, 0, this.constraints.video.width.min, this.constraints.video.height.min)

        let data = this.canvas.toDataURL('image/png')
        this.photo.setAttribute('src', data);
    } else {
        this.clearPicture()
    }

  }


  async onTakePhotoClick() {
    if (this.isStreaming) {
      this.takePicture()
      this.deactivateCaptureDevice()
    }
  }

  async onRedoPhotoClick() {
    if (!this.isStreaming) {
      this.activateCaptureDevice()
    }
  }

  async onAcceptPhotoClick() {
    if (!this.isStreaming) {
      this.deactivateCaptureDevice()
      this.dispatchEvent(new CustomEvent('photo-accept', { detail: { data: this.canvas.toDataURL('image/jpeg', 0.6) }}))
    }
  }

  async onCloseClick() {
    this.deactivateCaptureDevice()
    this.dispatchEvent(new CustomEvent('photo-cancel', { detail: { cause: "close" }}))
  }

  async onRotateClick() {
    this.isRotating = true
    if (this.constraints.video.facingMode == "user") {
      this.constraints.video.facingMode = "environment"
    } else {
      this.constraints.video.facingMode = "user"
    }
    await this.deactivateCaptureDevice()
    await this.activateCaptureDevice()
    this.isRotating = false
  }


  render() {
    return html`
    <div>
        <div id="picture-zone">
          ${this.video}
          ${this.canvas}
          <div id="close" @click=${this.onCloseClick}>x</div>
          <div id="rotate" class="${this.isRotating || !this.isStreaming ? "hidden" : ""}" @click=${this.onRotateClick}>⭯</div>
        </div>

        <div id="controls" class="${this.isLoaded ? "" : "hidden"}">
          <div id="cancel" class="${this.isStreaming ? "hidden" : ""}" @click=${this.onRedoPhotoClick}>x</div>
          <div id="take-photo" class="${this.isStreaming ? "" : "hidden"}" @click=${this.onTakePhotoClick}>
            <div></div>
          </div>
          <div id="accept" class="${this.isStreaming ? "hidden" : ""}" @click=${this.onAcceptPhotoClick}>v</div>
        </div>
    </div>
    `;
  }
}
