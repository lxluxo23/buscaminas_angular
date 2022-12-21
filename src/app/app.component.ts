import { Component, OnInit } from '@angular/core';

export interface ICasilla {
  abierta: boolean;
  esMina: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  casillas: ICasilla[][]; // Matriz de casillas
  constructor() {
    // Inicializamos la matriz de casillas
    this.casillas = [];
    for (let i = 0; i < 8; i++) {
      this.casillas[i] = [];
      for (let j = 0; j < 8; j++) {
        this.casillas[i][j] = {
          abierta: false,
          esMina: false
        };
      }
    }

    // Colocamos las minas aleatoriamente
    for (let i = 0; i < 10; i++) {
      const fila = Math.floor(Math.random() * 8);
      const columna = Math.floor(Math.random() * 8);
      this.casillas[fila][columna].esMina = true;
    }
  }
  ngOnInit(): void {
    console.log(this.casillas)
  }

  // Método que se ejecuta al hacer click en una casilla
  mostrarCasilla(fila: number, columna: number) {
    // Si la casilla ya está abierta, no hacemos nada
    if (this.casillas[fila][columna].abierta) {
      return;
    }

    // Abrimos la casilla
    this.casillas[fila][columna].abierta = true;

    // Si la casilla es una mina, mostramos un mensaje y terminamos el juego
    if (this.casillas[fila][columna].esMina) {
      console.log('¡Has perdido! ¡Esta es una mina!');
      return;
    }

    // Si la casilla no es una mina, mostramos el número de minas alrededor
    const minasAlrededor = this.contarMinasAlrededor(fila, columna);
    console.log(`Esta casilla tiene ${minasAlrededor} minas alrededor.`);

    if (this.contarMinasAlrededor(fila, columna) === 0) {
      this.abrirCasillasAdyacentes(fila, columna);
    }
  }

  // Método que cuenta el número de minas alrededor de una casilla
  // Método que cuenta el número de minas alrededor de una casilla (continuación)
  contarMinasAlrededor(fila: number, columna: number): number {
    let minasAlrededor = 0;

    // Recorremos las casillas alrededor de la casilla dada y contamos las minas
    for (let i = fila - 1; i <= fila + 1; i++) {
      for (let j = columna - 1; j <= columna + 1; j++) {
        // Si la casilla no está dentro de los límites del tablero, se salta
        if (i < 0 || i >= 8 || j < 0 || j >= 8) {
          continue;
        }

        // Si la casilla es una mina, se aumenta el contador
        if (this.casillas[i][j].esMina) {
          minasAlrededor++;
        }
      }
    }
    return minasAlrededor;
  }
  abrirCasillasAdyacentes(fila: number, columna: number) {
    // Recorre las casillas adyacentes a la casilla dada
    for (let i = fila - 1; i <= fila + 1; i++) {
      for (let j = columna - 1; j <= columna + 1; j++) {
        // Si la casilla no está dentro de los límites del tablero, se salta
        if (i < 0 || i >= 8 || j < 0 || j >= 8) {
          continue;
        }

        // Si la casilla no está abierta y no es una mina, se abre
        if (!this.casillas[i][j].abierta && !this.casillas[i][j].esMina) {
          this.casillas[i][j].abierta = true;

          // Si la casilla no tiene minas alrededor, se abren las casillas adyacentes también
          if (this.contarMinasAlrededor(i, j) === 0) {
            this.abrirCasillasAdyacentes(i, j);
          }
        }
      }
    }
  }

}
