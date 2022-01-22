import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Router } from '@vaadin/router';

// For more info on the @pwabuilder/pwainstall component click here https://github.com/pwa-builder/pwa-install
import '@pwabuilder/pwainstall';
import '@pwabuilder/pwaauth';


@customElement('app-activities')
export class AppActivities extends LitElement {

  static get styles() {
    return css`
      #center-container {
        margin-top: 18px;
        display: flex;
        flex-direction: column;
      }

      #activity-container {
        display: flex;
        flex-direction: column;
      }

      #activity {
        padding: 10px;
        flex-grow: 1;
        flex-shrink: 1;
        min-width: 20em;
        max-width: 25em;
      }
    `;
  }


  constructor() {
    super();
  }



  async firstUpdated() {
    // this method is a lifecycle even in lit
    // for more info check out the lit docs https://lit.dev/docs/components/lifecycle/

    const pwaAuth = this.renderRoot.querySelector('#pwa-auth');
    const response = await pwaAuth?.signIn("Google")

    if (response == null) {
        Router.go("/login")
    } else {
        if (response.error != null) {
            Router.go("/login")
        } else {
            console.log("Success!")
            console.log(response)
        }
    }
  }


  render() {
    return html`
    <div>
        <div id="center-container">
            <fluent-card id="center-card">
                <h1>YourTurn</h1>
                <p>
                    If you are here, you're authenticated!
                </p>
            </fluent-card>
        </div>

        <pwa-auth
            id="pwa-auth"
            credentialmode="prompt"
            appearance="none"
            googlekey="717873781162-2i7l6oorlm7hqqar81jml59rp6q0o9jk.apps.googleusercontent.com">
        </pwa-auth>
    </div>
    `;
  }
}
