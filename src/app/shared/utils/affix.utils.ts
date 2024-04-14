export abstract class AffixUtils {
  public static getList() {
    return [...AffixUtils.getOffensiveList(), ...AffixUtils.getDefensiveList()];
  }

  private static getOffensiveList() {
    return [
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
    ];
  }

  private static getDefensiveList() {
    return [
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
    ];
  }
}
