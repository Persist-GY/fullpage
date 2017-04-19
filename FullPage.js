class FullPage {

    //构造函数
    constructor(options) {
        //默认
        let defaultOptions = {
            element: '',
            duration: '1s'
        }

        //记录当前是第几页
        this.currentIndex = 0;
        //记录是否正在滑动动画，状态锁
        this.animating = false
        this.options = Object.assign({}, defaultOptions, options)
        this.checkOptions();
        this.initHtml();
        this.bindEvents();
    }

    //判断this.option.element 是否合法
    checkOptions() {
        if (!this.options.element || typeof (this.options.element) === 'number' || typeof (this.options.element) === 'string') {
            throw new Error('element must be normal')
        }
        return this;
    }

    //给每一个section加transition
    initHtml() {
        let _this = this;
        this.options.element.style.overflow = 'hidden'
        console.log(this.options.element)
        for (let i = 0; i < this.options.element.children.length; i++) {
            let ee = this.options.element.children[i];

            ee.style.transition = `transform ${_this.options.duration}`
        }
        return this;
    }

    //绑定事件
    bindEvents() {

        let _this = this;

        //鼠标滑轮滚动事件
        dom.on(this.options.element, 'wheel', function (e) {

            judgeCurrentIndex(1,e)
            
        })

        //移动端触摸滚动
        for (let i = 0; i < this.options.element.children.length; i++) {
            let ee = this.options.element.children[i];
            dom.Swipe(ee, function (event, direction) {
                judgeCurrentIndex(2,direction)
            })

        }

        //判断当前是第几页
        function judgeCurrentIndex(isWheel,param) {
            if (_this.animating) {
                return;
            }
            if (isWheel === 1) {
                _this.currentIndex = _this.currentIndex + (param.deltaY > 0 ? 1 : -1)
            } else {
                if (param === 'down') {
                    _this.currentIndex--;
                }
                if (param === 'up') {
                    _this.currentIndex++;
                }
            }

            if (_this.currentIndex < 0) {
                _this.currentIndex = 0;
                return;
            }
            if (_this.currentIndex >= _this.options.element.children.length) {
                _this.currentIndex = 3;
                return;
            }

            _this.goToSection()

        }
        return this;
    }

    //滑动到第几页
    goToSection() {
        let _this = this;
        this.animating = true;
        console.log(this.currentIndex)
        //每一个section 监听动画完成可以继续滚动
        function handle() {
            _this.animating = false;
            this.removeEventListener('transitionend', handle)
        }
        dom.on(this.options.element.children[this.currentIndex], 'transitionend', handle)

        //滚动到下一页
        for (let i = 0; i < this.options.element.children.length; i++) {

            let ee = this.options.element.children[i];
            ee.style.transform = `translateY(-${100 * _this.currentIndex}%)`
        }
        return this;
    }
}