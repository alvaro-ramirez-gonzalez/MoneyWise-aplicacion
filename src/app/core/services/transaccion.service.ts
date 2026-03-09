import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaccion } from '../models/transaccion.model';
import { StorageService } from './storage.service';
import { AuthService } from './auth.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  private _transacciones = new BehaviorSubject<Transaccion[]>([]);
  public transacciones$ = this._transacciones.asObservable();
  private readonly STORAGE_KEY = 'transacciones';

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.cargarTransacciones();
  }

 
  public async cargarTransacciones() {
    const user = await this.authService.getCurrentUser();
    const todas: any[] = await this.storageService.get(this.STORAGE_KEY) || [];
    
    if (user && user.email) {
      const misTransacciones = todas
        .filter(t => t.userId === user.email)
        .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
      
      this._transacciones.next(misTransacciones);
    } else {
      this._transacciones.next([]);
    }
  }

  async agregarTransaccion(nueva: Transaccion) {
    const user = await this.authService.getCurrentUser();
    
    if (!user) {
      this.presentarToast('Error: No hay sesión activa', 'danger');
      return;
    }

    const todas: any[] = await this.storageService.get(this.STORAGE_KEY) || [];
    
    const transaccionConDuenio = { 
      ...nueva, 
      id: Date.now().toString(),
      userId: user.email, 
      fecha: nueva.date || new Date().toISOString()
    };
    
    todas.push(transaccionConDuenio);
    await this.storageService.set(this.STORAGE_KEY, todas);
    
    await this.cargarTransacciones();
    this.presentarToast('Transacción guardada', 'success');
  }

  async eliminarTransaccion(id: string) {
    const todas: any[] = await this.storageService.get(this.STORAGE_KEY) || [];
    const listaActualizada = todas.filter(t => t.id !== id);
    
    await this.storageService.set(this.STORAGE_KEY, listaActualizada);
    await this.cargarTransacciones();
    this.presentarToast('Transacción eliminada', 'danger');
  }

  // --- NUEVO MÉTODO AGREGADO ---
  async actualizarTransaccion(id: string, actualizada: Transaccion) {
    const todas: any[] = await this.storageService.get(this.STORAGE_KEY) || [];
    const index = todas.findIndex(t => t.id === id);

    if (index !== -1) {
      todas[index] = { ...todas[index], ...actualizada };
      
      await this.storageService.set(this.STORAGE_KEY, todas);
      await this.cargarTransacciones();
      this.presentarToast('Transacción actualizada', 'success');
      return true;
    }
    return false;
  }

  private async presentarToast(mensaje: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }
}