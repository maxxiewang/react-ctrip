import React from 'react'
import styles from './ShoppingCart.module.css'
import { MainLayout } from '../../layouts/mainLayout'
import { Row, Col, Affix } from 'antd'
import { ProductList, PaymentCard } from '../../components'
import { useSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import { clearShoppingCartItem } from '../../redux/shoppingCart/slice'

export const ShoppingCart: React.FC = () => {
  const loading = useSelector((s) => s.shoppingCart.loading)
  const items = useSelector((s) => s.shoppingCart.items)
  const jwt = useSelector((s) => s.user.token)
  const dispatch = useDispatch()
  return (
    <MainLayout>
      <Row>
        {/* 购物车清单 */}
        <Col span={16}>
          <div className={styles['product-list-container']}>
            {/* <ProductList /> */}
          </div>
        </Col>
        {/* 支付模块 */}
        <Col span={8}>
          <Affix>
            <div className={styles['payment-card-container']}>
              {/* <PaymentCard /> */}
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  )
}
