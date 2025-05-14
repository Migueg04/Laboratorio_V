import { AppDispatcher, Action } from './Dispatcher';
import { loadStorageActionTypes, ProductActionTypes } from './Actions';
import getProducts from '../services/miTiendaApi';

export type Product = {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
};

export type CartItem = {
    product: Product;
    id: number;
};

export type State = {
    products: Product[];
    cart: CartItem[];
};

type Listener = (state: State) => void;

class Store {
    private _myState: State = {
        products: [],
        cart: [],
    };

    // Los componentes
    private _listeners: Listener[] = [];

    constructor() {
        AppDispatcher.register(this._handleActions.bind(this)); // Bind the context of this method to the Store instance
    }

    getState() {
        return this._myState;
    }

    _handleActions(action: Action): void {
        switch (action.type) {
            case ProductActionTypes.GET_PRODUCTS:
                if (Array.isArray(action.payload)) {
                    this._myState = {
                        ...this._myState,
                        products: action.payload as Product[],
                    };
                }
                this._emitChange();
                break;

            case ProductActionTypes.ADD_TO_CART:
                if (typeof action.payload === 'object') {
                    // Aseguramos que el payload es un CartItem
                    this._myState = {
                        ...this._myState,
                        cart: [...this._myState.cart, action.payload as CartItem],
                    };
                }
                this._emitChange();
                break;

            case ProductActionTypes.REMOVE_FROM_CART:
                if (typeof action.payload === 'number') {
                    this._myState = {
                        ...this._myState,
                        cart: this._myState.cart.filter((item) => item.id !== action.payload),
                    };
                }
                this._emitChange();
                break;
        }
        this.persist();
    }

    private _emitChange(): void {
        const state = this.getState();
        for (const listener of this._listeners) {
            listener(state);
        }
    }

    load() {
        // Cache First para el carrito
        const cached = localStorage.getItem('flux:persist');
        if (cached) {
            const parsed = JSON.parse(cached);
            // Validación básica para evitar errores
            if (Array.isArray(parsed.products) && Array.isArray(parsed.cart)) {
                this._myState = parsed;
            }
        }

        // Network Only para los productos: siempre intentamos cargar desde la red
        this.loadProductsFromNetwork();
    }

async loadProductsFromNetwork() {
    try {
        const products = await getProducts();
        this._myState.products = products;
        this._emitChange();
    } catch (error) {
        console.error("Error al cargar productos", error);
    }
}

    // Permite a los componentes suscribirse al store
    subscribe(listener: Listener): void {
        this._listeners.push(listener);
        listener(this.getState()); // Emitir estado actual al suscribirse
    }

    // Permite quitar la suscripción
    unsubscribe(listener: Listener): void {
        this._listeners = this._listeners.filter(l => l !== listener);
    }

    persist() {
        localStorage.setItem('flux:persist', JSON.stringify(this._myState));
    }
}

export const store = new Store();
