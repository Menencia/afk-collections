import { Source } from 'src/app/shared/models/source';

export class IngameSource extends Source {
  name = 'ingame';

  calculateScore() {
    return 1;
  }
}
