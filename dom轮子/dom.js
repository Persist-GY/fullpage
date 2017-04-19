let dom = {

    /*
      监听操作事件
    */
    on: function (element, eventType, callback) {

        element.addEventListener(eventType, function (event) {
            // let el = event.target
            // if (el === element) {
            callback.call(element, event)
            // }

        })
        return element;
    },

    /*
      移动端滑动事件
    */
    Swipe: function (element, callback) {
        let x0, y0;

        //记录用户触碰开始位置
        element.addEventListener('touchstart', function (e) {
            x0 = e.touches[0].clientX
            y0 = e.touches[0].clientY

        })

        //记录用户在屏幕上不同方向移动
        element.addEventListener('touchmove', function (e) {

            if (!x0 || !y0) { return }
            //定义水平方向偏移量
            let xDiff = e.touches[0].clientX - x0;

            //定义竖直方向偏移量
            let yDiff = e.touches[0].clientY - y0;

            //判断水平方向偏移量大还是竖直方向偏移量大 哪个大确定哪个方向

            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                //水平方向
                if (xDiff > 0) {
                    callback.call(element, e, 'right')

                } else {
                    callback.call(element, e, 'left')

                }

            } else {
                //竖直方向
                if (yDiff > 0) {
                    callback.call(element, e, 'down')

                } else {
                    callback.call(element, e, 'up')
                }
            }

            //保证从触摸到结束，只是移动第一次时执行这个函数，如果触摸没有结束，接着移动，不会执行
            x0 = undefined;
            y0 = undefined;

        })
    },

    /*
      给一个元素添加class,同时移除兄弟的class
    */
    uniqueClass: function (element, className) {
        dom.every(element.parentNode.children, function (index, node) {
            node.classList.remove(className)
        })
        element.classList.add(className)
        return element;
    },

    /*
      便利数组或者类数组
    */
    every: function (nodeList, callback) {
        for (let i = 0; i < nodeList.length; i++) {
            callback(i, nodeList[i])
        }
        return nodeList
    },

    /* 
      传入一个html字符串，返回这个字符串中的第一个子元素
      http://stackoverflow.com/a/35385518/1262580 
    */
    create: function (html) {
        var template = document.createElement('template')
        template.innerHTML = html.trim() //去掉字符串首尾的空格
        return template.content.firstChild
    },

}