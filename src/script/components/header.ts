import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('app-header')
export class AppHeader extends LitElement {
  @property({ type: String }) title = 'YourTurn';

  @property() enableBack: boolean = false;

  static get styles() {
    return css`
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #f5f5f5;
        color: white;
        height: 4em;
        padding: 0px 32px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 2px 5px 0 rgba(0, 0, 0, 0.1);
      }

      header h1 {
        margin-top: 0;
        margin-bottom: 0;
        font-size: 1.5em;
        font-weight: bold;
        color: #333;
      }

      nav fluent-anchor {
        margin-left: 10px;
      }

      #back-button-block {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 11em;
      }

      @media(prefers-color-scheme: light) {
        header {
          color: black;
        }

        nav fluent-anchor::part(control) {
          color: initial;
        }
      }
    `;
  }

  constructor() {
    super();
  }

  updated(changedProperties: any) {
    if (changedProperties.has('enableBack')) {
      console.log('enableBack', this.enableBack);
    }
  }

  render() {
    return html`
      <header>
        <div id="back-button-block">
          ${this.enableBack ? html`<fluent-anchor appearance="accent" href="/">Back</fluent-anchor>` : null}
          <h1>${this.title}</h1>
        </div>
      </header>
    `;
  }
}
