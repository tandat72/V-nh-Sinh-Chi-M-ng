
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
  exp: number;
  age: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  attack: number;
  defense: number;
  luck: number;
  sect: string;
  spiritualRoot: SpiritualRoot;
  weapon: string;
  armor: string;
}

export interface GameEvent {
    message: string;
    type: 'system' | 'cultivate' | 'breakthrough' | 'event' | 'danger' | 'encounter';
    timestamp: Date;
}

export interface GeminiEventEffect {
    expGained?: number;
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
