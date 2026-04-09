import { CreditPage } from './credit';
import { ScrabblePage } from './scrabble';
import { ReadabilityPage } from './readability';
import { CaesarPage } from './caesar';
import { SubstitutionPage } from './substitution';
import { PluralityPage } from './plurality';
import { RunoffPage } from './runoff';
import { FilterPage } from './filter';
import { InheritancePage } from './inheritance';
import { SpellerPage } from './speller';
import { DnaPage } from './dna';
import { TriviaPage } from './trivia';
import { HomepagePage } from './homepage';
import { BirthdaysPage } from './birthdays';
import { FinancePage } from './finance';

export const cs50xWebProjectRegistry: Record<string, React.ComponentType> = {
  credit: CreditPage,
  scrabble: ScrabblePage,
  readability: ReadabilityPage,
  caesar: CaesarPage,
  substitution: SubstitutionPage,
  plurality: PluralityPage,
  runoff: RunoffPage,
  filter: FilterPage,
  inheritance: InheritancePage,
  speller: SpellerPage,
  dna: DnaPage,
  trivia: TriviaPage,
  homepage: HomepagePage,
  birthdays: BirthdaysPage,
  birthday: BirthdaysPage,
  finance: FinancePage,
};
