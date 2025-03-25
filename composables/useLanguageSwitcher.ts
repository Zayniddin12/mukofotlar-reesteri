export const useLanguageSwitcher = () => {
  const { locale, setLocale } = useI18n()
  const cookieLocale = useCookie('locale')

  const languagesList = [
    {
      name: 'Ўзбек',
      code: 'uzc',
    },
    {
      name: "O'zbek",
      code: 'uz',
    },
    {
      name: 'Enland',
      code: 'en',
    },
    {
      name: 'French',
      code: 'fr',
    },
    {
      name: 'German',
      code: 'de',
    },
    {
      name: 'Arabic',
      code: 'ar',
    },
    {
      name: 'Қазақ',
      code: 'kaz',
    },
    {
      name: 'Spanish',
      code: 'es',
    },
    {
      name: 'Қорақалпоқ',
      code: 'kaa',
    },
  ]

  const currentLanguage = computed(() =>
    languagesList.find((lang) => lang.code === locale.value)
  )

  function changeLocale(_locale: string) {
    setLocale(_locale)
    cookieLocale.value = _locale
    locale.value = _locale
  }

  return { currentLanguage, languagesList, changeLocale }
}
