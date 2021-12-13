
import { Component } from '@angular/core';
import { ProdutoService } from '../service/produto.service';
import { Produto } from './produto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent {

  produtos: Produto[];
  closeResult: string;
  cdProduto: number = 0;

  constructor(private produtoService: ProdutoService,
        private router: Router) {
  }

  ngOnInit(): void {
    this.produtoService.GetAll().subscribe(resultado => {
      this.produtos = resultado;
    })
  }

  setProdutoDelete(cdProduto) {
    this.cdProduto = cdProduto;
  }

  deletarProduto(cdProduto) {
    console.log(cdProduto)
    this.produtoService.DeleteProduto(cdProduto).subscribe(resultado => {
      if (resultado['tipo'] == 0) {
        this.router.navigate(['/produto']);
      }
      this.produtoService.GetAll().subscribe(resultado => {
        this.produtos = resultado;
      })
    })
  }
}
