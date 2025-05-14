import { ProductActions } from "../flux/Actions";
import { State, store } from "../flux/Store";

class Button extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        store.subscribe((state: State) => {
            this.handleChange(state);
        });
        this.render();
    }

    handleChange(state: State) {
        this.render(state);
    }

    render(state = store.getState()) {

    const idAttr = this.getAttribute("id");
    const id = idAttr ? parseInt(idAttr) : Date.now(); 
    const title = this.getAttribute("title") || "Producto sin nombre";
    const price = parseFloat(this.getAttribute("price") || "0");
    const description = this.getAttribute("description") || "Descripción no disponible";
    const image = this.getAttribute("image") || "imagen_no_disponible.jpg";  

        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    #cart-button {
                        background-color: #d3d3d3; /* gris claro */
                        border: none;
                        border-radius: 12px;
                        padding: 12px 24px;
                        font-size: 16px;
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        cursor: pointer;
                        transition: background-color 0.3s, transform 0.2s;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }

                    #cart-button:hover {
                        background-color: #b0b0b0; /* gris más oscuro al hacer hover */
                        transform: scale(1.05);
                    }

                    #cart-button:active {
                        transform: scale(0.98);
                    }
                </style>
                <button id="cart-button">Añadir al carrito de compra</button>
            `;

        this.shadowRoot.querySelector('#cart-button')?.addEventListener('click', () => {
            const product = {
                id, 
                title,
                price,
                description,
                image,
            };

            ProductActions.addToCart(product);
        });
        }
    }
}

export default Button;
