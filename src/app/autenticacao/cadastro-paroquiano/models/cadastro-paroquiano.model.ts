import { Endereco } from 'src/app/shared';
export class CadastroParoquiano {

	constructor(
		public nome: string,
		public email: string,
		public senha: string,
		public cpf: string,
		public sexo: string, 
		public dataNasc: string,
		public paroquia_id: string,
		public endereco: Endereco,
		public telefoneCelular?: string,
		public telefoneFixo?: string,
		public responsavel_id?: string,
		public id?: string
	) {}

}