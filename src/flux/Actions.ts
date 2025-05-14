import getProducts from '../services/miTiendaApi';
import { AppDispatcher } from './Dispatcher';
import {State, Product, store} from './Store'


export const ProductActionTypes = {
    GET_PRODUCTS: "GET_PRODUCTS",
    ADD_TO_CART: "ADD_TO_CART",
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
}


export const ProductActions = {
    getProducts: async () =>{
        const products = await getProducts();
        AppDispatcher.dispatch({
            type: ProductActionTypes.GET_PRODUCTS,
            payload: products,
        });
    },

addToCart: async (product: Product) => {
    const state = store.getState();
    const alreadyInCart = state.cart.some(item => item.id === product.id);

    if (!alreadyInCart) {
        const cartItem = {
            product,
            id: product.id, // 👈 directamente usar product.id
        };

        AppDispatcher.dispatch({
            type: ProductActionTypes.ADD_TO_CART,
            payload: cartItem,
        });
    } else {
        console.log(`Producto con ID ${product.id} ya está en el carrito`);
    }
},

    removeFromCart: (id: string) => {
        AppDispatcher.dispatch({
            type: ProductActionTypes.REMOVE_FROM_CART,
            payload: Number(id),
        });
    },
}

export const loadStorageActionTypes = {
    LOAD_STORAGE: 'LOAD_STORAGE'
}

export const StorageActions = {
    load: (state: State) => {
        AppDispatcher.dispatch({
            type: loadStorageActionTypes.LOAD_STORAGE,
            payload: state, 
        })
    }
}

