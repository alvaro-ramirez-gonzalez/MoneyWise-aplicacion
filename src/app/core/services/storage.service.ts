import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private _storageReady: Promise<void>;

  constructor(private storage: Storage) {
   
    this._storageReady = this.init();
  }

  async init() {
    try {
      const storage = await this.storage.create();
      this._storage = storage;
    } catch (error) {
      console.error('Error inicializando Storage:', error);
    }
  }

  public async set(key: string, value: any) {
    await this._storageReady; 
    return await this._storage?.set(key, value);
  }

  public async get(key: string): Promise<any> {
    await this._storageReady; 
    return await this._storage?.get(key);
  }

  public async remove(key: string) {
    await this._storageReady;
    await this._storage?.remove(key);
  }

  public async clear() {
    await this._storageReady;
    await this._storage?.clear();
  }
}