// Raw types
export type Country = {
  _id: string;
  code: string;
  name: string;
};

export type User = {
  _id: string;
  name: string;
  picUrl: string;
  clerkId: string;
};

// Edited in fetch types
export type MongoDecimal = {
  $numberDecimal: string;
};

export type LeaderboardParticipant = {
  _id: string;
  name: string;
  picUrl: string;
};

export type LeaderboardCountry = {
  name: string;
  code: string;
};

export type LeaderboardEntry = {
  _id: string;
  tripId: string;
  description?: string;
  date: string;
  scoreCount: number;
  country: LeaderboardCountry;
  participants: LeaderboardParticipant[];
  avgHigh: MongoDecimal;
  avgLow: MongoDecimal;
  diff: MongoDecimal;
};

export interface UserSummary {
  _id: string;
  name: string;
  picUrl: string;
}

export interface TripSummary {
  _id: string;
  countryId: string;
  date: string;
}

export interface Score {
  _id: string;
  userId: UserSummary;
  tripId: TripSummary;
  highScore: number;
  lowScore: number;
}
