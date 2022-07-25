const Mock = require('mockjs')
const home = require('./data.json')
// Mock.XHR.prototype.withCredentials = true

const baseUrl = '/mock'
Mock.mock(baseUrl + '/home/list', {
  code: 200,
  data: home
})
