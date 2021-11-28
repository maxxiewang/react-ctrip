import React from 'react'
import styles from './Header.module.css'
import logo from '../../assets/logo.svg'
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import { withRouter, RouteComponentProps } from 'react-router'
import store, { RootState } from '../../redux/stroe'
import { withTranslation, WithTranslation } from 'react-i18next'
import {
  addLanguageActionCreator,
  changeLanguageActionCreator,
} from '../../redux/language/languageActions'
// 使用react-redux
import { connect } from 'react-redux'
// 引入dispatch类型定义
import { Dispatch } from 'redux'

// 组件state的接口，继承了reudcer里面重复写过的
// interface State extends LanguageState {}

// 为了react-redux中的connect使用
const mapStateToPorps = (state: RootState) => {
  return {
    language: state.language,
    languageList: state.languageList,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  // 返回类型中，每一个字段就是一个处理函数
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

// 接口state放在组件范型的第二个参数
// <RouteComponentProps & WithTranslation,State> 连接i18n的TypeScript类型定义
class HeaderComponent extends React.Component<
  RouteComponentProps &
    WithTranslation &
    ReturnType<typeof mapStateToPorps> &
    ReturnType<typeof mapDispatchToProps>
> {
  // constructor(props) {
  //   super(props)
  //   // 即然有了connect函数，就不需要订阅和初使化state
  //   const storeState = store.getState()
  //   this.state = {
  //     language: storeState.language,
  //     languageList: storeState.languageList,
  //   }
  //   store.subscribe(this.handleStoreChange)
  // }

  handleStoreChange = () => {
    const storeState = store.getState()
    this.setState({
      language: storeState.language,
      languageList: storeState.languageList,
    })
  }

  menuClickHandler = (e) => {
    // console.log('e..',e)
    // this.setState({language:e.key})  // 原来的直接修改state的方法
    if (e.key === 'new') {
      const action = addLanguageActionCreator('日语', 'Jap')
      console.log('添加新语言')
      store.dispatch(action)
    } else {
      // 1、先创建更新数据的action
      const action = changeLanguageActionCreator(e.key)
      // 2、向store去dispatch这个action
      store.dispatch(action)
    }
  }

  render() {
    const { history, t } = this.props
    console.log('this.props>>>>>>>>', this.props)
    return (
      <div className={styles['app-header']}>
        {/* top-header */}
        <div className={styles['top-header']}>
          <div className={styles.inner}>
            <Typography.Text>Make travel better</Typography.Text>
            <Dropdown.Button
              style={{ marginLeft: 15 }}
              overlay={
                <Menu onClick={this.menuClickHandler}>
                  {this.props.languageList.map((item) => {
                    return <Menu.Item key={item.code}>{item.name}</Menu.Item>
                  })}
                  <Menu.Item key={'new'}>
                    {t('header.add_new_language')}
                  </Menu.Item>
                </Menu>
              }
              icon={<GlobalOutlined />}
            >
              {this.props.language === 'zh' ? '中文' : 'Eng'}
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
              {t('header.title')}
            </Typography.Title>
          </span>
          <Input.Search
            placeholder={'请输入旅游目的地、主题、或关键字'}
            className={styles['search-input']}
          />
        </Layout.Header>
        <Menu mode={'horizontal'} className={styles['main-menu']}>
          <Menu.Item key={1}>{t('header.home_page')}</Menu.Item>
          <Menu.Item key={2}>{t('header.weekend')}</Menu.Item>
          <Menu.Item key={3}>{t('header.group')}</Menu.Item>
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

// react-redux使用的connect连接函数
export const Header = connect(
  mapStateToPorps,
  mapDispatchToProps
)(withTranslation()(withRouter(HeaderComponent)))
