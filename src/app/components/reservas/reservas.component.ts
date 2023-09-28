import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservasOfertas } from 'src/app/models/ReservasOfertas';
import { ReservasService } from 'src/app/services/reservas.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit{
  reservas!: ReservasOfertas[];
  id_user!: number;

  constructor(private reservasService:ReservasService, private tokenService: TokenStorageService, private router: Router) {
  }

  ngOnInit(): void {
      this.id_user = this.tokenService.getUser().id;
      if(this.id_user != null){
        this.reservasService.getReservasByUserId(this.id_user).subscribe( res => {
          this.reservas = res;
          console.log(res);
        });
      }
  }

  redirectToDetalle(id: number) {
    this.router.navigate(['/reservas/', id]);
  }
}
