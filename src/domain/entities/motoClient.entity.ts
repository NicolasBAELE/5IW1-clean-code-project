// domain/entities/motoClient.entity.ts
import { Entretien } from './entretien.entity';
import { MotoType } from './motoType.entity';

export interface ProchainEntretien {
  kilometrage: number,
  date: Date,
  isCuratif: boolean,
  typeEntretien: 'Kilométrage' | 'Années'
}

export class MotoClient {
  constructor(
    public id: number,
    public motoTypeId: number,
    public kilometrage: number,
    public entretiens: Entretien[]
  ) {}

  // Méthode pour récupérer le dernier entretien
  getDernierEntretien(): Entretien | null {
    if (!this.entretiens || this.entretiens.length === 0) return null;
    return this.entretiens.reduce((latest, entretien) => {
      return new Date(entretien.date) > new Date(latest.date) ? entretien : latest;
    });
  }

  // Méthode pour vérifier si le prochain entretien est atteint (en kilométrage ou en années)
  getProchainEntretien(motoType: MotoType): ProchainEntretien {
    const dernierEntretien = this.getDernierEntretien();
    if (!dernierEntretien) {
      throw new Error('Aucun entretien enregistré pour cette moto.');
    }

    const dernierEntretienDate = new Date(dernierEntretien.date);
    const dernierEntretienKilometrage = dernierEntretien.kilometrage;

    const prochainEntretienKilometrage = dernierEntretienKilometrage + motoType.intervaleKm;
    const prochainEntretienTemps = new Date(dernierEntretienDate.getTime() + motoType.intervaleTemps);

    return {
      kilometrage: prochainEntretienKilometrage,
      date: prochainEntretienTemps,
      isCuratif: dernierEntretien.type === 'curatif',
      typeEntretien: prochainEntretienKilometrage <= this.kilometrage ? 'Kilométrage' : 'Années',
    };
  }
}
