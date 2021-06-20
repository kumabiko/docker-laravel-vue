import { OK, CREATED, UNPROCESSABLE_ENTITY } from '../util'

const state = {
  user: null,
  apiStatus: null,
  loginErrorMessages: null,
  registerErrorMessages: null
}

const getters = {
  check: state => !! state.user,
  username: state => state.user ? state.user.name : ''
}

const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setApiStatus (state, status) {
    state.apiStatus = status
  },
  setLoginErrorMessages (state, messages) {
    state.loginErrorMessages = messages
  },
  setRegisterErrorMessages (state, messages) {
    state.registerErrorMessages = messages
  }
}

const actions = {
  // 会員登録
  async register (context, data) {
    const response = await axios.post('/api/register', data)
    context.commit('setUser', response.data)
  },
  async login (context, data) {
    // 最初はnull 
    context.commit('setApiStatus', null)
    // API 通信が成功した場合も失敗した場合も response にレスポンスオブジェクトを代入
    const response = await axios.post('/api/login', data)
      .catch(err => err.response || err)
    // 成功したらtrue
    if (response.status === OK) {
      context.commit('setApiStatus', true)
      context.commit('setUser', response.data)
      return false
    }
    // 失敗したらfalse
    context.commit('setApiStatus', false)
    if (response.status === UNPROCESSABLE_ENTITY) {
      context.commit('setLoginErrorMessages', response.data.errors)
    } else {
      // 通信に失敗した場合にerrorモジュールのsetCodeミューテーションをcommitしているが、
      // あるストアモジュールから別のモジュールをcommitする場合は第三引数に{ root: true }を追加する
      context.commit('error/setCode', response.status, { root: true})
    }
      
  },
  async logout (context) {
    const response = await axios.post('/api/logout')
    context.commit('setUser', null)
  },
  async currentUser (context){
    const response = await axios.get('/api/user')
    const user = response.data || null
    context.commit('setUser', user)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
