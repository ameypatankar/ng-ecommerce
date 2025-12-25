import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { HeaderActions } from "../header-actions/header-actions";

@Component({
  selector: 'app-header',
  imports: [MatToolbar, HeaderActions],
  template: `
    <mat-toolbar class="elevated py-2 w-full">
      <div class="max-w-[1200px] mx-auto w-full">AP Store</div>
      <app-header-actions />
    </mat-toolbar>
  `,
  styles: ``,
})
export class Header {

}
