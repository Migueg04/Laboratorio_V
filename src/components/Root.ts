import { StorageActions } from "../flux/Actions";

class Root extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode: 'open'})

        if (!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
                <custom-element-a></custom-element-a>
                <custom-element-b></custom-element-b>
                <custom-element-c></custom-element-c>
            </div>
    `
    }

    connectedCallback(){
        const storage = localStorage.getItem('flux:persist')

        if (storage){
            const storageJson = JSON.parse (storage)
            StorageActions.load(storageJson)
        }
    }

}

export default Root