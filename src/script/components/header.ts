import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('app-header')
export class AppHeader extends LitElement {
  @property({ type: String }) title = 'YourTurn';
  @property({ type: String }) version = 'MartaFix';

  static get styles() {
    return css`
      header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background: var(--app-color-primary);
        height: 3em;
        padding: 0px 16px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 2px 5px 0 rgba(0, 0, 0, 0.1);
      }

      header h1 {
        margin-top: 0;
        margin-bottom: 0;
        font-size: 1.2em;
        font-weight: bold;
        color: white;
      }

      h5 {
        font-size: 0.8em;
        font-weght: normal;
        margin-left: 15px;
        color: white;
      }

      @media only screen and (min-width: 724px) {
        header {
          height: 4em;
          padding: 0px 32px;
        }

        header h1 {
          font-size: 1.5em;
        }

        h5 {
          font-size: 0.9em;
        }
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    if (this.version == null || this.version == "") {
      return html`
        <header>
            <h1>${this.title}</h1>
        </header>
      `;
    } else {
      return html`
        <header>
            <h1>${this.title} <h5>(${this.version})</h5></h1>
        </header>
      `;
    }
  }
}
