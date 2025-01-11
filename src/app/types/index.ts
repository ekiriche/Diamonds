export interface Game {
    id: number;
    name: string;
    background_image: string;
    released: string;
    rating: number;
    platforms: Array<{
      platform: {
        id: number;
        name: string;
      };
    }>;
    website: string;
  }

export interface GamesResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Game[];
}

export interface Creator {
id: number;
name: string;
image: string;
games_count: number;
rating: number;
positions: Array<{
    id: number;
    name: string;
}>;
}

export interface CreatorsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Creator[];
}