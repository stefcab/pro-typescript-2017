﻿import { Product } from './Listing-6-021';

export class ProductDatabase {

    constructor(private name: string, private version: number) {
        const openDatabaseRequest = indexedDB.open(this.name, this.version);
        openDatabaseRequest.onupgradeneeded = this.upgrade;
    }

    upgrade(event: any) {
        const db = event.target.result;

        // The keyPath specifies the property that contains the id
        const objectStore = db.createObjectStore("products", { keyPath: 'productId' });

        objectStore.createIndex('name', 'name', { unique: false });

        objectStore.transaction.oncomplete = () => {
            // Example static data
            const products = [
                new Product(1, 'My first product'),
                new Product(2, 'My second product'),
                new Product(3, 'My third product')
            ];

            // Add records
            const productStore = db.transaction('products', 'readwrite').objectStore('products');
            for (let product of products) {
                productStore.add(product);
            }
        }
    }
}