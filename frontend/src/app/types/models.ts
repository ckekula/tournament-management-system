export interface Organization {
    id: number;
    name: string;
    abbreviation: string;
}

export interface Tournament {
    id: number;
    name: string;
    year: number;
    abbreviation: string;
}

export interface Activity {
    id: number;
    name: string;
}

export interface _Event {
    id: number;
    name: string;
    category: string;
}