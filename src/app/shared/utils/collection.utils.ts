import { TranslateService } from '@ngx-translate/core';

export abstract class CollectionUtils {
  public static getList(i18n: TranslateService) {
    return this.buildItems(
      [
        'zolrath',
        'saurus',
        'orthros',
        'daimon',
        'athalia',
        'tidus',
        'mehira',
        'oden',
        'rowan',
        'tasi',
      ],
      i18n,
    );
  }

  private static buildItems(codes: string[], i18n: TranslateService) {
    return codes.map((code) => {
      return { code, name: i18n.instant(`collection.${code}`) };
    });
  }
}
