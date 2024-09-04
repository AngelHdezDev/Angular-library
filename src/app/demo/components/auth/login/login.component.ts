import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/services/auth.service';  // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];
    email: string = '';
    password: string = '';
    rememberMe: boolean = false;

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,  // Inyecta el AuthService
        private router: Router  // Inyecta el Router para la navegación
    ) { }

    onLogin() {
        this.authService.login(this.email, this.password).subscribe({
            next: (response) => {
                console.log('Login exitoso:', response);
                localStorage.setItem('auth_token', response.access_token);
                this.router.navigate(['/']); 
            },
            error: (error) => {
                console.error('Error de login:', error);
                // Maneja el error de inicio de sesión aquí
            }
        });
    }
}
