// 公共 工具 方法
window.comTools = {
  // 展示加载动画
  showLoading: (self, text) => {
    let txt = 'Loading...';
    if (text) {
      txt = text;
    }
    self.$vux.loading.show({
      text: txt
    })
  },
  // 取消加载动画
  hideLoading: (self) => {
    self.$vux.loading.hide()
  },
  // 改变url
  directRightUrl: () => {
    let {
      href,
      protocol,
      host,
      search,
      hash,
      pathname
    } = window.location;
    search = search || '?';
    hash = hash || '#/';
    let newHref = `${protocol}//${host}${pathname}${search}${hash}`;
    if (newHref !== href) {
      window.location.replace(newHref);
    }
  },	
	// 添加搜索
	setSearch: (cvalue) => {
		let str = localStorage.getItem('letu_search');
		if(!str) {
			localStorage.setItem('letu_search',JSON.stringify([cvalue]));
			return;
		}
		let arr = JSON.parse(str);
		arr.forEach ((ele,i) => {
			if(ele === cvalue) 
				arr.splice(i,1);
		});
		arr.unshift(cvalue);
		// 限制搜索历史不超过十条
		if (arr.length > 20) {
			arr.splice(20,1);
		}
		localStorage.setItem('letu_search',JSON.stringify(arr));	
	},
	deleteSearch: () => {
		localStorage.removeItem("letu_search");
	},
	// 获取搜索
	getSearch: () => {
		let str = localStorage.getItem('letu_search');
		return JSON.parse(str);
	},
  //  生成一定的滚动条使用的.
  resetHeight: (d, b) => {
    let docEl = window.document.documentElement;
    let h = docEl.clientHeight;
    let a = getComputedStyle(docEl)['font-size'];

    d.style.height = parseFloat(h) - parseFloat(a) * b + 'px';
  },
  // 重新设置高度
  setHeight: (b) => {
    let docEl = window.document.documentElement;
    let h = docEl.clientHeight;
    let a = getComputedStyle(docEl)['font-size'];
    let c = document.querySelector(".xs-container");
    let d = c.parentNode;

    c.style.minHeight = parseFloat(h) - parseFloat(a) * b + 'px';
    d.style.height = parseFloat(h) - parseFloat(a) * b + 'px';
  },
  // 循环重置数据 传入数组和index
  reArr: (arr, key, i) => {
    if (arr.length > 0) {
      arr.forEach((ele, index) => {
        if (index === i) {
          ele[key] = true;
        } else {
          ele[key] = false;
        }
      });
    }
    return arr;
  },
  // 循环重置数据 传入数组和index
  reObj: (obj, myKey, flag) => {
    for (let key in obj) {
      obj[key] = flag;
    }
    obj[myKey] = !flag;
    return false;
  }
}
