import { Component, inject, input } from '@angular/core';
import { Product } from '../../models/product';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-product-card',
  imports: [MatIcon, MatButton ],
  template: `
    <div class="relative bg-white shadow-md rounded-lg overflow-hidden">
      <img [src]="product().imageUrl" alt="{{product().name}}" class="w-full h-48 object-cover">    
      <ng-content /> 
      <div class="p-4">
        <h2 class="text-lg font-semibold text-gray-800">{{product().name}}</h2>
        <p class="text-gray-600 mt-2">{{product().description}}</p>
        <!-- star rating here -->
        <div class="text-sm font-medium mb-4">
          {{product().inStock ? 'In Stock' : 'Out Of Stock'}}
        </div>
        <div class="flex items-center justify-between mt-auto">
          <span class="text-2xl font-bold text-gray-900">
            \${{product().price}}
          </span>
          <button matButton="filled" class="flex items-center gap-2"
          (click)="store.addToCart(product())">
            <mat-icon>shopping_cart</mat-icon>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ProductCard {

  product = input.required<Product>();
  store = inject(EcommerceStore);

}
