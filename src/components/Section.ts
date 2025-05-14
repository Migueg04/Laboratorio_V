import { store, Product } from "../flux/Store";
import { ProductActions } from "../flux/Actions";
import getProducts from "../services/miTiendaApi";

class Section extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }

    async connectedCallback(){
        store.load();
        await ProductActions.getProducts();
        this.render();
    }

    async render(){
        
        this.shadowRoot!.innerHTML = `
        <style>
            .container {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
            }

            .titulo-principal {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-size: 50px;
                color: rgb(0, 0, 0);
                text-align: center;
                margin: 24px 0;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
                letter-spacing: 1px;
                position: relative;
            }

            .titulo-principal::after {
                content: '';
                display: block;
                width: 800px;
                height: 4px;
                background-color: rgb(0, 0, 0);
                margin: 12px auto 0;
                border-radius: 2px;
            }

            .content-wrapper {
                display: flex;
                justify-content: center;
                align-items: flex-start;
                gap: 32px;
                max-width: 1200px;
                width: 100%;
                box-sizing: border-box;
                padding: 20px;
            }

            #product-list {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 16px;
                flex: 2;
            }

            cart-component {
                flex: 1;
                min-width: 300px;
            }
        </style>

        <div class="container">
            <h1 class="titulo-principal">Mi tiendita</h1>
            <div class="content-wrapper">
                <div id="product-list"></div>
                <cart-component></cart-component>
            </div>
        </div>

            
       `;

       const productList = this.shadowRoot?.querySelector("#product-list");
       store.getState().products.forEach((product: Product) => {
            const div = document.createElement("div");
            div.innerHTML =  `
                <product-card id="${product.id}" title="${product.title}" price="${product.price}" description="${product.description}" image="${product.image}"></product-card>
            `;
            productList?.appendChild(div);
       })
       
    }
}
export default Section