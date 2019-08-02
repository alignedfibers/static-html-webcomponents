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
  const hello = new Hello();
  hello.textContent = "World";
  render(hello).then(console.log);