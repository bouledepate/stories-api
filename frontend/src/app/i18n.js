import { dictionaries } from './dictionaries';
import { state } from './state';

export const t = (key, vars = {}) => {
  const value = dictionaries[state.lang]?.[key] ?? dictionaries.ru[key] ?? key;
  return Object.entries(vars).reduce((acc, [name, valuePart]) => acc.replaceAll(`{${name}}`, String(valuePart)), value);
};
