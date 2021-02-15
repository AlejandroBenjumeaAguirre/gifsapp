import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SerchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey = 'rAJDI3a5RJFZxIgYC0KO1kDxHW9dCLy8';
  private servicioUrl = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {
    if ( localStorage.getItem('historial')) {
      // tslint:disable-next-line:no-non-null-assertion
      this._historial = JSON.parse( localStorage.getItem('historial')! );
    }

    // tslint:disable-next-line:no-non-null-assertion
    this.resultados = JSON.parse(localStorage.getItem('resultado')!) || [];
  }

  buscarGifs( query: string = '' ): void {

    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SerchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe( (resp) => {
        this.resultados = resp.data;
        localStorage.setItem('resultado', JSON.stringify(this.resultados));
      });
  }

}
