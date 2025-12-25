import { Component } from '@angular/core';
import { BackButton } from '../../../components/back-button/back-button';
import { RouterLink } from "@angular/router";
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-empty-wishlist',
  imports: [RouterLink, MatIcon, MatButton],
  template: `
    <div class="flex flex-col items-center justify-center">
      <mat-icon class="text-gray-400 transform scale-150 mb-4">favorite</mat-icon>
      <h1 class="mb-4">Your Wishlist is empty</h1>
      <button matButton="filled" routerLink="/products/all">Start Shopping</button>
    </div>
  `,
  styles: ``,
})
export class EmptyWishlist {

}
