// 绘图事件
// window.onload = plotCurves; //加载时绘图
// window.onclick = plotCurves; //点击页面时绘图
// window.onresize = resizediv; //页面大小变化时调整画面尺寸
// window.ontouchstart = plotCurves;    // 触摸时绘图

// ==========================================================================
// 定义全局变量
// let c = document.getElementById('canvas');
// let cxt = c.getContext('2d');
// ==========================================================================
// ↓↓↓↓ 定义函数 ↓↓↓↓

// ■■■■■■■■■ 函数 调整主体高度 ■■■■■■■■■
function resizeCanvas() {
  // 调整canvas高度
  const bodyHeight = window.innerHeight || document.documentElement.clientHeight
  || document.body.clientHeight;
  const bodyWidth = window.innerWidth || document.documentElement.clientWidth
  || document.body.clientWidth;
  const canvas = document.getElementById('canvas');
  canvas.style.Height = `${bodyHeight}px`;
  canvas.style.width = `${bodyWidth}px`;
}

// 生成一下个随机点
function genNextPoint(currentPoint, h, w) {
  let xAdd = Math.random() * w * 0.2;
  let yAdd = Math.random() * h * 0.5;
  let nextPoint = [currentPoint[0] + xAdd, currentPoint[1] + yAdd];
  while (nextPoint[1] + yAdd <= 0.5 * h || nextPoint[1] + yAdd >= 0.98 * h) {
    xAdd = Math.random() * w * 0.2;
    yAdd = (Math.random() - 0.5) * h * 0.5;
    nextPoint = [currentPoint[0] + xAdd, currentPoint[1] + yAdd];
  }
  return nextPoint;
}

// 生成一系列随机点
function genPoints(h, w) {
  const points = [
    [0.0, (Math.random() * h * 0.5) + (h * 0.45)],
  ];
  const currentPoint = points.slice(-1)[0];
  let nextPoint = genNextPoint(currentPoint, h, w);
  points.push(nextPoint);
  let flag = 1;
  while (nextPoint[0] < w || flag < 4) {
    if (nextPoint[0] >= w) {
      flag += 1;
    }
    nextPoint = genNextPoint(nextPoint, h, w);
    points.push(nextPoint);
  }
  return points;
}

// 绘图 - 一条曲线
function plotCurve(points, color) {
  const c = document.getElementById('canvas');
  const cxt = c.getContext('2d');
  cxt.strokeStyle = color;
  // 绘制第一段曲线
  const p = points[0];
  cxt.beginPath();
  cxt.moveTo(p[0], p[1]);
  cxt.quadraticCurveTo(points[1][0], points[1][1], (points[1][0]
    + points[2][0]) / 2, (points[1][1] + points[2][1]) / 2);
  cxt.stroke();

  // 绘制之后的点的曲线，起点为点12的中点，终点为点23的中点
  for (let k = 1; k < points.length - 3; k += 1) {
    const p0 = points[k];
    const p1 = points[k + 1];
    const p2 = points[k + 2];
    cxt.beginPath();
    cxt.moveTo((p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2);
    cxt.quadraticCurveTo(p1[0], p1[1], (p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2);
    cxt.stroke();
  }
}

// 绘图 - 多条曲线
function plotCurves() {
  resizeCanvas();
  // cxt.fillStyle='#FFF';      //保留轨迹
  // cxt.fillRect(0, 0, w, h);  //保留轨迹
  // 更新全局变量: 设备像素比例，宽，高
  const dpr = window.devicePixelRatio || 1;
  const w = window.innerWidth || document.documentElement.clientWidth
  || document.body.clientWidth;
  const h = window.innerHeight || document.documentElement.clientHeight
  || document.body.clientHeight;
  const c = document.getElementById('canvas');
  const cxt = c.getContext('2d');
  c.width = w * dpr;
  c.height = h * dpr;
  cxt.scale(dpr, dpr);
  cxt.globalAlpha = 0.2;
  // 清除之前的画布
  cxt.clearRect(0, 0, w, h);
  // 生成两组随机颜色和两组随机点，两组: 开始组+结束组
  const colorData1 = [Math.round(Math.random() * 255), Math.round(Math.random()
    * 255), Math.round(Math.random() * 255)];
  const colorData2 = [Math.round(Math.random() * 255), Math.round(Math.random()
    * 255), Math.round(Math.random() * 255)];
  const points1 = genPoints(h, w);
  const points2 = [];
  // for (let k in points1) {
  points1.forEach((v, i) => {
    points2.push([points1[i][0], points1[i][1] + (Math.random() * h * 0.1)]);
  });
  // 绘制11条曲线
  for (let r = 0; r <= 1; r += 0.1) {
    // 生成用于绘图的点
    const points = [];
    for (let i = 0; i < points1.length; i += 1) {
      points.push(
        [points1[i][0], (r * points1[i][1]) + ((1 - r) * points2[i][1])],
      );
    }
    // 生成该曲线的颜色
    let color = [(r * colorData1[0]) + ((1 - r) * colorData2[0]),
      (r * colorData1[1]) + ((1 - r) * colorData2[1]),
      (r * colorData1[2]) + ((1 - r) * colorData2[2]),
    ];
    // color = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
    color = `rgb(${color[0]},${color[1]},${color[2]})`;
    // 按该组随机点和随机颜色，绘制一条曲线
    plotCurve(points, color);
  }
}

export { plotCurves, resizeCanvas };
