const Mock = require('mockjs')
const home = require('./data.json')
const data = Mock.mock(home)

module.exports = [
  {
    url: '/home/list',
    type: 'get',
    response: (config) => {
      return {
        code: 20000,
        data
      }
    }
  }
]
