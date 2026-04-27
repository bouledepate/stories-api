export const matchCardCatalog = [
  { code: 'peasant', name: 'Крестьянин', value: 0, copies: 2 },
  { code: 'guard', name: 'Стражник', value: 1, copies: 5 },
  { code: 'scout', name: 'Разведчик', value: 2, copies: 2 },
  { code: 'executioner', name: 'Палач', value: 3, copies: 2 },
  { code: 'lady', name: 'Дворянка', value: 4, copies: 2 },
  { code: 'rebel', name: 'Мятежник', value: 5, copies: 2 },
  { code: 'feudal_lord', name: 'Феодал', value: 6, copies: 2 },
  { code: 'bishop', name: 'Епископ', value: 7, copies: 1 },
  { code: 'queen', name: 'Королева', value: 8, copies: 1 },
  { code: 'king', name: 'Король', value: 9, copies: 1 },
];

export const findCatalogCard = (cardCode) => matchCardCatalog.find((card) => card.code === cardCode) || null;
