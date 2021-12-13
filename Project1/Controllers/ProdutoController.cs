using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project1.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using static Project1.Models.Enumeradores.Enumeradores;

namespace StreamShop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutoController : ControllerBase
    {
        private readonly Contexto _contexto;

        public ProdutoController(Contexto context)
        {
            _contexto = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Produto>>> GetAll()
        {
            List<Produto> produtos = await _contexto.Produto.ToListAsync();
            return produtos;
        }

        [HttpGet("{cdProduto}")]
        //Método Obter todos os produtos
        public async Task<ActionResult<Produto>> GetProdutoById(int cdProduto)
        {
            Produto produto = await _contexto.Produto.FindAsync(cdProduto); 
            if (produto == null)
                return NotFound();

            return produto;
        }

        [HttpPost]       
        //Método de Inserção de produto
        public async Task<ActionResult<Produto>> InsertProduto(Produto produto)
        {
            RetornoAcao<Produto> retorno = new RetornoAcao<Produto>();
            try
            {
                await _contexto.Produto.AddAsync(produto);
                await _contexto.SaveChangesAsync();

                retorno.Objeto = produto;
                retorno.MensagemRetorno = "Produto Inserido com Sucesso";
                retorno.Tipo = TipoMensagem.Ok;
            }
            catch (System.Exception)
            {
                retorno.Tipo = TipoMensagem.Atencao;
                retorno.MensagemRetorno = $"Ocorreu um Erro ao Salvar seu Produto {produto?.NomeProduto}, verifique os dados do formulário.";
                return NotFound(retorno);
            }            

            return Ok(retorno);
        }

        [HttpPut]
        //Método de Edição de produto
        public async Task<ActionResult<Produto>> EditProduto(Produto produto)
        {
            RetornoAcao<Produto> retorno = new RetornoAcao<Produto>();
            try
            {
                _contexto.Produto.Update(produto);
                await _contexto.SaveChangesAsync();

                retorno.Objeto = produto;
                retorno.MensagemRetorno = "Produto Editado com Sucesso"; 
                retorno.Tipo = TipoMensagem.Ok;
            }
            catch (System.Exception)
            {
                retorno.Tipo = TipoMensagem.Atencao;
                retorno.MensagemRetorno = $"Ocorreu um Erro ao Editar seu Produto {produto?.NomeProduto}, verifique os dados do formulário.";
                return NotFound(retorno);
            }
            return Ok(retorno) ;
        }

        [HttpDelete("{cdProduto}")]
        //Método Remoção de produto
        public async Task<ActionResult> DeleteProduto(int cdProduto)
        {
            RetornoAcao<Produto> retorno = new RetornoAcao<Produto>();
            try
            {
                Produto produto = await _contexto.Produto.FindAsync(cdProduto);
                if (produto != null)
                {
                    _contexto.Remove(produto);
                    await _contexto.SaveChangesAsync();

                    retorno.MensagemRetorno = "Produto Editado com Sucesso";
                    retorno.Tipo = TipoMensagem.Ok;
                }
            }
            catch (System.Exception)
            {
                retorno.Tipo = TipoMensagem.Atencao;
                retorno.MensagemRetorno = $"Ocorreu um Erro ao Deletar seu Produto.";
                return NotFound(retorno);
            }

            return Ok(retorno);
        }
    }
}

