import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Router } from '@vaadin/router';

// For more info on the @pwabuilder/pwainstall component click here https://github.com/pwa-builder/pwa-install
import '@pwabuilder/pwainstall';
import '@pwabuilder/pwaauth';


@customElement('app-login')
export class AppLogin extends LitElement {

  static get styles() {
    return css`
      #center-container {
        margin-top: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }

      #center-card {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 18px;
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
    const pwaAuth = document.querySelector("pwa-auth");

    if (pwaAuth != null) {
        pwaAuth.addEventListener("signin-completed", ev => {
            const signIn = ev.detail;
            if (signIn.error) {
                console.error("Sign in failed", signIn.error);
            } else {
                console.log("Email: ", signIn.email);
                console.log("Name: ", signIn.name);
                console.log("Picture: ", signIn.imageUrl);
                console.log("Access token", signIn.accessToken);
                console.log("Access token expiration date", signIn.accessTokenExpiration);
                console.log("Provider (MS, Google, FB): ", signIn.provider);
                console.log("Raw data from provider: ", signIn.providerData);
                Router.go('/');
            }
        });
    }
  }


  render() {
    return html`
        <div id="center-container">
            <fluent-card id="center-card">
                <h1>YourTurn</h1>
                <p>
                    Hey buddy! It seems you want to join the fantastic experience of home duties management!
                    Cool! But I need to know who you are. And I know you have a Google Account, aren't you?
                </p>

                <pwa-auth
                    appearance="list"
                    googlekey="717873781162-2i7l6oorlm7hqqar81jml59rp6q0o9jk.apps.googleusercontent.com">
                </pwa-auth>
            </fluent-card>
        </div>
    `;
  }
}
