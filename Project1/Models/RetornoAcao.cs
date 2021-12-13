using System;
using System.Runtime.Serialization;
using static Project1.Models.Enumeradores.Enumeradores;

namespace Project1.Models
{
    /// <summary>
    /// Retorno para todos os metodos de incluir, editar,  excluir do sistema
    /// </summary>
    [Serializable()]
    public class RetornoAcao<T>
    {
        public RetornoAcao()
        {
            this.Tipo = TipoMensagem.Ok;
        }
        /// <summary>
        /// Codigo de retorno
        /// Menor que 0 ocorreu erro.
        /// </summary>
        [DataMember]
        public int CodigoRetorno { get; set; }

        /// <summary>
        /// Mensagem de retorno
        /// </summary>
        [DataMember]
        public string MensagemRetorno { get; set; }

        /// <summary>
        /// Tipo de mensagem
        /// </summary>
        [DataMember]
        public TipoMensagem Tipo { get; set; }

        [DataMember]
        public T Objeto { get; set; }

        public int CodigoErro { get; set; }
    }

    public class RetornoAcao : RetornoAcao<object>
    {
    }
}
