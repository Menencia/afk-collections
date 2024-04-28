import { Source } from 'src/app/shared/models/source';

const MAX_AFFIX_PRIORITIES = 4;

export class VlabSource extends Source {
  name = 'vlab';

  calculateScore(index: number) {
    return MAX_AFFIX_PRIORITIES - index;
  }
}
