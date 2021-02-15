import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { Gif } from '../interfaces/gifs.interface';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
})
export class ResultadosComponent {

  get resultados(): Gif[] {
    return this.gifsService.resultados;
  }

  constructor( private gifsService: GifsService ) { }


}
