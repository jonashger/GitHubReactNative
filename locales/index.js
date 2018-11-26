import I18n from 'react-native-i18n'
import en from './en-US'
import ptBR from './pt-BR'

I18n.fallbacks = true

I18n.translations = {
  en,
  'pt-BR': ptBR,
}

I18n.locale = 'pt-BR'

const translate = key => I18n.t(key)

export default translate