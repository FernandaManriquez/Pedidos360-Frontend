import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  imports: [RouterOutlet, RouterLink, CommonModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly msal = inject(MsalService);

  isLoggedIn(): boolean {
    return this.msal.instance.getAllAccounts().length > 0;
  }

  login(): void {
    this.msal.loginRedirect();
  }

  logout(): void {
    this.msal.logoutRedirect();
  }
}
