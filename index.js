var express = require('express');
var http = require('http'); //引入http模块
var app = express();
app.set('port', process.env.PORT || 3000);

app.get('/normal', function (req, res) {
	var data = { message: "浏览器并不能收到" };
	res.send(data);
});

app.get('/nocors', function (req, res) {
	var data = { message: "返回数据但浏览器无法获取" };
	res.send(data);
});

app.get('/cors', function (req, res) {

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");

	var data = { message: "fetch CORS跨域成功" };
	res.send(data);
});

app.get('/jsonp', function (req, res) {
	var callback = req.query.callback;
	var data = { message: "jsonp跨域成功" };
	data = JSON.stringify(data);
	if (callback) {
		res.send(callback + '(' + data + ')');
	}
});

var server = app.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
})

module.exports = app;