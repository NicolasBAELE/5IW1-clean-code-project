export class Entretien {
    constructor(
      public id: string,
      public motoId: string,
      public type: 'préventif' | 'curatif',
      public date: Date,
      public kilometrage: number,
      public description: string
    ) {}
  }
  