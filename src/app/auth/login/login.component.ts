import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/notification.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  login(): void {
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          this.authService.saveToken(response.token);
          // Mantener la línea con .data según la estructura de la respuesta
          this.authService.saveSportEvents(response.sportEvents.data);
          this.notificationService.success('Inicio de sesión exitoso');
          this.router.navigate(['/events']);
        },
        error: () => {
          this.notificationService.error('Credenciales incorrectas');
        },
      });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
