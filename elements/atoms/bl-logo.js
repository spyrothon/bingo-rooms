import { LitElement, html } from 'lit-element';
import logo from '../../assets/logo/transparent/bingo_league_logo@0,33x.png';

export class BLLogo extends LitElement {
  static get properties() {
    return {};
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
        }

        img {
          width: 100%;
        }
      </style>

      <img src="${logo}" />
    `;
  }
}

customElements.define('bl-logo', BLLogo);

