
// 1、API请求开始的action, 表示正在调用API信息
export const FETCH_RECOMMEND_PRODUCTS_START = 
"FETCH_RECOMMEND_PRODUCTS_START" // 正在调用推荐信息api

export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = 
"FETCH_RECOMMEND_PRODUCTS_SUCCESS" // 推荐信息api调用成功

export const FETCH_RECOMMEND_PRODUCTS_FAIL = 
"FETCH_RECOMMEND_PRODUCTS_FAIL"  // 推荐信息api调用失败

interface FetchRecommendProductStartAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_START
}
interface FetchRecommendProductSuccessAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS
  payload: any []
}
interface FetchRecommendProductFailAction{
  type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL
  payload: any
}

// 混合一下，作为输出action的总类型
export type RecommendProductAction = 
FetchRecommendProductStartAction|
FetchRecommendProductSuccessAction|
FetchRecommendProductFailAction

export const fetchRecommendProductStartAction = ():FetchRecommendProductStartAction=>{
  return {
    type:FETCH_RECOMMEND_PRODUCTS_START
  }
}