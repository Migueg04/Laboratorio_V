import { ProductActions } from "../flux/Actions";
import { CartItem, State, store } from "../flux/Store";

class Cart extends HTMLElement{
    connectedCallback() {
        store.subscribe((state: State) => {this.handleChange(state)});
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    handleChange(state: State) {
        this.render(state);
    }

    render(state = store.getState()) {
        if (!this.shadowRoot) return;

        // Obtener los atributos del componente
        const title = this.getAttribute('title') || 'Product Title';
        const price = this.getAttribute('price') || 0;
        const image = this.getAttribute('image');
        const id = this.getAttribute('id');

        this.shadowRoot.innerHTML = `
            <style>
                .cart-items {
                    list-style-type: none;
                    padding: 0;
                }
                .cart-item {
                    font-family: Arial, sans-serif;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    padding: 16px;
                    margin: 16px;
                    max-width: 250px;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
                    font-size: 10px;
                }
                .cart-item img {
                    max-width: 100%;
                    height: auto;
                }
                button {
                    background-color: #007BFF;
                    color: white;
                    border: none;
                    padding: 8px 12px;
                    margin-top: 10px;
                    border-radius: 4px;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #0056b3;
                }

                .titulo-principal {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-size: 30px;
                    color:rgb(0, 0, 0); 
                    text-align: center;
                    margin: 24px 0;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
                    letter-spacing: 1px;
                    position: relative;
                }
            </style>
            <div>
                <h1 class='titulo-principal'>Mi carrito</h1>
            </div>
            <ul class="cart-items">
                ${state.cart.map ((cartItem: CartItem) => {
                return`
                    <li class="cart-item">
                        <img src="${cartItem.product.image}" alt="${cartItem.product.title}">
                        <h2>${cartItem.product.title}</h2>
                        <h3>$${cartItem.product.price}</h3>
                        <button class="remove" id="${cartItem.id}">Remove</button>
                    </li>
                `}).join("")}
            </ul>
        `;

        console.log("PRODUCTOS DESDE EL COMPONENTE DE CARRITO", state.products);

        const removeButton = this.shadowRoot.querySelectorAll('.remove');
        removeButton.forEach((button) => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('id');
                if (id) {
                    ProductActions.removeFromCart(id);
                }
            });
        });
    }
}
export default Cart