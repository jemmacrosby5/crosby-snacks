export interface Country {
  id: number;
  name: string;
  code: string;
  twoLetterCode: string;
};

export interface CountryTrimmed {
    name: string;
  code: string;
  twoLetterCode: string;
}

export interface LeaderboardEntry {
  tripId: number;
  description: string | null;
  date: Date;
  scoreCount: number;
  country: CountryTrimmed;
  participants: User[];
  avgHigh: number;
  avgLow: number;
  avgDiff: number;
};

export interface User{
  id: string;
  name: string;
  picUrl: string | null;
}

export interface TripSummary {
  _id: string;
  countryId: string;
  date: string;
}

export interface Score {
  _id: string;
  userId: User;
  tripId: TripSummary;
  highScore: number;
  lowScore: number;
}
