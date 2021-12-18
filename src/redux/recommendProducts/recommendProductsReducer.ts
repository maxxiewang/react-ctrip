
// 确定reducer的输出格式
interface RecommendProductsState {
  productList: any[],
  loading: boolean,
  error: string | null
}

const defaultState: RecommendProductsState = {
  loading: true,
  error: null,
  productList: []
}

const fn = (state = defaultState, action) => {
  return state
}

export default fn