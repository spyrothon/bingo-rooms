import { LitElement, html } from 'lit-element';

export class BLTeams extends LitElement {
  constructor() {
    super();
    this.teams = [];
  }

  static get properties() {
    return {
      loading: { type: Boolean },
      teams: { type: Array }
    };
  }

  render() {
    const { teams } = this;

    return html`
      <style>
        :host {
          display: block;
        }

        .event {
          margin: 4px 0;
        }

        .event-meta {
          color: var(--grey-darker);
        }

        .event-timestamp {
          font-weight: bold;
        }

      </style>

      <div class="event-log">
        ${events.map((event) => { return html`
            <div class="event">
              <span class="event-meta">
                [<span class="event-timestamp">${event.timestamp}</span>]:
              </span> ${event.type}</div>
          `;})
        }
      </div>
    `;
  }
}

customElements.define('bl-teams', BLTeam);

