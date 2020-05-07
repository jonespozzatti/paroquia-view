export class Endereco {

	constructor(
		public cep: string,
		public logradouro: string,
		public bairro: string,
		public cidade: string,
		public uf: string,
		public numero: string,
		public id?: string
	) {}

}