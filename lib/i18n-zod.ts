import i18next from 'i18next';
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';
// Import your language translation files
import translation from 'zod-i18n-map/locales/ko/zod.json';

i18next.init({
  lng: 'ko',
  resources: {
    ko: { zod: translation },
  },
});
z.setErrorMap(zodI18nMap);

export { z };
