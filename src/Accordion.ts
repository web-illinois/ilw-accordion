import {LitElement, html, unsafeCSS, nothing, svg} from "lit";
// @ts-ignore
import styles from "./Accordion.styles.css?inline";
import "./Accordion.css";
import { customElement, property, query, state } from "lit/decorators.js";
import AccordionPanel from "./AccordionPanel";
@customElement('ilw-accordion')
export default class Accordion extends LitElement {

    @property({type: String}) 
    accent: "" | "gray" | "orange" | "blue" | "industrial" | "arches" | "altgeld" = "blue";
    @property({type: String}) 
    width: string = "";
    @property({type: Boolean}) 
    limit: boolean = false;
    @property({type: Boolean}) 
    buttons: boolean = false;

    static get styles() {
        return unsafeCSS(styles);
    }

    constructor() {
        super();
        this.width = "";
        this.limit = false;
        this.buttons = false;
        this.addEventListener("collapse", (e) => this.collapsePanel(e.target as AccordionPanel));
        this.addEventListener("expand", (e) => this.expandPanelListener(e.target as AccordionPanel));
    }

    expandPanelListener(panel: AccordionPanel) {
        if (this.limit) {
            this.expandPanelAndCollapseOthers(panel);
        } else {
            panel.expand();
        }
    }

    expandPanelAndCollapseOthers(openedPanel: AccordionPanel) {
        this.getPanels().forEach((panel) => {
            if (panel != openedPanel) this.collapsePanel(panel);
            else this.expandPanel(panel);
        });
    }

    expandPanel(panel: AccordionPanel) {
        panel.expand();
    }

    collapsePanel(panel: AccordionPanel) {
        panel.collapse();
    }

    getPanels() {
        return this.querySelectorAll("ilw-accordion-panel");
    }

    getExpandedPanels() {
        return this.querySelectorAll("ilw-accordion-panel[open]");
    }

    expandAll() {
        this.getPanels().forEach((panel) => {
            this.expandPanel(panel);
        });
    }

    collapseAll() {
        this.getPanels().forEach((panel) => {
            this.collapsePanel(panel);
        });
    }

    render() {
        return html`
            <div class="${this.width} ${this.accent}">
                <ul class="buttons" ?hidden="${!this.buttons}">
                    <li><button @click="${this.expandAll}">Expand All</button></li>
                    <li><button @click="${this.collapseAll}">Collapse All</button></li>
                </ul>
                <slot></slot>
            </div>
        `;
    }
}


declare global {
interface HTMLElementTagNameMap {
    "ilw-accordion": Accordion;
  }
}

