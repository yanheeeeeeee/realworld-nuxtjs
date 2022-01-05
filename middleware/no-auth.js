/**
 * 验证是否已登录的中间件
 * @param {*} context  页面上下文对象
 */
 export default function (context) {
  // 如果vuex中已有登录状态, 则直接前往首页
  if(context.store.state.user){
    context.redirect('/')
  }
}