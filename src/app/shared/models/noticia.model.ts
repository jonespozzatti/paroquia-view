export class Noticia {

	constructor(public nome: string,
				public descricao: string,
                public paroquiaId: string,
                public ativo: boolean,
                public dataApresentacao: string,
				public id?: string) {}
}