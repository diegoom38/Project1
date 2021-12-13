CREATE TABLE [dbo].Produto
(
	[cdProduto] INT IDENTITY (1,1) NOT NULL,
	[NomeProduto] VARCHAR(128) NOT NULL,
	[CodigoProduto] VARCHAR(16) NOT NULL,
	[Preco] VARCHAR(32) NOT NULL,
	[PrecoPromocional] VARCHAR(32) NOT NULL,
	[ImageContent] VARCHAR(MAX) NOT NULL
	PRIMARY KEY CLUSTERED ([cdProduto] ASC)

)
