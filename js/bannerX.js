function $(el) {
	if (document.querySelectorAll(el).length > 1) {
		return document.querySelectorAll(el);
	} else {
		return document.querySelector(el);
	}
}

// 找到事件源
let banner = $(".banner"); // 盒子容易
let ul = $(".slider-wrapper"); // 移动容器
let list = $(".slider-item"); // banner图集
let len = $(".slider-item").length; // banner图集的数量
let liWidth = $(".slider-item")[0].offsetWidth; // banner图的宽度
let page = $(".circle"); // 分页器容器
let prev = $(".btn-prev"); // 左按钮
let next = $(".btn-next"); // 右按钮

export { banner };
// 按banner图数量生成分页器圆点
function creatPage() {
	fragment = document.createDocumentFragment();
	for (let i = 0; i < len; i++) {
		li = document.createElement("li");
		li.className = "point";
		fragment.appendChild(li);
	}
	page.appendChild(fragment);
	page.querySelectorAll(".point")[0].classList.add("on");
}
creatPage();

let points = $(".point"); // 分页器圆点

// 图片序号
let currentIndex = 0;

// 右按钮事件
next.onclick = function () {
	currentIndex++;
	if (currentIndex >= len) {
		currentIndex = 0;
	}
	change(currentIndex);
};

// 左按钮事件
prev.addEventListener("click", () => {
	currentIndex--;
	if (currentIndex < 0) {
		currentIndex = len - 1;
	}
	change(currentIndex);
});

// 分页器事件
points.forEach((point, i) => {
	point.setAttribute("data-index", i); // 给每个圆点添加序号
	point.addEventListener("mouseenter", () => {
		// 取得序号并通过程序滚动图片可以改变圆点样式
		currentIndex = point.getAttribute("data-index");
		change(currentIndex);
	});
});

// 自动播放事件
let timer = setInterval(next.onclick, 3000);

// 鼠标移动到轮播区域的时候定时器停止，移开的时候启动
banner.onmouseenter = function () {
	clearInterval(timer);
};
banner.onmouseleave = function () {
	timer = setInterval(next.onclick, 3000);
};

// 滚动图片程序
function change(index) {
	// 图片移动
	ul.style.left = -liWidth * index + "px";

	// 分页器圆点样式处理
	for (point of points) {
		point.classList.remove("on");
	}
	points[index].classList.add("on");
}
