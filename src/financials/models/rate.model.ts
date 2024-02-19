export const RATE_FREQUENCIES = ['hourly'] as const;

export type RateFrequency = (typeof RATE_FREQUENCIES)[number];

export interface Rate {
  id: string;
  amount: number; // Amount in smallest denomination.
  frequency: RateFrequency;
}
