using System.ComponentModel.DataAnnotations;

namespace Project1.Models
{
    public class Produto
    {
        [Key]
        public int cdProduto { get; set; }
        public string NomeProduto { get; set; }
        public string CodigoProduto { get; set; }
        public string Preco { get; set; }
        public string PrecoPromocional { get; set; }
        public string ImageContent  { get; set; }
    }
}

