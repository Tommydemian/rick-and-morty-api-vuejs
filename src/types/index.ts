export type Character = {
    id: string;
    name: string; 
    status: string;
    species: string;
    type: string;
    gender: string; 
}

export enum Species {
    human = 'human',
    alien = 'alien',
}