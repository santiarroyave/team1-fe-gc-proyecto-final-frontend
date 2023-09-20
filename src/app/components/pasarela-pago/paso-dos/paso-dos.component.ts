import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from 'src/app/models/Reserva';
import { Usuario } from 'src/app/models/Usuario';
import { OfertasService } from 'src/app/services/ofertas.service';
import { ReservasService } from 'src/app/services/reservas.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.css']
})
export class PasoDosComponent {
  oferta: any;
  precio: any;
  reserva: Reserva ={
    idOferta:0,
    idUsuario:0,
    fechaInicio:'',
    fechaFin:'',
    estado:''
  };

  constructor(private route: ActivatedRoute, private ofertasService: OfertasService, private tokenService: TokenStorageService, private reservasService: ReservasService, private router: Router){}

  ngOnInit(): void {
    let elementId:number = 0;
    this.route.params.subscribe((params) => {
      elementId = Number(params['id']);
      this.ofertasService.getOfertaById(elementId).subscribe(res => {
        this.oferta = res;
        this.reserva.idOferta = elementId;
        this.reserva.idUsuario = this.tokenService.getUser().id;
        if(this.route.snapshot.queryParamMap.get('fechaFin') != "") this.reserva.fechaFin = this.route.snapshot.queryParamMap.get('fechaFin')!!;
        if(this.route.snapshot.queryParamMap.get('fechaIncio') != "") this.reserva.fechaInicio = this.route.snapshot.queryParamMap.get('fechaInicio')!!;
        this.reserva.estado = this.route.snapshot.queryParamMap.get('estado')!!;
        this.precio = this.route.snapshot.queryParamMap.get('precio')!!;
      });      
    });
  }

  pagar(){
    this.reservasService.createReserva(this.reserva).subscribe(()=>{},()=>{},
    ()=>{
      let user:Usuario = this.tokenService.getUser();
      user.experiencia = Math.floor(user.experiencia + this.precio * 0.1);       

      switch(true){
        case user.experiencia >= 500: 
          user.idNivel = 2;
          user.nivel = 'Oro'
          break;
        case user.experiencia >= 1500:
          user.idNivel = 3;
          user.nivel = 'Platino'
          break;
        case user.experiencia >= 3000:
          user.idNivel = 4;
          user.nivel = 'Diamente'
          break;
      }
      this.tokenService.saveUser(user);
      const updatedUser:Usuario = this.tokenService.getUser();
      this.reservasService.updateUserExperience(updatedUser).subscribe();
      this.router.navigate(['/reservas']);
    });
  }
}
