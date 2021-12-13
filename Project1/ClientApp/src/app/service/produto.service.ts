import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../produto/produto';
import { Component, Inject } from '@angular/core';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({

  providedIn: 'root'

})
export class ProdutoService {
  url = ''

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.url = `${baseUrl}api/Produto`;
  }

  GetAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.url);
  }

  GetProdutoById(cdProduto: number): Observable<Produto> {
    const apiUrl = `${this.url}/${cdProduto}`
    return this.http.get<Produto>(apiUrl);
  }

  InsertProduto(produto: Produto): Observable<any> {

    return this.http.post<Produto>(this.url, produto, httpOptions)
  }

  EditProduto(produto: Produto): Observable<any> {
    return this.http.put<Produto>(this.url,produto,httpOptions)
  }

  DeleteProduto(cdProduto: number): Observable<any> {
    const apiUrl = `${this.url}/${cdProduto}`
    return this.http.delete<number>(apiUrl, httpOptions)
  }
}
