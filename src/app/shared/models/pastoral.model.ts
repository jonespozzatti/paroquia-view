import { Membro } from './membro.model';

export class Pastoral {

	constructor(public nome: string,
				public descricao: string,
				public email: string,
				public paroquiaId: string,
				public coordenadorId?: string,
				public membros?: Membro[],
				public id?: string) {}

}