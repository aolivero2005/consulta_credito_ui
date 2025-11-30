import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Consulta de Crédito');

  // Search properties
  protected searchValue = '';
  protected results: any[] = [];
  protected loading = false;
  protected error = '';
  protected notFoundMessage = '';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  // Search by NFS-e
  protected searchByNfse(): void {
    if (!this.searchValue.trim()) {
      this.error = 'Por favor, insira um número NFS.e';
      return;
    }

    this.loading = true;
    this.error = '';
    this.results = [];

    this.http.get<any>(`/api/creditos/${this.searchValue}`).subscribe({
      next: (data) => {
        // Handle both single object and array responses
        if (Array.isArray(data)) {
          this.results = data;
        } else if (data && typeof data === 'object') {
          // If response is a single object, convert it to an array
          this.results = [data];
        } else {
          // Handle empty or invalid responses
          this.results = [];
          this.error = 'Formato de resposta inesperado';
        }

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.error = err.message || 'Erro ao procurar NFS-e';
        this.cdr.detectChanges();
      }
    });
  }

  // Search by Credit Number
  protected searchByCredit(): void {
    if (!this.searchValue.trim()) {
      this.error = 'Por favor, insira um número de crédito.';
      return;
    }

    this.loading = true;
    this.error = '';
    this.notFoundMessage = '';
    this.results = [];

    this.http.get<any>(`/api/creditos/credito/${this.searchValue}`).subscribe({
      next: (data) => {
        // Handle both single object and array responses
        if (Array.isArray(data)) {
          this.results = data;
        } else if (data && typeof data === 'object') {
          // If response is a single object, convert it to an array
          this.results = [data];
        } else {
          // Handle empty or invalid responses
          this.results = [];
          this.error = 'Formato de resposta inesperado';
        }

        this.notFoundMessage = '';
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        if (err && err.status === 404) {
          this.results = [];
          this.error = '';
          this.notFoundMessage = (err.error && err.error.message) ? err.error.message : 'Nenhum resultado foi encontrado para a pesquisa.';
        } else {
          this.notFoundMessage = '';
          this.error = err?.message || 'Erro ao procurar o número do crédito';
        }
        this.cdr.detectChanges();
      }
    });
  }
}
