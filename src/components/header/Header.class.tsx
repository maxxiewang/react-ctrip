import React, { Component } from 'react'
import styles from './Header.module.css'
import logo from '../../assets/logo.svg'
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
// RouteComponentProps， 路由的typeScrpit定义
import { withRouter, RouteComponentProps } from 'react-router-dom'
import store, { RootState } from '../../redux/store'
// import { LanguageState } from '../../redux/language/languageReducer'
import { withTranslation, WithTranslation } from 'react-i18next'
import { t } from 'i18next' //! 所以是在这里面引入这个t函数可以，在props里面也可以解构这个t函数
import {
  changeLanguageActionCreator,
  addLanguageActionCreator,
} from '../../redux/language/languageActions'
//! 本质上也是一个高阶函数，把store的部分数据与dispatch方法跟组件连接起来。
import { connect } from 'react-redux'
//! 从redux中引入dispatch的类型定义
import { Dispatch } from 'redux'

// 定义组件state的接口，利用接口继承，保留(组件继承的方法会深度绑定store的类型，有利有弊)
// interface State extends LanguageState {}

// 参数是从store传过来的state, 给这个state加上类型，实现自动联想
const mapStateToProps = (state: RootState) => {
  return {
    language: state.language.language,
    languageList: state.language.languageList,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  // 返回类型中，每一个字段，就是一个dispatch处理函数
  return {
    changeLanguage: (code: 'zh' | 'en') => {
      const action = changeLanguageActionCreator(code)
      dispatch(action)
    },
    addLanguage: (name: string, code: string) => {
      const action = addLanguageActionCreator(name, code)
      dispatch(action)
    },
  }
}

// 把porps类型提取出来
type PropsTypes = RouteComponentProps &
  WithTranslation &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

//! 注意这个范型写法
class HeaderComponent extends Component<PropsTypes> {
  changeLanguage = (e) => {
    if (e.key === 'addLanguage') {
      this.props.addLanguage('kr', '韩文')
    } else {
      this.props.changeLanguage(e.key)
    }
  }
  componentDidMount() {
    store.store.subscribe(() => {
      const storeState = store.store.getState().language
      this.setState({
        language: storeState.language,
        languageList: storeState.languageList,
      })
    })
  }
  render() {
    /* 
      因为使用了withRouter，在props里，可以操作history等路由相关操作
    */
    const { history, languageList, language } = this.props
    // const { languageList, language } = this.state // 这个为原来的state方案
    return (
      <div className={styles['app-header']}>
        {/* top-header */}
        <div className={styles['top-header']}>
          <div className={styles.inner}>
            <Typography.Text>{t('header.slogan')}</Typography.Text>
            <Dropdown.Button
              style={{ marginLeft: 15 }}
              overlay={
                <Menu onClick={this.changeLanguage}>
                  {languageList.map((item) => {
                    return <Menu.Item key={item.code}>{item.name}</Menu.Item>
                  })}
                  <Menu.Item key={'addLanguage'}>添加新语言</Menu.Item>
                </Menu>
              }
              icon={<GlobalOutlined />}
            >
              {language}
            </Dropdown.Button>
            <Button.Group className={styles['button-group']}>
              <Button onClick={() => history.push('register')}>
                {t('header.register')}
              </Button>
              <Button onClick={() => history.push('signIn')}>
                {t('header.signin')}
              </Button>
            </Button.Group>
          </div>
        </div>
        <Layout.Header className={styles['main-header']}>
          <span
            onClick={() => {
              history.push('/')
            }}
          >
            <img src={logo} alt="logo" className={styles['App-logo']} />
            <Typography.Title level={3} className={styles.title}>
              CyberTrip
            </Typography.Title>
          </span>
          <Input.Search
            placeholder={'请输入旅游目的地、主题、或关键字'}
            className={styles['search-input']}
          />
        </Layout.Header>
        <Menu mode={'horizontal'} className={styles['main-menu']}>
          <Menu.Item key={1}>旅游首页</Menu.Item>
          <Menu.Item key={2}>周末游</Menu.Item>
          <Menu.Item key={3}>跟团游</Menu.Item>
          <Menu.Item key="4"> 自由行 </Menu.Item>
          <Menu.Item key="5"> 私家团 </Menu.Item>
          <Menu.Item key="6"> 邮轮 </Menu.Item>
          <Menu.Item key="7"> 酒店+景点 </Menu.Item>
          <Menu.Item key="8"> 当地玩乐 </Menu.Item>
          <Menu.Item key="9"> 主题游 </Menu.Item>
          <Menu.Item key="10"> 定制游 </Menu.Item>
          <Menu.Item key="11"> 游学 </Menu.Item>
          <Menu.Item key="12"> 签证 </Menu.Item>
          <Menu.Item key="13"> 企业游 </Menu.Item>
          <Menu.Item key="14"> 高端游 </Menu.Item>
          <Menu.Item key="15"> 爱玩户外 </Menu.Item>
          <Menu.Item key="16"> 保险 </Menu.Item>
        </Menu>
      </div>
    )
  }
}
//! 第一()传入store的连接数据，第二个()就是组件本身
//! 目的就是把store与header组件连接起来
/* 
  connect函数中传入两个参数 mapStateToProps, mapDispatchToProps,
  两个函数分别连接的是state与Action的dispatch方法，
  他们所连接的对像都可以绑定在props属性中，这样在Props里面就可以使用了
*/
//! 所以绑定的这两个函数，一个是state控制数据的流入，一个dispatch控制数据的流出
export const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(withRouter(HeaderComponent)))
