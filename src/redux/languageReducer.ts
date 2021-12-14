// 用于i18n的语言切换
import i18n from 'i18next'
// 在redux中，不管是reducer还是action都是纯函数
// reducer 就是数据处理的过程
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
const fn = (state = defaultState, action) => {
  //! 这里面需要注意, 不要去修改原来的state
  switch (action.type) {
    case 'change_language':
      i18n.changeLanguage(action.payload)
      return { ...state, language: action.payload }

    case 'add_language':
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

