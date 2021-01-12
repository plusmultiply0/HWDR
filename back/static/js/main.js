/* global $ */
class Main {
    constructor() {
        // 获取html中的两个canvas元素
        this.canvas = document.getElementById('main');
        this.input = document.getElementById('input');

        // 设置元素占用空间的宽高
        this.canvas.width  = 449; // 16 * 28 + 1
        this.canvas.height = 449; // 16 * 28 + 1

        // 获取canvas二维渲染上下文
        this.ctx = this.canvas.getContext('2d');

        // 绑定事件
        // 按下鼠标事件
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        // 松开鼠标左键事件
        this.canvas.addEventListener('mouseup',   this.onMouseUp.bind(this));
        // 鼠标移动事件
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        
        this.initialize();
    }
    initialize() {
        // 绘制画布——用于画图的界面
        // 填充颜色为白色
        this.ctx.fillStyle = '#FFFFFF';
        // 填充矩形
        // 绘制矩形的左上顶点在（0，0），宽高为449像素
        this.ctx.fillRect(0, 0, 449, 449);
        // 设置线段的宽度为1
        this.ctx.lineWidth = 1;
        // 使用当前的绘画样式，描绘起点在0，0；宽高为449
        this.ctx.strokeRect(0, 0, 449, 449);

        // 设置线段的宽度为0.05
        this.ctx.lineWidth = 0.05;
        for (var i = 0; i < 27; i++) {
            // 绘画网格的竖线
            // 开始创建新路径
            this.ctx.beginPath();
            // 将一个新的子路径的起始点移动到(x，y)坐标的方法
            this.ctx.moveTo((i + 1) * 16,   0);
            // 使用直线连接子路径的终点到x，y坐标的方法（并不会真正地绘制）
            this.ctx.lineTo((i + 1) * 16, 449);
            // 将笔点返回到当前子路径起始点的方法。它尝试从当前点到起始点绘制一条直线。
            // 如果图形已经是封闭的或者只有一个点，那么此方法不会做任何操作。
            this.ctx.closePath();
            // 使用非零环绕规则，根据当前的画线样式，绘制当前或已经存在的路径的方法。
            this.ctx.stroke();
            // 绘画网格的横线
            this.ctx.beginPath();
            this.ctx.moveTo(  0, (i + 1) * 16);
            this.ctx.lineTo(449, (i + 1) * 16);
            this.ctx.closePath();
            this.ctx.stroke();
        }
        // 绘画初始的28x28样式
        // this.drawInput();
        $('#output td').text('').removeClass('success');
    }
    onMouseDown(e) {
        // 当按下鼠标左键的时候
        // 设置画布上的光标样式
        this.canvas.style.cursor = 'default';
        // 设置一个布尔值
        this.drawing = true;
        // 将鼠标左键点下的位置坐标，传入getPosition
        // 获取光标在canvas的位置坐标对象
        this.prev = this.getPosition(e.clientX, e.clientY);
    }
    onMouseUp() {
        // 更改布尔值，此时松开鼠标左键
        this.drawing = false;
        // 一次/一步绘画结束，重绘28x28内容，预测内容，显示预测结果
        this.drawInput();
    }
    onMouseMove(e) {
        // 只有在摁下鼠标左键才有效
        if (this.drawing) {
            // 得到当前光标在canvas中坐标
            var curr = this.getPosition(e.clientX, e.clientY);
            // 设置线宽/画笔宽度**
            this.ctx.lineWidth = 36;
            // 指定如何绘制每一条线段末端的属性，有点像画笔形状
            this.ctx.lineCap = 'round';
            // 开始画/开始路径
            this.ctx.beginPath();
            // 从按下的canvas相对坐标开始，
            this.ctx.moveTo(this.prev.x, this.prev.y);
            // 画笔移动至当前的canvas相对坐标
            this.ctx.lineTo(curr.x, curr.y);
            // 填充/绘画
            this.ctx.stroke();
            // 将笔点返回到当前子路径起始点的方法。它尝试从当前点到起始点绘制一条直线。 
            // 如果图形已经是封闭的或者只有一个点，那么此方法不会做任何操作。
            // 参照上行，结束此步/此处绘画
            this.ctx.closePath();
            // 将当前坐标设为/更新为prev的值——下一步绘画的起始值就是当前的坐标
            this.prev = curr;
        }
    }
    // 得到光标在canvas中的坐标（相对于左上角）
    getPosition(clientX, clientY) {
        // 获取当前canvas的大小及相对位置
        var rect = this.canvas.getBoundingClientRect();
        // 返回一个对象，包含在当前canvas中的位置
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }
    // 将大画布的内容重绘至28x28画布上
    // 28x28画布内容json化后，发送至后台预测
    // 将预测后结果显示在画布上
    drawInput() {
        // 访问this.input 获取上下文——28x28canvas
        var ctx = this.input.getContext('2d');
        // 创建一个新的HTMLImageElement实例。
        // 它的功能等价于 document.createElement('img')
        var img = new Image();
        // 元素加载时，触发事件
        img.onload = () => {
            var inputs = [];
            // 创建新的canvas元素，并获取上下文
            var small = document.createElement('canvas').getContext('2d');
            // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            // image需要绘制到上下文的图片
            // sx，sy：image的左上角坐标
            // sWidth, sHeight：需要绘制到上下文的宽高
            // dx, dy：image在上下文中的坐标
            // dWidth, dHeight：在上下文中绘制的宽高，允许缩放
            small.drawImage(img, 0, 0, img.width, img.height, 0, 0, 28, 28);
            // ImageData ctx.getImageData(sx, sy, sw, sh);
            // sx, sy：被提取的左上角坐标
            // sw, sh：被提取区域的宽高
            // 返回值：ImageData对象
            // ImageData.data 属性，返回 Uint8ClampedArray ，
            // 描述一个一维数组，包含以 RGBA 顺序的数据，数据使用  0 至 255（包含）的整数表示。
            var data = small.getImageData(0, 0, 28, 28).data;
            // 待仔细看
            // 绘制变换为28x28像素内容，
            for (var i = 0; i < 28; i++) {
                for (var j = 0; j < 28; j++) {
                    // n每次增加4x
                    var n = 4 * (i * 28 + j);
                    // 获取领近的data值，除以三；放入inputs数组
                    inputs[i * 28 + j] = (data[n] + data[n + 1] + data[n + 2]) / 3;
                    // 获取data数组的值，生成RGB颜色
                    ctx.fillStyle = 'rgb(' + [data[n], data[n + 1], data[n + 2]].join(',') + ')';
                    ctx.fillRect(j * 5, i * 5, 5, 5);
                }
            }
            // 解构input数组，最小值为255，就直接返回？
            if (Math.min(...inputs) === 255) {
                return;
            }
            // 将inputs数组json化后，发至后台
            // 获得预测结果的数组后，填充结果至页面；并标注每个模型预测的最靠近的结果
            $.ajax({
                url: '/api/mnist',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(inputs),
                success: (data) => {
                    // 遍历result数组，填充预测结果/分数/概率
                    for (let i = 0; i < 1; i++) {
                        //设为返回值第一个数|返回分数有正有负
                        var max = data.results[i][0];
                        var max_index = 0;
                        // 遍历result数组，填充预测结果/分数/概率
                        // 一行为一个模型的预测结果/分数
                        for (let j = 0; j < 10; j++) {
                            var value = Math.round(data.results[i][j]*1000);
                            console.log(value)
                            // 更新最大值及索引
                            if (value > max) {
                                max = value;
                                max_index = j;
                            }
                            var text = value;
                            // 往结果0-9里填值——分别由不同的模型处理结果
                            $('#output tr').eq(j + 1).find('td').eq(i).text(text);
                        }
                        // 根据结果中的最大值，更换|刷新 class/样式
                        for (let j = 0; j < 10; j++) {
                            if (j === max_index) {
                                $('#output tr').eq(j + 1).find('td').eq(i).addClass('success');
                                console.log('ok:'+j);
                            } else {
                                $('#output tr').eq(j + 1).find('td').eq(i).removeClass('success');
                            }
                        }
                    }
                }
            });
        };
        // toDataURL
        // 返回一个包含图片展示的 data URI 。
        // 可以使用 type 参数其类型，默认为 PNG 格式。图片的分辨率为96dpi

        // 将当前小/28x28canvas画布？的内容链接/插入到显示的img元素内
        // 将在28x28canvas画好的结果放进去，
        img.src = this.canvas.toDataURL();
        // img.download="new-image-name.jpg"
    }
}

$(() => {
    // 第一次初始化画布
    var main = new Main();
    // clear后，清空画布，重新开始
    $('#clear').click(() => {
        main.initialize();
    });
});
