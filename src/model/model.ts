export interface AutoCompleteOption {
  name: string;
  id: number;
}

export interface Search {
  show: AutoCompleteOption;
}

export interface Show {
  name: string;
  genres: string[];
  type: string;
  rating: { average: number };
}
