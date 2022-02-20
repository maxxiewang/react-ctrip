import React from 'react'
import { MainLayout } from '../../layouts/mainLayout'
import { CheckOutCard, PaymentForm } from '../../components'
import { Row, Col } from 'antd'
import { useSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import { placeOrder } from '../../redux/order/slice'
export const PlaceOrder: React.FC = () => {
  const currentOrder = useSelector((s) => s.order.currentOrder)
  const jwt = useSelector((s) => s.user.token) as string
  const loading = useSelector((s) => s.order.loading)
  const dispatch = useDispatch()
  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>
          <CheckOutCard
            loading={loading}
            order={currentOrder}
            onCheckout={() => {
              dispatch(placeOrder({ jwt, orderId: currentOrder.id }))
            }}
          />
        </Col>
      </Row>
    </MainLayout>
  )
}
