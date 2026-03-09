import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private COLLECTION_KEY = 'moneywise_transactions';

  constructor(private storage: StorageService, private auth: AuthService) {}

 
  async saveTransaction(data: any) {
    const userId = await this.auth.getUserId();
    const currentData = await this.storage.get(this.COLLECTION_KEY) || [];
    
    const newItem = {
      ...data,
      userId: userId, 
      id: Date.now()
    };

    currentData.push(newItem);
    await this.storage.set(this.COLLECTION_KEY, currentData);
  }

 
  async getMyTransactions() {
    const userId = await this.auth.getUserId();
    const allData = await this.storage.get(this.COLLECTION_KEY) || [];
    return allData.filter((item: any) => item.userId === userId);
  }
}