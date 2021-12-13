import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../service/produto.service';
import { Produto } from './Produto';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-produto',
  templateUrl: './addProduto.component.html',
  styleUrls: ['./addProduto.component.css']
})

export class AddProdutoComponent {
  formulario: any;
  public imagePath;
  imgURL: any;
  public message: string;
  public enviarFormulario: string;

  constructor(private produtoService: ProdutoService,
    private currencyPipe: CurrencyPipe,
    private router: Router,
    private rotaAtivada: ActivatedRoute) {
  }

  ngOnInit(): void {

    let param = this.rotaAtivada.snapshot.queryParams['cdProduto'];
    let cdProduto = parseInt(param);

    this.formulario = new FormGroup({
      cdProduto : new FormControl(0),
      NomeProduto: new FormControl(null, Validators.required),
      CodigoProduto: new FormControl(null, Validators.required),
      Preco: new FormControl(null, Validators.required),
      PrecoPromocional: new FormControl(null, Validators.required),
      ImageContent: new FormControl(null, Validators.required),
    })


    if (cdProduto > 0) {
      this.produtoService.GetProdutoById(cdProduto).subscribe((resultado) => {
        if (resultado) {
          this.formulario.get("cdProduto").patchValue(resultado['cdProduto'], { emitEvent: false })
          this.formulario.get("NomeProduto").patchValue(resultado['nomeProduto'], { emitEvent: false })
          this.formulario.get("CodigoProduto").patchValue(resultado['codigoProduto'], { emitEvent: false })
          this.formulario.get("Preco").patchValue(resultado['preco'], { emitEvent: false })
          this.formulario.get("PrecoPromocional").patchValue(resultado['precoPromocional'], { emitEvent: false })
          this.formulario.get("ImageContent").patchValue(resultado['imageContent'], { emitEvent: false })

          this.imgURL = resultado['imageContent'];
        }
      })
    }

    this.formulario.get("Preco").valueChanges.subscribe(preco => {
      if (preco) {
        const PrecoFormat = this.currencyPipe.transform(preco.replace(/\D/g, '').replace(/^0+/, ''), 'BRL', 'symbol', '1.0-0')
        this.formulario.get("Preco").patchValue(PrecoFormat, { emitEvent: false })
      }
    })

    this.formulario.get("PrecoPromocional").valueChanges.subscribe(precoprom => {
      if (precoprom) {
        const PrecoFormat = this.currencyPipe.transform(precoprom.replace(/\D/g, '').replace(/^0+/, ''), 'BRL', 'symbol', '1.0-0')
        this.formulario.get("PrecoPromocional").patchValue(PrecoFormat, { emitEvent: false })
      }
    })
  }


  preview(files) {

    this.message = "";
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Apenas Arquivos do tipo Imagem.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.formulario.get("ImageContent").patchValue(this.imgURL, { emitEvent: false })
    }
  }

  EnviarFormulario(): void {
    this.enviarFormulario = "";
    const produto: Produto = this.formulario.value;
    if (produto['cdProduto'] == 0) {
      this.produtoService.InsertProduto(produto).subscribe((resultado) => {
        if (resultado['tipo'] == 0) {
          this.router.navigate(['/produto']);
          return;
        }
        this.enviarFormulario = resultado['mensagemRetorno'].toString();
        return;
      })
    }
    else {
      this.produtoService.EditProduto(produto).subscribe((resultado) => {
        if (resultado['tipo'] == 0) {
          this.router.navigate(['/produto']);
          return;
        }
        this.enviarFormulario = resultado['mensagemRetorno'].toString();;
        return;
      })
    }
  }
}
