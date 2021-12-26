import { FETCH_RECOMMEND_PRODUCTS_START, FETCH_RECOMMEND_PRODUCTS_SUCCESS, FETCH_RECOMMEND_PRODUCTS_FAIL, RecommendProductAction } from './recommendProductsActions'


interface RecommendProductsState {
  productList: any[],
  loading: boolean,
  error: string | null
}

const defaultState: RecommendProductsState = {
  productList: [],
  loading: true,
  error: null
}

const fn = (state = defaultState, action: RecommendProductAction) => {
  switch (action.type) {
    case FETCH_RECOMMEND_PRODUCTS_START:
      //第一start只修改loading的状态，其他保持不变
      return {
        ...state, loading: true
      }
    case FETCH_RECOMMEND_PRODUCTS_SUCCESS:
      return {
        // productList的数据即是那个payload
        ...state, loading: false, productList: action.payload
      }
    case FETCH_RECOMMEND_PRODUCTS_FAIL:
      return {
        ...state, loading: false, error: action.payload
      }
    default:
      return state;
  }

}

export default fn