import { Component } from '@angular/core';
import db from '../../../assets/db.json'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  database: any = db;
}
