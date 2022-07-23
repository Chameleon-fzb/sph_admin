const Mock = require('mockjs')
const home = require('./home')
// Mock.XHR.prototype.withCredentials = true

Mock.mock(home.url, home.response())
