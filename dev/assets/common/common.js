Util = {
	/**
     * 取消事件冒泡
     * @param {Object}
     *            e 事件对象
     */
	stopBubble: function(e) {
		if (e && e.stopPropagation) {
			e.stopPropagation()
		} else {
			// ie
			window.event.cancelBubble = true
		}
	},
	/**
     * 入参转码
     * @param {string}
     * 		json格式
     */
	transCoding: function(json) {
		var temp = encodeURIComponent(json)
		temp = CryptoJS.enc.Utf8.parse(temp)
		temp = CryptoJS.enc.Base64.stringify(temp)
		return temp
	},
	/**
     * 入参转码
     * @param {string}
     * 		json格式
     */
	transDecoding: function(objStr) {
		var words = CryptoJS.enc.Base64.parse(objStr)
		words = words.toString(CryptoJS.enc.Utf8)
		words = decodeURIComponent(words)
		return words
	}
}
/**
 * 日期时间处理工具
 * 
 * @namespace Util
 * @class date
 */
Util.date = {
	/**
     * 格式化日期时间字符串
     * 
     * @method dateTime2str
     * @param {Date}
     *            dt 日期对象
     * @param {String}
     *            fmt 格式化字符串，如：'yyyy-MM-dd hh:mm:ss'
     * @return {String} 格式化后的日期时间字符串
     */
	dateTime2str: function(dt, fmt) {
		var z = {
			M: dt.getMonth() + 1,
			d: dt.getDate(),
			h: dt.getHours(),
			m: dt.getMinutes(),
			s: dt.getSeconds()
		}
		fmt = fmt.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
			return ((v.length > 1 ? '0' : '') + eval('z.' + v.slice(-1)))
				.slice(-2)
		})
		return fmt.replace(/(y+)/g, function(v) {
			return dt.getFullYear().toString().slice(-v.length)
		})
	},
	/**
     * 根据日期时间格式获取获取当前日期时间
     * 
     * @method dateTimeWrapper
     * @param {String}
     *            fmt 日期时间格式，如："yyyy-MM-dd hh:mm:ss";
     * @return {String} 格式化后的日期时间字符串
     */
	dateTimeWrapper: function(fmt) {
		if (arguments[0])
			fmt = arguments[0]
		return this.dateTime2str(new Date(), fmt)
	},
	/**
     * 获取当前日期时间
     * 
     * @method getDatetime
     * @param {String}
     *            fmt [optional,default='yyyy-MM-dd hh:mm:ss'] 日期时间格式。
     * @return {String} 格式化后的日期时间字符串
     */
	getDatetime: function(fmt) {
		return this.dateTimeWrapper(fmt || 'yyyy-MM-dd hh:mm:ss')
	},
	/**
     * 获取当前日期时间+毫秒
     * 
     * @method getDatetimes
     * @param {String}
     *            fmt [optional,default='yyyy-MM-dd hh:mm:ss'] 日期时间格式。
     * @return {String} 格式化后的日期时间字符串
     */
	getDatetimes: function(fmt) {
		var dt = new Date()
		return this.dateTime2str(dt, fmt || 'yyyy-MM-dd hh:mm:ss') + '.' +
            dt.getMilliseconds()
	},
	/**
     * 获取当前日期（年-月-日）
     * 
     * @method getDate
     * @param {String}
     *            fmt [optional,default='yyyy-MM-dd'] 日期格式。
     * @return {String} 格式化后的日期字符串
     */
	getDate: function(fmt) {
		return this.dateTimeWrapper(fmt || 'yyyy-MM-dd')
	},
	/**
     * 获取当前时间（时:分:秒）
     * 
     * @method getTime
     * @param {String}
     *            fmt [optional,default='hh:mm:ss'] 日期格式。
     * @return {String} 格式化后的时间字符串
     */
	getTime: function(fmt) {
		return this.dateTimeWrapper(fmt || 'hh:mm:ss')
	},
	/**
     * 获取时间差
     */
	getTimeDiff: function(startTime, endTime) {
		startTime = parseInt(startTime / 1000)
		endTime = parseInt(endTime / 1000)
		var diff = endTime - startTime
		var unit = '秒'
		if (diff >= 60) {
			diff = parseInt(diff / 60)
			unit = '分钟'
			if (diff >= 60) {
				diff = parseInt(diff / 60)
				unit = '小时'
				if (diff >= 24) {
					diff = parseInt(diff / 24)
					unit = '天'
					if (diff >= 365) {
						diff = parseInt(diff / 365)
						unit = '年'
					}
				}
			}
		}
		return diff + unit
	}
}

Util.event = {
	/**
	 * 用法示例： Util.event.bindEvents({
        //点击添加老师按钮
        '.J-add-teacher': function () {
            Util.Confirm.create('添加教师', $('.add-tc-content-box'), ["确 定", "取 消"], [function () {
                console.log("确定")
            }, function () {
                Util.Confirm.hide();
                console.log('取消')
            }]);
            Util.Confirm.show();
        },
        //点击导入老师按钮
        '.J-import-teacher': function () {
            Util.Confirm.create('导入教师', $('.import-tc-content-box'), ["确 定", "取 消"], [function () {
                console.log(this);
            }, function () {
                Util.Confirm.hide();
                console.log('取消')
            }]);
            Util.Confirm.show();
        },
        //上传按钮
        '.file-upload-input-box':function(){
            console.log(this);
            $('.upload-file-btn').click();
        }
    })
    }
	 */
	bindEvents: function(obj) {
		for (var key in obj) {
			$(key).click(obj[key])
		}
	}
}
/**
     * 通过 HTTP 请求加载远程数据，底层依赖jQuery的AJAX实现。当前接口实现了对jQuery AJAX接口的进一步封装。
     */
Util.ajax = {
	/**
     * 请求状态码
     * 
     * @type {Object}
     */
	reqCode: {
		/**
         * 成功返回码 0000
         * 
         * @type {Number} 1
         * @property SUCC
         */
		SUCC: 0000
	},
	/**
     * 请求的数据类型
     * 
     * @type {Object}
     * @class reqDataType
     */
	dataType: {
		/**
         * 返回html类型
         * 
         * @type {String}
         * @property HTML
         */
		HTML: 'html',
		/**
         * 返回json类型
         * 
         * @type {Object}
         * @property JSON
         */
		JSON: 'json',
		/**
         * 返回text字符串类型
         * 
         * @type {String}
         * @property TEXT
         */
		TEXT: 'text'
	},
	/**
     * 超时,默认超时30000ms
     * 
     * @type {Number} 10000ms
     * @property TIME_OUT
     */
	TIME_OUT: 60000,
	/**
     * 显示请求成功信息
     * 
     * @type {Boolean} false
     * @property SHOW_SUCC_INFO
     */
	SHOW_SUCC_INFO: false,
	/**
     * 显示请求失败信息
     * 
     * @type {Boolean} false
     * @property SHOW_ERROR_INFO
     */
	SHOW_ERROR_INFO: false,
	/**
     * GetJson是对Util.ajax的封装,为创建 "GET" 请求方式返回 "JSON"(text) 数据类型
     * @param {String}
     *            url HTTP(GET)请求地址
     * @param {Object}
     *            cmd json对象参数
     * @param {Function}
     *            callback [optional,default=undefined] GET请求成功回调函数
     */
	getJson: function(url, cmd, callback) {
		if (arguments.length !== 3)
			callback = cmd, cmd = ''
		dataType = this.dataType.TEXT
		// var _this = this;
		// setTimeout( function(){_this.ajax(url, 'GET', cmd, dataType,
		// callback)},1000);
		this.ajax(url, 'GET', cmd, dataType, callback)
	},
	/**
     * PostJsonAsync是对Util.ajax的封装,为创建 "POST" 请求方式返回 "JSON"(text) 数据类型,
     * 采用同步阻塞的方式调用ajax
     * @param {String}
     *            url HTTP(POST)请求地址
     * @param {Object}
     *            cmd json对象参数
     * @param {Function}
     *            callback [optional,default=undefined] POST请求成功回调函数
     */
	postJsonSync: function(url, cmd, callback) {
		dataType = this.dataType.TEXT
		this.ajax(url, 'POST', cmd, dataType, callback, true)
	},
	/**
     * PostJson是对Util.ajax的封装,为创建 "POST" 请求方式返回 "JSON"(text) 数据类型
     * @param {String}
     *            url HTTP(POST)请求地址
     * @param {Object}
     *            cmd json对象参数
     * @param {Function}
     *            callback [optional,default=undefined] POST请求成功回调函数
     * @param {Object}
     *			  loading{start:{Function},complete:{Function}} 载入开始及结束的回调函数
     */
	postJson: function(url, cmd, callback, flag, loading) {
		// if(!flag){Util.loading.showLoading();}
		dataType = this.dataType.TEXT
		// var _this = this;
		// setTimeout( function(){_this.ajax(url, 'POST', cmd, dataType,
		// callback)},1000);
		this.ajax(url, 'POST', cmd, dataType, callback, '', flag, loading)
	},
	/**
     * loadHtml是对Ajax load的封装,为载入远程 HTML 文件代码并插入至 DOM 中
     * @param {Object}
     *            obj Dom对象
     * @param {String}
     *            url HTML 网页网址
     * @param {Function}
     *            callback [optional,default=undefined] 载入成功时回调函数
     */
	loadHtml: function(obj, url, data, callback) {
		$(obj).load(url, data, function(response, status, xhr) {
			callback = callback ? callback : function() {}
			status == 'success' ? callback(true) : callback(false)
		})
	},
	/**
     * loadTemp是对handlebars 的封装,请求模版加载数据
     * @param {Object}
     *            obj Dom对象
     * @param {Object}
     *            temp 模版
     * @param {Object}
     *            data 数据
     */
	loadTemp: function(obj, temp, data) {
		var template = Handlebars.compile(temp.html())
		$(obj).html(template(data))
	},
	/**
     * GetHtml是对Util.ajax的封装,为创建 "GET" 请求方式返回 "hmtl" 数据类型
     * @param {String}
     *            url HTTP(GET)请求地址
     * @param {Object}
     *            cmd json对象参数
     * @param {Function}
     *            callback [optional,default=undefined] GET请求成功回调函数
     */
	getHtml: function(url, cmd, callback) {
		if (arguments.length !== 3)
			callback = cmd, cmd = ''
		dataType = this.dataType.HTML
		this.ajax(url, 'GET', cmd, dataType, callback)
	},
	/**
     * GetHtmlSync是对Util.ajax的封装,为创建 "GET" 请求方式返回 "hmtl" 数据类型
     * 采用同步阻塞的方式调用ajax
     * @param {String}
     *            url HTTP(GET)请求地址
     * @param {Object}
     *            cmd json对象参数
     * @param {Function}
     *            callback [optional,default=undefined] GET请求成功回调函数
     */
	getHtmlSync: function(url, cmd, callback) {
		if (arguments.length !== 3)
			callback = cmd, cmd = ''
		dataType = this.dataType.HTML
		this.ajax(url, 'GET', cmd, dataType, callback, true)
	},
	/**
     * 基于jQuery ajax的封装，可配置化
     * 
     * @method ajax
     * @param {String}
     *            url HTTP(POST/GET)请求地址
     * @param {String}
     *            type POST/GET
     * @param {Object}
     *            cmd json参数命令和数据
     * @param {String}
     *            dataType 返回的数据类型
     * @param {Function}
     *            callback [optional,default=undefined] 请求成功回调函数,返回数据data和isSuc
     * @param {Object}
     *			  loading{start:{Function},complete:{Function}} 载入开始及结束的回调函数
     */
	ajax: function(url, type, cmd, dataType, callback, sync, flag, loading) {
		/*var param = "";
        if (typeof (cmd) == "object"){
        	param = JSON.stringify(cmd);
        }else if(typeof(cmd)=="string"){
        	param = cmd;
        }*/
		//cmd = this.jsonToUrl(cmd);

		var srvName = null
		//支持传api名称，从srvMap中获取url
		if (srvMap && srvMap.get(url)) {
			srvName = url
			url = srvMap.get(url)
		} else if (srvMap && srvMap.getName && srvMap.getName(url)) { //也可以从url获取api名称
			srvName = srvMap.getName(url)
		}

		async = sync ? false : true
		var thiz = Util.ajax
		var cache = (dataType == 'html') ? true : false
		$.ajax({
			url: url,
			type: type,
			data: cmd,
			/*processData: false,  	// 告诉jQuery不要去处理发送的数据
            contentType: false,		// 告诉jQuery不要去设置Content-Type请求头*/
			cache: cache,
			dataType: dataType,
			async: async,
			timeout: thiz.TIME_OUT,
			beforeSend: function(xhr) {
				xhr.overrideMimeType('text/plain; charset=utf-8')
				if (flag && loading && loading.start) {
					loading.start()
				}
			},
			success: function(data) {
				if (!data) {
					return
				}
				if (dataType == 'html') {
					callback(data, true)
					return
				}
				try {
					data = eval('(' + data + ')')
					if (data.returnCode == 'PAGEFRAME-9527') {
						alert('登陆凭证过期，请重新登陆')
						window.location.reload()
						return
					}
				} catch (e) {
					console.log('JSON Format Error:' + e.toString())
				}
				var isSuc = thiz.printReqInfo(data)
				if (callback && data) {

					//当已经对某接口定义结果转化时，对返回数据进行转化，无需在回调函数中再显式调用
					if (srvName && $.DATA_CONVERTER && $.DATA_CONVERTER.get && $.DATA_CONVERTER.get(srvName) && $.DATA_CONVERTER.convert) {
						$.DATA_CONVERTER.convert(srvName, data)
					}

					callback(data || {}, isSuc)
				}
			},
			error: function() {
				var retErr = {}
				retErr['returnCode'] = 'SCRM-404'
				retErr['returnMessage'] = '网络异常或超时，请稍候再试！'
				callback(retErr, false)
			},
			complete: function() {
				//if(!flag){Util.loading.hideLoading();}
				if (flag && loading && loading.complete) {
					loading.complete()
				}
			}
		})
	},
	/**
     * 打开请求返回代码和信息
     * 
     * @method printRegInfo
     * @param {Object}
     *            data 请求返回JSON数据
     * @return {Boolean} true-成功; false-失败
     */
	printReqInfo: function(data) {
		if (!data)
			return false
		var code = data.returnCode,
			msg = data.returnMessage,
			succ = this.reqCode.SUCC
		if (code == succ) {
			if (this.SHOW_SUCC_INFO) {
				// Util.msg.infoCorrect([ msg, ' [', code, ']' ].join(''));
				Util.msg.infoCorrect(msg)
			}
		} else {
			// Util.msg.infoAlert([ msg, ' [', code, ']' ].join(''));
			if (this.SHOW_ERROR_INFO) {
				art.dialog.tips(msg)
			}
		}
		return !!(code == succ)
	},
	/**
     * JSON对象转换URL参数
     * 
     * @method printRegInfo
     * @param {Object}
     *            json 需要转换的json数据
     * @return {String} url参数字符串
     */
	jsonToUrl: function(json) {
		var temp = []
		for (var key in json) {
			if (json.hasOwnProperty(key)) {
				var _key = json[key] + ''
				_key = _key.replace(/\+/g, '%2B')
				_key = _key.replace(/\&/g, '%26')
				temp.push(key + '=' + _key)
			}
		}
		return temp.join('&')
	},
	msg: {
		'suc': function(obj, text) {
			var _text = text || '数据提交成功！'
			$(obj).html(
				'<div class="msg-hint">' + '<h3 title=' + _text +
                '><i class="hint-icon hint-suc-s"></i>' + _text +
                '</h3>' + '</div>').show()
		},
		'war': function(obj, text) {
			var _text = text || '数据异常，请稍后尝试!'
			$(obj).html(
				'<div class="msg-hint">' + '<h3 title=' + _text +
                '><i class="hint-icon hint-war-s"></i>' + _text +
                '</h3>' + '</div>').show()
		},
		'err': function(obj, text) {
			var _text = text || '数据提交失败!'
			$(obj).html(
				'<div class="msg-hint">' + '<h3 title=' + _text +
                '><i class="hint-icon hint-err-s"></i>' + _text +
                '</h3>' + '</div>').show()
		},
		'load': function(obj, text) {
			var _text = text || '正在加载中，请稍候...'
			$(obj).html(
				'<div class="msg-hint">' + '<h3 title=' + _text +
                '><i class="hint-loader"></i>' + _text + '</h3>' +
                '</div>').show()
		},
		'inf': function(obj, text) {
			var _text = text || '数据提交中，请稍等...'
			$(obj).html(
				'<div class="msg-hint">' + '<h3 title=' + _text +
                '><i class="hint-icon hint-inf-s"></i>' + _text +
                '</h3>' + '</div>').show()
		},
		'errorInfo': function(obj, text) {
			var _text = text || '数据提交失败!'
			$(obj)
				.html(
					'<div class="ui-tiptext-container ui-tiptext-container-message"><p class="ui-tiptext ui-tiptext-message">' +
                    '<i class="ui-tiptext-icon icon-message" title="阻止"></i>' +
                    _text + '</p>' + '</div>').show()
		}
	}
}

Util.browser = {
	/**
     * 获取URL地址栏参数值
     * name 参数名
     * url [optional,default=当前URL]URL地址
     * @return {String} 参数值
     */
	getParameter: function(name, url) {
		var paramStr = url || window.location.search
		paramStr = paramStr.split('?')[1]
		if (undefined == paramStr || paramStr.length == 0) { return null }
		var params = paramStr.split('&')
		for (var i = 0; i < params.length; i++) {
			var parts = params[i].split('=', 2)
			if (parts[0] == name) {
				if (parts.length < 2 || typeof(parts[1]) === 'undefined' ||
                    parts[1] == 'undefined' || parts[1] == 'null')
					return ''
				return parts[1]
			}
		}
		return null
	}
}
/**
 * 常用正则表达式
 */
Util.validate = {
	/**
     * 格式校验方法
     * 
     * @method Check
     * @param {String}
     *            type 验证类型
     * @param {String}
     *            value 验证值
     */
	Check: function(type, value) {
		var _reg = this.regexp[type]
		if (_reg == undefined) {
			alert('Type ' + type + ' is not in the data')
			return false
		}
		var reg
		if (typeof _reg == 'string') {
			reg = new RegExp(_reg)
		} else if ((typeof _reg) == 'function') {
			return _reg(value)
		} else {
			reg = _reg[type]
		}
		return reg.test(value)
	}
}
Util.sms = {}
Util.sms.formatStr = function(value) {
	if (value) {
		if (arguments.length > 1) {
			for (var i = 1; i < arguments.length; i++) {
				value = value.replace(new RegExp('\\{' + (i - 1) + '\\}', 'g'), arguments[i])
			}
		}
	}
	return value
}

/*
 *	分页
 */
Util.pagination = function(pindex, onepage, obj, formStr) {
	Util.loading.create('.tablewidth') //添加loading提示
	var pageIndex = pindex
	var pageParams = obj
	var str = formStr //form序列化的数据 
	pageParams.page_index = pindex //弹出窗口修改数据后，刷新当前页的数据需要用到这些数据.
	pageParams.page_params = formStr
	Util.ajax.postJson(pageParams.url, 'start=' + (pageIndex * pageParams.items_per_page) + '&limit=' + pageParams.items_per_page + '&' + str, function(json, state) {
		if (pageParams.tablewrap instanceof jQuery) {
			var _page = pageParams.pagination
		} else {
			var _page = $('#' + pageParams.pagination)
		}
		var _jcontrol = $('#J_table_control')
		if (state) {
			if (pageParams.tablewrap instanceof jQuery) {
				var template = Handlebars.compile(pageParams.tabletpl.html())
				pageParams.tablewrap.html(template(json))
			} else {
				Util.ajax.loadTemp('#' + pageParams.tablewrap, $('#' + pageParams.tabletpl), json) //加载模板
			}
			//触发回调函数
			if (typeof obj.pageCallback == 'function') {
				obj.pageCallback.call(_page)
			}
			//分页调用-只初始化一次  
			if (onepage) {
				if (json.bean.total < 1) {
					_jcontrol.hide()
					_page.html('<p class="ui-tiptext ui-tiptext-warning">' +
                        '<i class="ui-tiptext-icon" title="警告"></i>' +
                        '没有查询到数据,请更换查询条件!' +
                        '</p>')
					_page.next().hide()
					_page.prev().hide()
				} else {
					_jcontrol.show()
					_page.pagination(json.bean.total, {
						'items_per_page': pageParams.items_per_page,
						'current_page': pageIndex,
						'num_display_entries': 3,
						'num_edge_entries': 1,
						'link_to': '#tradeRecordsIndex',
						'prev_text': '<',
						'next_text': '>',
						'call_callback_at_once': false, //控制分页控件第一次不触发callback.
						'callback': function(page_index, jq) {
							Util.pagination(page_index, false, pageParams, str)
						}
					})
					_page.next().text('共' + json.bean.total + '条').show()

					if (_page.prev().length < 1) {
						/*var $bf = $('<div class="fn-right fn-pt5 fn-pr10">'+
                            '每页<input type="text" class="element text" style="width:24px;" id="J_pagenum" title="输入数量后,请按回车" />条'+
                        '</div>');
			            _page.before($bf);
			            $bf.find("input").keyup(function(e){
                            var _self = $(this);
                            var newVal = _self.val().replace(/[^\d]/g,'');
                            //newVal = (newVal<1) ? 10 : newVal;
                            newVal = (newVal>500) ? 500 : newVal ;
                            _self.val(newVal);
                        }).keypress(function(e){
			                if(e.which==13){
                                var _self = $(this);
                                if(_self.val()<10){
                                    _self.val(10);
                                }
			                	pageParams.items_per_page = _self.val();
			                	$("#J_search").click();
			                }
			            });*/
					} else {
						_page.prev().show()
					}
				}
			}
		} else {
			var _errorMsg = json.returnMessage ? ('查询数据失败！原因：' + json.returnMessage) : '加载数据失败,请稍后再试!'
			_page.html('<p class="ui-tiptext ui-tiptext-warning">' +
                '<i class="ui-tiptext-icon" title="警告"></i>' +
                '' + _errorMsg +
                '</p>')
			_jcontrol.hide()
			_page.next().hide()
			_page.prev().hide()
		}
		Util.loading.close('.tablewidth') //隐藏loading提示
	})
}

/*
 *	Loading
 */
Util.loading = {
	create: function(obj, text) {
		text = text ? text : '正在加载中，请稍候...'
		$(obj).block({
			message: '<div class="fn-loading">' + text + '</div>',
			css: { border: '1px solid #DDD', padding: '10px 20px', textAlign: 'left', width: '20%' },
			overlayCSS: {
				backgroundColor: '#333',
				opacity: 0.2,
				cursor: 'wait'
			}
		})
	},
	close: function(obj) {
		$(obj).unblock()
	}
}

/*
 *	窗口控制
 */
Util.dialog = {
	//打开窗口
	openWin: function(title, url, width, height) {
		art.dialog.open(url, {
			title: title,
			lock: true,
			width: width + 'px',
			height: height + 'px',
			opacity: .2
		},
		false)
	},
	//关闭窗口	
	close: function(id) {
		if (id) {
			art.dialog.list[id].close()
		} else {
			art.dialog.close()
		}
	},
	//关闭所有窗口
	closeAll: function() {
		var list = art.dialog.list
		for (var i in list) {
			list[i].close()
		}
	}
}


/*
 * 功能:删除数组元素.
 * 返回:在原数组上删除后的数组
 */
Util.Arrays = {
	// 参数:dx删除元素的下标.
	removeByIndex: function(arrays, dx) {
		if (isNaN(dx) || dx > arrays.length) { return false }
		for (var i = 0, n = 0; i < arrays.length; i++) {
			if (arrays[i] != arrays[dx]) {
				arrays[n++] = arrays[i]
			}
		}
		arrays.length -= 1
		return arrays
	},
	//删除指定的item,根据数组中的值
	removeByValue: function(arrays, item) {
		for (var i = 0; i < arrays.length; i++) {
			if (item == arrays[i]) {
				break
			}
		}
		if (i == arrays.length) { return }
		for (var j = i; j < arrays.length - 1; j++) {
			arrays[j] = arrays[j + 1]
		}
		arrays.length--
		return arrays
	}
}

/**
 * 初始化下拉框
 * @param {*} exp 
 * @param {*} onchange 
 */
Util.initSelect = function(exp, onchange) {
	//初始化下拉框美化
	$(exp).selectWidget({
		change: onchange
	})
}

Util.Tips = (function() {
	var tips = {
		_successClazz: 'icons-success',
		_warningClazz: 'icons-warning',
		_warningClazz2: 'icons-warning1',
		_init: function() {
			$('body').append($('<div id="tips-div" style="text-align:center;position:fixed;margin:0 auto;bottom:90px;left:10%;width:80%;z-index:99999999;"></div>'))
		},
		_create: function(color, clazz) {
			// return $('<div style="float:center;width:5.33rem;display:inline-block;margin:3px auto;text-align:center;background-color: '+color+';border-radius: 4px;padding: 15px 10px"><span class='+clazz+'></span><p style="color: #fff;line-height: 32px;"></p></div>');
			return $('<div style="float:center;min-width:40%;width:auto;display:inline-block;margin:3px auto;text-align:center;background-color: ' + color + ';border-radius: 4px;padding: 15px 10px;"><span class=' + clazz + '></span><p style="font-size: 12px;color: #fff;line-height: 32px;"></p></div>')
		},
		_create2: function(color, clazz) {
			return $('<div style="float:center;width:5.33rem;display:inline-block;margin:3px auto;text-align:center;background-color: ' + color + ';border-radius: 4px;padding: 0.4rem 0;"><i class="tips_img"></i><p style="color: #fff;line-height: 32px;"></p></div>')
			// return $('<div style="float:center;min-width:40%;width:auto;display:inline-block;margin:3px auto;text-align:center;background-color: '+color+';border-radius: 4px;padding: 15px 10px;"><span class='+clazz+'></span><p style="font-size: 12px;color: #fff;line-height: 32px;"></p></div>');
		},
		success: function(msg, algin, single) {
			if (typeof algin == 'boolean') single = algin
			var e = tips._create('rgba(0,0,0,0.5)', tips._successClazz)
			tips._done(e, msg, algin, single)
		},
		warning: function(msg, algin, single) {
			if (typeof algin == 'boolean') single = algin
			var e = tips._create('rgba(0,0,0,0.5)', tips._warningClazz)
			tips._done(e, msg, algin, single)
		},
		warning2: function(msg, algin, single) {
			if (typeof algin == 'boolean') single = algin
			var e = tips._create2('rgba(0,0,0,0.5)', tips._warningClazz2)
			tips._done(e, msg, algin, single)
		},
		_done: function(e, msg, algin, single) {
			e.find('p').text(msg)
			single ? $('#tips-div').html(e) : $('#tips-div').append(e)
			if ('middle' == algin) {
				$('#tips-div').css('top', '45%')
				$('#tips-div').css('bottom', '')
			} else if ('bottom' == algin) {
				$('#tips-div').css('top', '')
				$('#tips-div').css('bottom', '30%')
			} else if ('top' == algin) {
				$('#tips-div').css('top', '0')
				$('#tips-div').css('bottom', '')
			}
			setTimeout(function() {
				e.fadeTo(1000, 0)
				setTimeout(function() { e.remove() }, 1000)
			}, 1000)
		}
	}
	$(document).ready(tips._init)
	return tips
})()

/**
 * 
 * @param {*} title 
 * @param {*} content 
 * @param {*} textList 
 * @param {*} callbackList 
 * var importConfirm = new Util.Confirm('批量添加', $('.import-tc-content-box'), ["确 定", "取 消"], [function () {
        console.log(this);
    }, function () {
        importConfirm.hide();
        console.log('取消')
    }]);
 */
Util.Confirm = function(title, content, textList, callbackList) {
	var self = this
	this._o = null
	this._callbackList = []
	this._id = Math.round(Math.random() * 1000000000)
	if (this._o) {
		this.remove()
	}
	var _c = null
	if (typeof content === 'object' && content instanceof jQuery) {
		_c = content.clone(true).show()
		content.remove()
	} else {
		_c = '<div style="padding:20px">' + content + '</div>'
	}
	this._callbackList = callbackList
	this._bindAction = function() {
		var btn = $('#' + this._id + ' .J_confirm_btn')
		for (var i = 0; i < btn.length; i++) {
			if (this._callbackList[i]) {
				$(btn[i]).click(this._callbackList[i])
			}
		}
	}
	this.show = function() {
		$('.ui-cover').show()
		self._o.show()
	}
	this.hide = function() {
		$('.ui-cover').hide()
		self._o.hide()
	}
	this.remove = function() {
		self._o.remove()
	}
	var html = ''
	if ($('.ui-cover').size() === 0) {
		html = '<div class="ui-cover" style="display:none;z-index:99998;"></div>'
	}
	html += '<div class="ui-modal-wrap" style="z-index:99999;display:none" id="' + this._id + '">' +
        '<div class="ui-modal">' +
        '<div class="close-wrap fn-tar">' +
        '<span class="modal-title">' + title + '</span>' +
        '<span class="iconfont xgk-icon-guanbi close-modal"></span>' +
        '</div>' +
        '<div class="fn-tal"></div>' +
        '</div>' +
        '<div class="modal-control-wrap">'
	if (textList.length == 2) {
		html += '<span class="J_confirm_btn btn btn-orange">' + textList[0] + '</span>'
		html += '<span class="J_confirm_btn btn btn-cancel">' + textList[1] + '</span>'
	}
	html += '</div></div>'
	$('body').append($(html))
	this._o = $('#' + this._id)
	$('#' + this._id + ' .fn-tal').append(_c)
	this._bindAction()
	$('.ui-cover,#' + this._id + ' .close-modal').click(self.hide)
	this.ele = this._o
};

/*
    NiceSelect ： 获取下拉框
    参数设置：
    {
        url:"添加",
        datas:"",
        id : "J_form_add",
        name : "J_form_add",
        handler:function(){
          //do...
        }
    }
    eg:
    {
        url:"business?service=ajax&page=Common&listener=getStaticData",
        datas:"codeType="+codeType,
        id:"testId",
        name:"testId"
    }
*/
(function($) {
	$.fn.extend({
		'NiceSelect': function(options) {
			var _self = this
			options = $.extend({
				url: '../../data/selectDatas.json',
				datas: 'codeType=test',
				id: 'testId',
				name: 'testId',
				key: 'CODE_VALUE',
				value: 'CODE_NAME',
				defaultValue: '',
				all: false, //是否显示"所有",值是"" 。 默认显示"请选择"，值是"" 
				allVal: '',
				handler: function() { //onchange事件
				},
				callback: function() { //回调事件
				}
			}, options)
			sendAjax()

			function sendAjax() {
				Util.ajax.postJson(options.url, options.datas, ajaxCallback)
			}

			function errorAjax() {
				var $a = $('<a href="javascript:;">重新加载数据</a>')
					.bind('click', function() {
						sendAjax()
					})
				_self.html($a)
			}

			function ajaxCallback(json, state) {
				//判断状态,是否成功
				if (state) {
					var ops = '<select class="element text" id="' + options.id + '" name="' + options.name + '" >'
					if (json.beans.length != 1) {
						if ((typeof options.all == 'boolean') && (options.all.constructor == Boolean)) {
							if (options.all) {
								ops += '<option value="">所有</option>'
							} else {
								ops += '<option value="">所有</option>'
							}
						} else {
							if (options.all != '') {
								ops += '<option value="' + options.allVal + '">' + options.all + '</option>'
							} else {
								ops += ''
							}
						}
					}
					for (var i = 0; i < json.beans.length; i++) {
						//添加设置默认值
						var sel = ''
						if (options.defaultValue) {
							sel = (json.beans[i][options.key] == options.defaultValue) ? 'selected=\'selected\'' : ''
						}
						ops += '<option value="' + json.beans[i][options.key] + '" ' + sel + ' >' + json.beans[i][options.value] + '</option>'
					}
					ops += '</select>'
					_self.html($(ops).bind('change', options.handler))
					//触发回调函数
					if (typeof options.callback == 'function') {
						options.callback.call(_self.find('select')[0])
					}
					if (options.muti) {} else {
						//把下拉框变成可以输入的下拉框
						//_self.find("select").combobox();
					}
				} else {
					errorAjax()
				}
			}
			return this
		}
	})
})(jQuery)

$.extend($.fn, {
	fnTimeCountDown: function(d) {
		this.each(function() {
			var $this = $(this)
			var o = {
				hm: $this.find('.hm'),
				sec: $this.find('.sec'),
				mini: $this.find('.mini'),
				hour: $this.find('.hour'),
				day: $this.find('.day'),
				month: $this.find('.month'),
				year: $this.find('.year')
			}
			var f = {
				haomiao: function(n) {
					if (n < 10) return '00' + n.toString()
					if (n < 100) return '0' + n.toString()
					return n.toString()
				},
				zero: function(n) {
					var _n = parseInt(n, 10) //解析字符串,返回整数
					if (_n > 0) {
						if (_n <= 9) {
							_n = '0' + _n
						}
						return String(_n)
					} else {
						return '00'
					}
				},
				dv: function() {
					var _d = $this.data('end')
					var now = new Date(),
						endDate = new Date(_d)
					//现在将来秒差值
					//alert(future.getTimezoneOffset());
					var dur = (endDate - now.getTime()) / 1000,
						mss = endDate - now.getTime(),
						pms = {
							hm: '000',
							sec: '00',
							mini: '00',
							hour: '00',
							day: '00',
							month: '00',
							year: '0'
						}
					if (mss > 0) {
						// pms.hm = f.haomiao(mss % 1000);
						pms.sec = f.zero(dur % 60)
						pms.mini = Math.floor((dur / 60)) > 0 ? f.zero(Math.floor((dur / 60)) % 60) : '00'
						pms.hour = Math.floor((dur / 3600)) > 0 ? f.zero(Math.floor((dur / 3600)) % 24) : '00'
						pms.day = Math.floor((dur / 86400)) > 0 ? f.zero(Math.floor((dur / 86400)) % 30) : '00'
						//月份，以实际平均每月秒数计算
						pms.month = Math.floor((dur / 2629744)) > 0 ? f.zero(Math.floor((dur / 2629744)) % 12) : '00'
						//年份，按按回归年365天5时48分46秒算
						pms.year = Math.floor((dur / 31556926)) > 0 ? Math.floor((dur / 31556926)) : '0'
					} else {
						pms.year = pms.month = pms.day = pms.hour = pms.mini = pms.sec = '00'
						pms.hm = '000'
						//alert('结束了');
						return
					}
					return pms
				},
				ui: function() {
					if (o.hm) {
						o.hm.html(f.dv().hm)
					}
					if (o.sec) {
						o.sec.html(f.dv().sec)
					}
					if (o.mini) {
						o.mini.html(f.dv().mini)
					}
					if (o.hour) {
						o.hour.html(f.dv().hour)
					}
					if (o.day) {
						o.day.html(f.dv().day)
					}
					if (o.month) {
						o.month.html(f.dv().month)
					}
					if (o.year) {
						o.year.html(f.dv().year)
					}
					setTimeout(f.ui, 1)
				}
			}
			f.ui()
		})
	}
})

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function(fmt) { //author: meizz 
	var o = {
		'M+': this.getMonth() + 1, //月份 
		'd+': this.getDate(), //日 
		'h+': this.getHours(), //小时 
		'm+': this.getMinutes(), //分 
		's+': this.getSeconds(), //秒 
		'q+': Math.floor((this.getMonth() + 3) / 3), //季度 
		'S': this.getMilliseconds() //毫秒 
	}
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
	for (var k in o)
		if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
	return fmt
}