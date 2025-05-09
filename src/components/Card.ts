import { State, store } from "../flux/Store";


class Card extends HTMLElement{

    connectedCallback(){
        this.attachShadow({mode: 'open'})
        store.subscribe((state: State) => {this.handleChange(state)})
        this.render();
    }

    handleChange(state: State){
        this.render(state)
    }


    render(state= store.getState()){
        
        const title = this.getAttribute("title")
        const price = this.getAttribute("price")
        const description = this.getAttribute("description")
        const image = this.getAttribute("image")
        
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
                <div class="card">
                    <img src="${image}" alt="${title}">
                    <h2>${title}</h2>
                    <p>${description}</p>
                    <h3>$${price}</h3>
                </div>     
            </div>
       `;
    }
}
export default Card