/* 
  利用TS给CSS文件加上类型的定义声明
  *.d.ts 是ts专用的类型声明文件,只要是.d.ts就会被typeScript所识别
  只包含类型的声明,不包含逻辑
  不会被编译,也不会被webpack打包
*/
/* 
  declare和module都是关键词
  只要在import以css为后缀的文件时,都会遵循以下的约定
  导出key所在的对象,而原始的类名和相应的值,都将被转化为这个对象

*/
declare module '*.css' { // 看不懂,救命啊
  const css :{[key:string]:string}
  export default css
}