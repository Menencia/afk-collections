import { TranslateService } from '@ngx-translate/core';

export abstract class AffixUtils {
  public static getList(i18n: TranslateService) {
    return [...this.getOffensiveList(i18n), ...this.getDefensiveList(i18n)];
  }

  private static getOffensiveList(i18n: TranslateService) {
    return this.buildItems(
      [
        'atk',
        'cda',
        'crit',
        'err',
        'erosion',
        'f-atk',
        'f-erosion',
        'is',
        'll',
        'mp',
        'pp',
        'prf',
      ],
      i18n,
    );
  }

  private static getDefensiveList(i18n: TranslateService) {
    return this.buildItems(
      [
        'armor',
        'buffer',
        'cbr',
        'cdr',
        'def',
        'diss',
        'dmg-r',
        'f-buffer',
        'f-def',
        'f-hp',
        'heal',
        'hp',
        'ty',
      ],
      i18n,
    );
  }

  private static buildItems(codes: string[], i18n: TranslateService) {
    return codes.map((code) => {
      return { code, name: i18n.instant(`affix.${code}`) };
    });
  }
}
