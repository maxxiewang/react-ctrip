
export const CHANGE_LANGUAGE = 'change_language'
export const ADD_LANGUAGE = 'add_language'

interface ChangeLanguageAction{
  type: typeof CHANGE_LANGUAGE,
  payload: 'zh'|'en'
}

interface AddLanguageAction{
  type:typeof ADD_LANGUAGE,
  payload:{
    name:string,
    code:string
  }
}

// 因为要在reducer中使用，所以把两种类型混合一下
export type LanguageActionTypes = ChangeLanguageAction | AddLanguageAction

// 更改语言的action工厂
export const changeLanguageActionCreator = (languageCode: 'zh'|'en'):ChangeLanguageAction=>{
  // 返回的是我们需要提取的action对象
  return {
    type:CHANGE_LANGUAGE,
    payload:languageCode
  } 
}

// 语言添加工厂函数
export const addLanguageActionCreator = (name:string, code:string):AddLanguageAction=>{
  return {
    type:ADD_LANGUAGE,
    payload:{
      name,
      code
    }
  }
}