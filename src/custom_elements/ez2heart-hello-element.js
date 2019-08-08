// This provides the DOM API, so load it first.
var register = require("@skatejs/ssr/register");
// Renders the provided DOM tree to a string.
const render = require("@skatejs/ssr");

class Hello extends HTMLElement {
  constructor() {
    super();
    // A shadow root might already exists if it's been
    // rendered on the server and you load this on the
    // client.
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" }).innerHTML = `
        Hello, <slot></slot>!
      `;
    }
  }
}
customElements.define("x-hello", Hello);
export default Hello;