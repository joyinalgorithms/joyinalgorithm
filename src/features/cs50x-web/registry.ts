import { CreditPage } from './credit';
import { ScrabblePage } from './scrabble';
import { ReadabilityPage } from './readability';
import { CaesarPage } from './caesar';
import { SubstitutionPage } from './substitution';
import { PluralityPage } from './plurality';
import { RunoffPage } from './runoff';
import { FilterPage } from './filter';

export const cs50xWebProjectRegistry: Record<string, React.ComponentType> = {
  credit: CreditPage,
  scrabble: ScrabblePage,
  readability: ReadabilityPage,
  caesar: CaesarPage,
  substitution: SubstitutionPage,
  plurality: PluralityPage,
  runoff: RunoffPage,
  filter: FilterPage,
};
