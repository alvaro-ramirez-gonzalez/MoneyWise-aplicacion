import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  constructor() {}

  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64, // Guardamos como string base64 para el Storage
      source: CameraSource.Prompt // Pregunta si Cámara o Galería
    });

    return `data:image/jpeg;base64,${image.base64String}`;
  }
}