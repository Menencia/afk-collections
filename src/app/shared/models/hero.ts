// const names = [
//   'temporal-cover',
//   'shadow-dancer',
//   'timeline-watch',
//   'spell-bondage',
//   'judgement-armor',
//   'sandstorm-fangs',
//   'captive-wings',
//   'oculus-diabolus',
//   'trader-s-vault',
//   'luminous-flight',
// ];

export interface Collection {
  name: string;
  level: number;
}

export interface HeroJson {
  name: string;
  colls: [string, number][];
  stats: string[][];
}

export class Hero {
  constructor(
    public name: string,
    public collections: Collection[],
    public offAffixes: string[],
    public defAffixes: string[],
  ) {}
}
