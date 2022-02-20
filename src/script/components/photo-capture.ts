import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('photo-capture')
export class PhotoCapture extends LitElement {

  static get styles() {
    return css`
    #video {
        border: 1px solid black;
        box-shadow: 2px 2px 3px black;
        width:320px;
        height:240px;
      }

      #photo {
        border: 1px solid black;
        box-shadow: 2px 2px 3px black;
        width:320px;
        height:240px;
      }

      #canvas {
        display:none;
      }

      .camera {
        width: 340px;
        display:inline-block;
      }

      .output {
        width: 340px;
        display:inline-block;
        vertical-align: top;
      }

      #startbutton {
        display:block;
        position:relative;
        margin-left:auto;
        margin-right:auto;
        bottom:32px;
        background-color: rgba(0, 150, 0, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.7);
        box-shadow: 0px 0px 1px 2px rgba(0, 0, 0, 0.2);
        font-size: 14px;
        font-family: "Lucida Grande", "Arial", sans-serif;
        color: rgba(255, 255, 255, 1.0);
      }

      .contentarea {
        font-size: 16px;
        font-family: "Lucida Grande", "Arial", sans-serif;
        width: 760px;
      }
    `;
  }

  private video = document.createElement('video')
  private canvas = document.createElement('canvas')
  private photo = new Image()
  private stream: MediaStream | null = null


  private isStreaming = false;
  private videoProperties = {
      width: 320,
      height: 0
  }

  constructor() {
    super();
    this.video.id = "video";
  }

  async firstUpdated() {
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
            }
        }, false)
    }

    this.clearPicture()
  }

  async takePhoto() {
    alert("Click")
    this.takePicture()
  }

  async takePicture() {
    alert("Take")
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

  async clearPicture() {
    alert("Clear")
    let context = this.canvas.getContext('2d')
    if (context != null) {
        context.fillStyle = "#AAA"
        context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    let data = this.canvas.toDataURL('image/png')
    this.photo.setAttribute('src', data);
  }

  render() {
    return html`
    <div>
        <div class="camera">
            ${this.video}
            <button id="startbutton" @click=${this.takePhoto}>Take photo</button>
        </div>
        ${this.canvas}
    </div>
    `;
  }
}
