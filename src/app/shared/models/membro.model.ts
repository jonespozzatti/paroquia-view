export class Membro {
    constructor( public nome:string,
                 public tipoParticipantePastoral:string,
                 public pastoralId: string,
                 public pessoaId: string,
                 public telefone?: string,
                 public id?: string) {}
}