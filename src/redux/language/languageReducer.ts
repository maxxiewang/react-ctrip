// 用于i18n的语言切换
import i18n from 'i18next'
import { CHANGE_LANGUAGE, ADD_LANGUAGE, languageActionTypes } from './languageActions'
// 在redux中，不管是reducer还是action都是纯函数
// reducer指的就是数据处理的过程
export interface LanguageState {
  language: 'zh' | 'en',
  languageList: { name: string, code: string }[]
}

const defaultState: LanguageState = {
  language: 'zh',
  languageList: [
    { name: '中文', code: 'zh' },
    { name: 'Eng', code: 'en' },
    { name: 'FR', code: 'fr' }
  ]
}

/*
 关于 React 在导出之前给变量赋一个箭头函数作为模块default import/no-anonymous-default-export 的报错问题
 改为 export default fn 这种形式
 */
const fn = (state = defaultState, action: languageActionTypes) => {

  //! 这里面需要注意, 不要去修改原来的state, 都是new一个再去返回
  switch (action.type) {
    case CHANGE_LANGUAGE:
      i18n.changeLanguage(action.payload)
      return { ...state, language: action.payload }

    case ADD_LANGUAGE:
      return {
        ...state,
        languageList: [
          ...state.languageList, action.payload
        ]
      }
    default:
      return state;
  }
}

export default fn

