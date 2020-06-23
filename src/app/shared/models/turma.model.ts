export class Turma {

	constructor(
        public descricao: string,
        public diaSemana: string[],
        public horarios: string[],
        public dataInicio: string,
        public dataFim: string,
        public cursoId: string,
        public id?: string,
        public professorId?: string) {}
}