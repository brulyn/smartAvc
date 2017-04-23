import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service'

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [AuthService]
})

export class LoginComponent {
    error: any;

    constructor(private auth:AuthService) {

    }

    login(f) {
        this.auth.signinUser(f.value);
    }
}