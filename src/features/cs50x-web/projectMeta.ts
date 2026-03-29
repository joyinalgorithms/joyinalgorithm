export const cs50xWebProjectMeta: Record<
  string,
  {
    slug: string;
    title: string;
    description: string;
    componentFile: string;
  }
> = {
  credit: {
    slug: "credit",
    title: "Credit",
    description:
      "Use this folder for the credit validator page, card-type helpers, and any form state related to the project.",
    componentFile: "CreditPage.tsx",
  },
  scrabble: {
    slug: "scrabble",
    title: "Scrabble",
    description:
      "Use this folder for the scrabble score UI, scoring helpers, and any local components for the game flow.",
    componentFile: "ScrabblePage.tsx",
  },
  readability: {
    slug: "readability",
    title: "Readability",
    description:
      "Use this folder for the text input UI and readability-calculation helpers.",
    componentFile: "ReadabilityPage.tsx",
  },
  caesar: {
    slug: "caesar",
    title: "Caesar",
    description:
      "Use this folder for the Caesar cipher form, validation, and encryption logic.",
    componentFile: "CaesarPage.tsx",
  },
  substitution: {
    slug: "substitution",
    title: "Substitution",
    description:
      "Use this folder for substitution-key validation, cipher helpers, and the page UI.",
    componentFile: "SubstitutionPage.tsx",
  },
  plurality: {
    slug: "plurality",
    title: "Plurality",
    description:
      "Use this folder for candidate state, voting logic, and result display components.",
    componentFile: "PluralityPage.tsx",
  },
  runoff: {
    slug: "runoff",
    title: "Runoff",
    description:
      "Use this folder for ranked voting rounds, elimination helpers, and result rendering.",
    componentFile: "RunoffPage.tsx",
  },
  filter: {
    slug: "filter",
    title: "Filter",
    description:
      "Use this folder for image filtering UI, canvas helpers, and pixel-processing logic.",
    componentFile: "FilterPage.tsx",
  },
  inheritance: {
    slug: "inheritance",
    title: "Inheritance",
    description:
      "Use this folder for family tree state, allele helpers, and any visualization pieces.",
    componentFile: "InheritancePage.tsx",
  },
  speller: {
    slug: "speller",
    title: "Speller",
    description:
      "Use this folder for dictionary lookup logic, text parsing helpers, and result UI.",
    componentFile: "SpellerPage.tsx",
  },
  dna: {
    slug: "dna",
    title: "DNA",
    description:
      "Use this folder for STR matching logic, sequence parsing helpers, and the comparison UI.",
    componentFile: "DnaPage.tsx",
  },
  trivia: {
    slug: "trivia",
    title: "Trivia",
    description:
      "Use this folder for quiz questions, answer validation, and trivia components.",
    componentFile: "TriviaPage.tsx",
  },
  homepage: {
    slug: "homepage",
    title: "Homepage",
    description:
      "Use this folder for the homepage layout and any sections or widgets specific to it.",
    componentFile: "HomepagePage.tsx",
  },
  birthday: {
    slug: "birthday",
    title: "Birthday",
    description:
      "Use this folder for the birthdays client UI and any API helpers if you connect it to a backend later.",
    componentFile: "BirthdayPage.tsx",
  },
  finance: {
    slug: "finance",
    title: "Finance",
    description:
      "Use this folder for the finance client app, portfolio views, trade forms, and backend integration helpers.",
    componentFile: "FinancePage.tsx",
  },
};
