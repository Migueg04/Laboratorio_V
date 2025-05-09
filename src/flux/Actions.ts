import getProducts from '../services/miTiendaApi';
import { AppDispatcher } from './Dispatcher';
import {State} from './Store'


export const ProductActionTypes = {
    GET_PRODUCTS: "GET_PRODUCTS",
}


export const ProductActions = {
    getProducts: async () =>{
        const products = await getProducts();
        AppDispatcher.dispatch({
            type: ProductActionTypes.GET_PRODUCTS,
            payload: products,
        });
    }
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

