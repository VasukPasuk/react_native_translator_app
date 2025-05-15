const LANGUAGES = [
  {
    label: 'Українська',
    value: 'uk'
  },
  {
    label: 'Англійська',
    value: 'en'
  },
  {
    label: 'Німецька',
    value: 'de'
  },
  {
    label: 'Французька',
    value: 'fr'
  },
  {
    label: 'Іспанська',
    value: 'es'
  },
  {
    label: 'Італійська',
    value: 'it'
  },
  {
    label: 'Польська',
    value: 'pl'
  },
  {
    label: 'Румунська',
    value: 'ro'
  },
  {
    label: 'Чеська',
    value: 'cs'
  },
  {
    label: 'Турецька',
    value: 'tr'
  },
  {
    label: 'Китайська',
    value: 'zh'
  },
  {
    label: 'Японська',
    value: 'ja'
  },
  {
    label: 'Арабська',
    value: 'ar'
  },
];

type LanguageCode = typeof LANGUAGES[number]['value']

export {
  LanguageCode,
  LANGUAGES
}