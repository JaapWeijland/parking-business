export const SPACE_AVAILABILITIES = ['public', 'private'] as const;

export type SpaceAvailability = (typeof SPACE_AVAILABILITIES)[number];
