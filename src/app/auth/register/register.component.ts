import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/notification.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [FormsModule],
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  register(): void {
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
    };
    this.authService.register(userData).subscribe({
      next: () => {
        this.notificationService.success('Registro exitoso');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.notificationService.error('Error al registrar');
      },
    });
  }
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
