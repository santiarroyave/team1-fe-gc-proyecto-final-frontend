import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class GestorImgService {

  // ATRIBUTOS
  storage: any;
  listaFotosPreview: string[];
  nombreCarpetaFire: string;
  listaUrl: string[];

  // CONSTRUCTOR
  constructor(){
    this.listaFotosPreview = [];
    this.nombreCarpetaFire = "images";
    this.listaUrl = [];

    // Inicializar app firebase
    initializeApp(environment.firebase);

    // Inicializar Cloud Storage y obtener referencia del servicio
    this.storage = getStorage();
  }

  uploadImage(image:File, nombreCarpeta:string){
    // Guarda una imagen en Firebase
    return new Promise<any>(async (resolve, reject) => {
      let nombre = this.generarNombre();
        // Sube la imagen
        const imgRef = ref(this.storage, `${nombreCarpeta}/${nombre}`);
  
        const uploadPromise = uploadBytes(imgRef, image)
        .then(async () => {
          // Obtiene la url
          const url = await getDownloadURL(imgRef);
          resolve(url);
        })
        .catch(error => {
          reject('Error al cargar las imágenes');
        });
    });
  }
  
  uploadImages(listaFotos: File[], nombreCarpeta:string): Promise<any>{
    // Guarda las imagenes de la lista en Firebase
    // Se ha usado "Promise.all" para esperar a que todas las promesas se resuelvan antes de resolver la promesa principal

    return new Promise<any>(async (resolve, reject) => {
      const promises = [];
      let nombre;

      for(let image of listaFotos){
        nombre = this.generarNombre();
        // Sube la imagen
        const imgRef = ref(this.storage, `${nombreCarpeta}/${nombre}`);
  
        const uploadPromise = uploadBytes(imgRef, image)
        .then(async () => {
          // Obtiene la url
          const url = await getDownloadURL(imgRef);
          this.listaUrl.push(url);
        })
        .catch(error => {
          reject('Error al cargar las imágenes');
        });

        promises.push(uploadPromise);
      }

      // Espera a que todas las promesas se resuelvan o se rechacen
      try{
        await Promise.all(promises);
        resolve(this.listaUrl);
      }catch(error){
        reject('Error al cargar las imágenes');
      }
    });
  }

  generarNombre():string {
    // Este método genera un nombre aleatorio de 100 digitos para la imagen
    let nombre = '';
    const longitud = 50;
  
    for (let i = 0; i < longitud; i++) {
      // Número aleatorio para elegir qué tipo de carácter incluir en el nombre
      let randomTemp = Math.floor(Math.random() * 3);
  
      if (randomTemp === 2) {
        // Mayúsculas
        nombre += String.fromCharCode(Math.floor(Math.random() * (91 - 65)) + 65);
      } else if (randomTemp === 1) {
        // Minúsculas
        nombre += String.fromCharCode(Math.floor(Math.random() * (123 - 97)) + 97);
      } else {
        // Números
        nombre += Math.floor(Math.random() * 10);
      }
    }
    return nombre;
  }

  verificarImagen(file: File){
    if (file.type.startsWith('image/')) {
      return true;
    }else{
      console.error('El archivo seleccionado no es una imagen válida.');
      return false;
    }
  }
}
