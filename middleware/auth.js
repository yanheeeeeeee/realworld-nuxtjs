/**
 * 验证是否登录的中间件
 * 中间件在nuxt.config.js的router, layout或者页面组件中使用.
 * @param {*} context  页面上下文对象
 */
export default function (context) {
  // 如果vuex中没有登录状态, 则前往登录页面
  if(!context.store.state.user){
    context.redirect('/login')
  }
}