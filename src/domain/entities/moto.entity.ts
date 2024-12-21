export class Moto {
    constructor(
      public id: string,
      public modele: string,
      public kilometrage: number,
      public dernierEntretien: Date,
      public status: 'disponible' | 'en entretien' | 'en panne'
    ) {}
  }