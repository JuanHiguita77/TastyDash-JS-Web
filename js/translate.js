//GOOGLE TRANSLATE
googleTranslateElementInit()

function googleTranslateElementInit() {
  new google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: 'es,en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, gaTrack: true }, 'google_translate_element');
}
