import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this._isAuthenticated.asObservable();

  constructor(
    private storage: StorageService, 
    private router: Router
  ) {
    this.checkAuth();
  }

  
  async checkAuth() {
    const user = await this.getCurrentUser();
    this._isAuthenticated.next(!!user);
  }

  
  async getCurrentUser() {
    return await this.storage.get('user_session');
  }

  
  async getUserId(): Promise<string | null> {
    const user = await this.getCurrentUser();
    return user ? user.email : null;
  }

 
  async login(email: string, pass: string) {
    if (email && pass) {
     
      await this.storage.set('user_session', { email });
      this._isAuthenticated.next(true);
      return true;
    }
    return false;
  }

  
  async logout() {
    
    await this.storage.remove('user_session');
    
   
    this._isAuthenticated.next(false);
    
    
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}