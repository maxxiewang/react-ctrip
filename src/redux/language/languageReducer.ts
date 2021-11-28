import i18n from 'i18next'
import { ADD_LANGUAGE, CHANGE_LANGUAGE, LanguageActionTypes } from './languageActions'

export interface LanguageState{
  language: 'zh'|'en',
  languageList: {name:string,code:string}[]
}

// 初使化state，完成后传递给ReducerState
const defaultState:LanguageState = {
  language:'zh',
  languageList:[
    {name:'中文', code:'zh'},
    {name:'English', code:'en'}
  ]
}
// reducer是数据state的处理过程，而action是指挥函数做出数据变换的指令
// export default (state = defaultState, action) =>{
//   return state
// }

// eslint检测，不支持这种纯匿名函数导出
const state =  (state = defaultState, action:LanguageActionTypes) =>{
  switch (action.type) {
    case CHANGE_LANGUAGE: 
      // 调用i18n的changeLanguage函数切换语言的配置文件，
      // 当调用i18n的changeLanguage后，这个reducer就不是一个纯函数了  
      i18n.changeLanguage(action.payload)
      return {...state,language:action.payload }
    case ADD_LANGUAGE:
      return  {...state, languageList:[...state.languageList, action.payload]}  
    default:
      return state
  }
  // if(action.type === 'change_language'){
  //   // ! 重要任何store中保存的数据，都是immutable（不可更改的），
  //   // 如果需要，需使用新的对象代替原有的数据，同时销毁过去的数据   
  //   const newSts = {...state,language:action.payload }
  //   return newSts
  // }  
  // if(action.type === 'add_language'){
  //   // 灵活使用扩展运算符
  //   const newSts = {...state, languageList:[...state.languageList, action.payload]}
  //   return newSts
  // }
  // return state
}

export default state