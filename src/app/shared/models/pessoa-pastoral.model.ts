export class PessoaPastoral {
    constructor( 
                 public pastoral_id: number,
                 public pessoa_id: number,
                 public tipoParticipantePastoral?: string,
                 public id?: string) {}
}