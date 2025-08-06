import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from './navbar/navbar';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterOutlet, Navbar,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 
}
