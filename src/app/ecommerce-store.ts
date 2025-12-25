import { computed, inject } from "@angular/core";
import { Product } from "./models/product"
import {patchState, signalMethod, signalStore, withComputed, withMethods, withState} from "@ngrx/signals"
import {produce} from 'immer';
import { Toaster } from "./services/toaster";
import { CartItem } from "./models/cart";

export type EcommerceState = {
    products: Product[];
    category: string;
    wishlistItems: Product[];
    cartItems: CartItem[];
}

export const EcommerceStore = signalStore(
    {
        providedIn: 'root' 
    },
    withState({
        products: [
            {
            id: 'P1002',
            name: 'Smart Fitness Watch',
            description: 'Track heart rate, sleep, steps, and workouts.',
            price: 6999,
            imageUrl: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b',
            rating: 4.3,
            reviewCount: 980,
            inStock: true,
            category: 'clothes'
            },
            {
            id: 'P1003',
            name: 'Gaming Mouse',
            description: 'High precision RGB gaming mouse with 6 buttons.',
            price: 2499,
            imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db',
            rating: 4.4,
            reviewCount: 760,
            inStock: true,
            category: 'clothes'
            },
            {
            id: 'P1004',
            name: 'Mechanical Keyboard',
            description: 'RGB mechanical keyboard with blue switches.',
            price: 3499,
            imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
            rating: 4.6,
            reviewCount: 890,
            inStock: true,
            category: 'Accessories'
            },
            {
            id: 'P1005',
            name: 'Laptop Stand',
            description: 'Aluminum laptop stand for ergonomic working.',
            price: 1799,
            imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04',
            rating: 4.2,
            reviewCount: 420,
            inStock: true,
            category: 'accessories'
            },
            {
            id: 'P1006',
            name: 'Noise Cancelling Earbuds',
            description: 'Compact earbuds with immersive sound.',
            price: 3999,
            imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df',
            rating: 4.4,
            reviewCount: 670,
            inStock: false,
            category: 'Electronics'
            },
            {
            id: 'P1008',
            name: 'Desk Lamp',
            description: 'LED desk lamp with brightness control.',
            price: 1499,
            imageUrl: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
            rating: 4.1,
            reviewCount: 310,
            inStock: true,
            category: 'Home'
            },
            {
            id: 'P1009',
            name: 'Backpack',
            description: 'Water-resistant backpack for laptops.',
            price: 2799,
            imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
            rating: 4.3,
            reviewCount: 720,
            inStock: true,
            category: 'clothes'
            },
            {
            id: 'P1012',
            name: 'Bluetooth Speaker',
            description: 'Portable speaker with rich bass.',
            price: 2999,
            imageUrl: 'https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf',
            rating: 4.5,
            reviewCount: 850,
            inStock: true,
            category: 'Electronics'
            },
            {
            id: 'P1014',
            name: 'Running Shoes',
            description: 'Lightweight running shoes with cushioning.',
            price: 5999,
            imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
            rating: 4.6,
            reviewCount: 1340,
            inStock: true,
            category: 'home'
            }
        ],
        category: 'all',
        wishlistItems: [],
        cartItems: []
    } as EcommerceState ),
    withComputed(({category, products, wishlistItems, cartItems})=> ({
        filteredProducts: computed(() => products().filter(product => 
            category() === 'all' || product.category.toLowerCase() === category().toLowerCase()
        )),
        wishlistCount: computed(() => wishlistItems().length),
        // cartCount: computed(() => cartItems().length),
        cartCount: computed(() => cartItems().reduce((acc,item)=> acc+item.quantity, 0))
    })),
    withMethods((store, toaster = inject(Toaster)) => ({
        setCategory: signalMethod<string>((category: string)=> {
            patchState(store, { category });
        }),
        addToWishlist: (product: Product) => {
            const updateWishlistItems = produce(store.wishlistItems(), (draft)=> {
                if(!draft.find(p => p.id === product.id)) {
                    draft.push(product);
                }
            });
            patchState(store, {wishlistItems: updateWishlistItems});
            toaster.success('Product added to wishlist');
        },
        removeFromWishlist: (product: Product) => {
            patchState(store, {
                wishlistItems: store.wishlistItems().filter((p)=> p.id !== product.id )
            });
            toaster.success('Product removed from wishlist');
        },
        clearWishlist: () => {
            patchState(store, {wishlistItems: []})
        },
        addToCart: (product: Product, quantity = 1) => {
            const existingItemIndex = store.cartItems().findIndex(i => i.product.id === product.id);
            const updatedCartItems = produce(store.cartItems(), (draft)=> {
                if(existingItemIndex !== -1) {
                    draft[existingItemIndex].quantity += quantity;
                    return;
                } 
                draft.push({
                    product, quantity
                });
            });
            patchState(store, {cartItems: updatedCartItems});
            toaster.success(existingItemIndex !== -1 ? 'Product added again' : 'Product added to the cart');
        },
        setItemQuantity(params: {productId: string, quantity: number}) {
            const index = store.cartItems().findIndex(c=> c.product.id === params.productId);
            const updated = produce(store.cartItems(), (draft)=> {
                draft[index].quantity = params.quantity
            })

            patchState(store, {cartItems: updated});
        }
    }))
)