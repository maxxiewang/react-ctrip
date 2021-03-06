//! 加上S，因为文件可以会涉及处理多个actions

/* 
  原来在组件中action的类型是
  const action = {
        type: 'add_language',
        payload: {
          code: 'jap',
          name: '日语',
        },
      }
  const action = {
        type: 'change_language',
        payload: e.key,
      }
  组件中通过逻辑的判断，来决定是dispatch哪个action，
  如果增加就走的type为add的action，如果是更改就走change，
  触发的action对象类型都是一样的，只是reducer里面的action.type不一样，
  在reducer里面，state是原来的那个，action指令触发后，更新state数据，并把新的state返回给store。
  在组件中subscribe这个store后，就会实现了更新。

*/

export const CHANGE_LANGUAGE = 'change_language'
export const ADD_LANGUAGE = 'add_language'

//* 定义action类型的接口
interface ChangeLanguageAction {
  type: typeof CHANGE_LANGUAGE
  payload: 'zh' | 'en'
}

interface AddLanguageAction {
  type: typeof ADD_LANGUAGE
  payload: {
    name: string,
    code: string
  }
}

// 在reducer中使用，所以需要将两种类型混合一下，导出给reducer
export type languageActionTypes = ChangeLanguageAction | AddLanguageAction


//! actionCreator 工厂函数(解决action，统一结构的问题)
export const changeLanguageActionCreator = (languageCode: 'zh' | 'en'): ChangeLanguageAction => {
  return {
    type: CHANGE_LANGUAGE,
    payload: languageCode
  }
}

export const addLanguageActionCreator = (name: string, code: string): AddLanguageAction => {
  return {
    type: ADD_LANGUAGE,
    //TODO 这里面这个结构可能是ES6新增的，KEY与VALUE一致可省略
    payload: {
      name, code
    }
  }
}