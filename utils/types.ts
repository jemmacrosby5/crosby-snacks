// Raw types
export type Country = {
  id: number;
  code: string;
  name: string;
};

// export type User = {
//   _id: string;
//   name: string;
//   picUrl: string;
//   clerkId: string;
// };

// Edited in fetch types
export type MongoDecimal = {
  $numberDecimal: string;
};


export type LeaderboardCountry = {
  name: string;
  code: string;
};

export type LeaderboardEntry = {
  tripId: number;
  description: string | null;
  date: Date;
  scoreCount: number;
  country: LeaderboardCountry;
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
