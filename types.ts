
export interface SpiritualRoot {
  name: string;
  modifier: number;
  description: string;
}

export interface Realm {
  id: number;
  name: string;
  required: number;
  lifespanBonus: number;
}

export interface Player {
  name: string;
  realm: Realm;
  cultivation: number;
  lifespan: number;
  spiritualRoot: SpiritualRoot;
}

export interface GameEvent {
    message: string;
    type: 'system' | 'cultivate' | 'breakthrough' | 'event' | 'danger' | 'encounter';
    timestamp: Date;
}

export interface GeminiEventEffect {
    tuviGained?: number;
    thoNguyenChange?: number;
}

export interface GeminiEventResponse {
    eventName: string;
    description: string;
    effect: GeminiEventEffect;
}

export interface EncounterChoice {
  text: string;
  outcome: string;
  effect: GeminiEventEffect;
}

export interface GeminiEncounterResponse {
  description: string;
  choices: EncounterChoice[];
}
