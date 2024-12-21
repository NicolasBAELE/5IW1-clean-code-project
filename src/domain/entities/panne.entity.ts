export class Panne {
    constructor(
      public id: string,
      public motoId: string,
      public description: string,
      public date: Date,
      public réparée: boolean
    ) {}
  }
  