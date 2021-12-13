// 在redux中，不管是reducer还是action都是纯函数
// reducer 就是数据处理的过程
export interface LanguageState{
  language: 'zh'|'en',
  languageList:{name:string, code:string}[]
}

const defaultState:LanguageState = {
  language:'zh',
  languageList:[
    {name:'中文',code:'zh'},
    {name:'Eng',code:'eng'},
    {name:'FR',code:'fr'}
  ]
}

/* 
关于 React 在导出之前给变量赋一个箭头函数作为模块default import/no-anonymous-default-export 的报错问题
*/
const fn =(state=defaultState,action)=>{

  return state
}

export default fn

