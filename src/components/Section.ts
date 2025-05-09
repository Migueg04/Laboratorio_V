import { store, Product } from "../flux/Store";
import { ProductActions } from "../flux/Actions";
import getProducts from "../services/miTiendaApi";

class Section extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }

    async connectedCallback(){
        await ProductActions.getProducts();
        //store.load();
        this.render();
    }

    async render(){
        
        this.shadowRoot!.innerHTML = `
        <style>

            .container{
                background-color: rgb(217, 72, 72);
                display: flex;
                align-items: center;
                justify-content: center;   
                width: 1200px;
                flex-direction: column;          
            }

            .titulo-principal {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-size: 50px;
                color:rgb(0, 0, 0); /* amarillo dorado */
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
                background-color:rgb(0, 0, 0);
                margin: 12px auto 0;
                border-radius: 2px;
            }
        
        </style>
         <div class="container">
            <div>
                <h1 class='titulo-principal'>Mi tiendita</h1>
            </div>
            <div id="product-list"></div>
        </div>
            
       `;

       const productList = this.shadowRoot?.querySelector("#product-list");
       store.getState().products.forEach((product: Product) => {
            const div = document.createElement("div");
            div.innerHTML =  `
                <product-card title="${product.title}" price="${product.price}" description="${product.description}" image="${product.image}"></product-card>
            `;
            productList?.appendChild(div);
       })
       
    }
}
export default Section