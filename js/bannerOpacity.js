function $(el) {
	if (document.querySelectorAll(el).length > 1) {
		return document.querySelectorAll(el);
	} else {
		return document.querySelector(el);
	}
}
// 找到事件源
let banner = $(".banner"); // 盒子容器
let ul = $(".banner .slider-wrapper"); // 移动容器
let list = $(".banner .slider-item"); // banner图集
let len = $(".banner .slider-item").length; // banner图集的数量
let liWidth = $(".banner .slider-item")[0].offsetWidth; // banner图的宽度
let page = $(".banner .circle"); // 分页器容器
let prev = $(".btn-prev"); // 左按钮
let next = $(".btn-next"); // 右按钮

// 按banner图数量生成分页器圆点
function creatPage() {
	let fragment = document.createDocumentFragment();
	for (let i = 0; i < len; i++) {
		let li = document.createElement("li");
		li.className = "point";
		fragment.appendChild(li);
	}
	page.appendChild(fragment);
	page.querySelectorAll(".point")[0].classList.add("on");
}
creatPage();

let points = $(".banner .point"); // 分页器圆点

// 图片序号
let currentIndex = 0;

// 左按钮事件
prev[0].onclick = function () {
	currentIndex--;
	if (currentIndex < 0) currentIndex = len - 1;
	change(currentIndex);
};

// 右按钮事件;
next[0].onclick = function () {
	currentIndex++;
	if (currentIndex >= len) currentIndex = 0;
	change(currentIndex);
};

// 圆点鼠标经过事件
points.forEach((point, i) => {
	point.setAttribute("data-index", i); // 创建每个圆点序号
	point.addEventListener("mouseover", () => {
		currentIndex = point.getAttribute("data-index"); // 获取圆点序号，完成淡入淡出效果
		change(currentIndex);
	});
});

// 自动播放
let timer = setInterval(next[0].onclick, 1500);

// 鼠标经过关闭定时器，鼠标移开打开定时器
banner.addEventListener("mouseenter", () => {
	clearInterval(timer);
});
banner.onmouseleave = function () {
	timer = setInterval(next[0].onclick, 1500);
};

// 淡入淡出切换效果
function change(index) {
	list.forEach(li => {
		li.classList.remove("active");
	});
	list[index].classList.add("active");
	points.forEach(point => {
		point.classList.remove("on");
	});
	points[index].classList.add("on");
}

// 右侧淡入淡出处理
let gtList = $(".slider-recommend");
let lis = $(".recommend .slider-item"); // 右侧展示图集
let lenRt = $(".recommend .slider-item").length; // 右侧li数量
let liIndex = 0;
// 左按钮事件
prev[1].onclick = function () {
	liIndex--;
	if (liIndex < 0) liIndex = lenRt - 1;
	change1(liIndex);
};

// 右按钮事件;
next[1].onclick = function () {
	liIndex++;
	if (liIndex >= lenRt) liIndex = 0;
	change1(liIndex);
};
function change1(index) {
	lis.forEach(li => {
		li.classList.remove("active");
	});
	lis[index].classList.add("active");
}
// 自动播放
let timer1 = setInterval(next[1].onclick, 2000);

// 鼠标经过图片暂停播放，离开继续轮播
gtList.addEventListener("mouseenter", () => {
	clearInterval(timer1);
});
gtList.addEventListener("mouseleave", () => {
	timer1 = setInterval(next[1].onclick, 2000);
});

export { $ };
