const Mock = require('mockjs')
const home = require('./data.json')
// Mock.XHR.prototype.withCredentials = true

const baseUrl = process.env.VUE_APP_BASE_API
Mock.mock(baseUrl + '/home/list', {
  code: 200,
  data: home
})
