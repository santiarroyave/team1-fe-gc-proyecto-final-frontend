import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

@Component({
  selector: 'app-gestor-img',
  templateUrl: './gestor-img.component.html',
  styleUrls: ['./gestor-img.component.css']
})
export class GestorImgComponent{

  // # INFO FUNCIONAMIENTO
  // 1. Almacena el archivo de imagen en "listaFotosFile".
  // 2. Almacena la imagen base64 en "listaFotosPreview" para previsualizarlas.
  // 3. Cuando guardamos las fotos llama a uploadImages() para guardarlas en Firebase y almacena las URLs en "listaUrl".

  // Notas
  // - Hacer que las fotos se compriman
  // - Automatizar la eleccion de nombres para que no se repitan
  // - Añadir opción de borrar fotos

  storage: any;
  listaFotosPreview: string[];
  listaFotosFile: File[];
  nombreCarpetaFire: string;
  listaUrl: string[];

  constructor(){
    this.listaFotosPreview = [];
    this.listaFotosFile = [];
    this.nombreCarpetaFire = "images";
    this.listaUrl = [];
    
    // Inicializar app firebase
    initializeApp(environment.firebase);

    // Inicializar Cloud Storage y obtener referencia del servicio
    this.storage = getStorage();
  }
    
  borrarFoto(foto:string){
    // 1. Encuentra su posición dentro de la lista
    let posicion = this.listaFotosPreview.findIndex((busqueda:any) => busqueda == foto);
    // 2. Borra la imagen
    this.listaFotosPreview.splice(posicion, 1);
    this.listaFotosFile.splice(posicion, 1);
  }

  uploadImagesLocal($event:any){
    const files = $event.target.files;

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
  
        // Verifica que es una imagen
        if (this.verificarImagen(file)) {
  
          // Se almacena el archivo en la lista de imágenes
          this.listaFotosFile.push(file);
  
          // Convierte en base64 y se almacena en la lista de previsualizaciones
          this.addPreview(file);
  
          console.log("Foto añadida correctamente");
        }
      }
    }
  }

  verificarImagen(file: File){
    if (file.type.startsWith('image/')) {
      return true;
    }else{
      console.error('El archivo seleccionado no es una imagen válida.');
      return false;
    }
  }

  addPreview(file: File) {
    // Almacena preview de base64
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.listaFotosPreview.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  uploadImages():Promise<any>{
    // Guarda las imagenes de la lista en Firebase
    // Se ha usado "Promise.all" para esperar a que todas las promesas se resuelvan antes de resolver la promesa principal

    return new Promise<any>(async (resolve, reject) => {
      const nombreCarpeta = this.nombreCarpetaFire;
      const promises = [];
      let nombre;

      for(let image of this.listaFotosFile){
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

  generarNombre() {
    // Este método genera un nombre aleatorio de 100 digitos para la imagen
    let nombre = '';
    const longitud = 100;
  
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
}
