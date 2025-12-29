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
