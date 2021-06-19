import './bootstrap'
import Vue from 'vue'
// ルーティングの定義をインポートする
import router from './router'
import store from './store'
// ルートコンポーネントをインポートする
import App from './App.vue'

const createApp = async () => {
  await store.dispatch('auth/currentUser')

  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App />'
  })
}

createApp()