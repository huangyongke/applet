const DB = require('../utils/db.js')

module.exports = {
  /**
   * 创建计划
   * 
   */
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let start_time = ctx.request.body.start_time
    let end_time = ctx.request.body.end_time
    let content = ctx.request.body.content

    // 插入订单至 plan 表
    let plan = await DB.query('insert into plan(start_time,end_time,content,user) values (?,?,?,?)', [start_time,end_time,content,user])

    ctx.state.data = {}

  },

  /**
   * 获取已购买订单列表
   * 
   */
  plans: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId

    let plans = await DB.query('SELECT id,start_time,end_time,content from plan where user = ? order by end_time', [user])

    ctx.state.data = plans
  },

  getplanbyid: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let id = ctx.request.query.id
    let plan = await DB.query('SELECT id,start_time,end_time,content from plan where user = ? and id = ?', [user,id])

    ctx.state.data = plan
  },

  modify: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let id = ctx.request.body.id
    let start_time = ctx.request.body.start_time
    let end_time = ctx.request.body.end_time
    let content = ctx.request.body.content
    // let sql = 'UPDATE plan set 1 = 1 '
    // if (ctx.request.body.start_time)
    //   sql =sql + ',start_time = '+ ctx.request.body.start_time
    // if (ctx.request.body.end_time)
    //   sql =sql+ ',end_time = '+ ctx.request.body.end_time
    // if (ctx.request.body.content)
    //   sql =sql+',content = '+ ctx.request.body.content
    // sql =sql+ ' where id = ? and user = ?'
    
    let plans = await DB.query('update plan set start_time = ?,end_time = ?,content = ? where id = ? and user = ? ', [start_time,end_time,content,id,user])

    ctx.state.data = {}
  },

  deleteplan: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let id = ctx.request.query.id
    let plans = await DB.query('delete from plan where id = ? and user = ?', [id,user])

    ctx.state.data = {}
  },
}