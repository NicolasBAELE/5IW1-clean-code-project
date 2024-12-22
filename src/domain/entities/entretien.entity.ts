export class Entretien {
  constructor(
    public id: number,
    public motoClientId: number, // Association avec MotoClient
    public type: 'Préventif' | 'Curatif',
    public date: Date,
    public kilometrage: number,
  ) {}

  // Exemple de méthode métier
  public estEntretienPreventif(): boolean {
    return this.type === 'Préventif';
  }
}
