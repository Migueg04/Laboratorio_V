import getProducts from "../services/miTiendaApi";

type productsResponse = {
    image: string;
    category: string;
    title: string;
    description: string;
    price: number;
}

class Card extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode: 'open'})
    }

    connectedCallback(){
        this.render();
    }

    async render(){
        
        const llamadoProductos: productsResponse[] = await getProducts();
        console.log(llamadoProductos);

        this.shadowRoot!.innerHTML = `
        <style>

            .card-container{
                
                display: flex;
                flex-wrap: wrap; 
                gap: 16px; 
                justify-content: center; 
                padding: 20px;
            }
            .card {
                font-family: Arial, sans-serif;
                border: 1px solid #ccc;
                border-radius: 10px;
                padding: 16px;
                margin: 16px;
                max-width: 300px;
                box-shadow: 0 2px 6px rgba(0,0,0,0.1);
            }

            .card img {
                width: 100%;
                height: auto;
                border-radius: 8px;
                margin-bottom: 12px;
            }

            .card h2 {
                font-size: 1.2rem;
                margin: 0 0 8px;
            }

            .card p {
                font-size: 0.9rem;
                color: #555;
                margin: 0 0 12px;
            }

            .card h3 {
                color: #2c3e50;
                margin: 0;
            }
        </style>
        <div class= "card-container">
            ${llamadoProductos.map ((products: productsResponse) => {
                    return`
                        <div class="card">
                            <img src="${products.image}" alt="${products.title}">
                            <h2>${products.title}</h2>
                            <p>${products.description}</p>
                            <h3>$${products.price}</h3>
                        </div>
                    `
                
                }).join("")}
        </div>
       `;
    }
}
export default Card