// 整个站点都会用到的函数

// 文档加载完全后的运行函数，可多次调用
function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}

// 节点后插入节点函数
function insertAfter(NewElement,targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(NewElement);
	}else{
		parent.insertBefore(NewElement,targetElement.nextSibling);
	}
}

// 追加样式函数
function addClass(element,value){
	if(!element.className){
		element.className = value;
	}else{
		newClassName = element.className;
		newClassName+= " ";
		newClassName+= value;
		element.className = newClassName;
	} 
}



// Home页

// 当前所在页的导航链接突出显示
function highlightPage() {
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;

	var headers = document.getElementsByTagName('header');
	if(headers.length == 0) return false;
	var navs = headers[0].getElementsByTagName('nav');
	if(navs.length == 0) return false;

	var links = navs[0].getElementsByTagName('a');
	var linkurl;
	for(var i=0; i<links.length; i++) {
		linkurl = links[i].getAttribute('href');
		if(window.location.href.indexOf(linkurl) != -1) {
			links[i].className = "here";
			var linktext = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id",linktext);
		}
	}
}
addLoadEvent(highlightPage);

//图像移动的动画
function moveElement(elementID,final_x,final_y,interval) {
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;

	var elem = document.getElementById(elementID);
	if(!elem.movement) {
		clearTimeout(elem.movement);
	}
	if(!elem.style.left) {
		elem.style.left="0px";
	}
	if(!elem.style.top) {
		elem.style.top="0px";
	}
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if(xpos == final_x && ypos ==final_y) {
		return true;
	}
	if(xpos < final_x) {
		var dist = Math.ceil((fina_x - xpos)/10);
		xpos = xpos + dist;
	}
	if(xpos > final_x) {
		var dist = Math.ceil((xpos - final_x)/10);
		xpos = xpos - dist;
	}
	if(ypos < final_y) {
		var dist = Math.ceil((fina_y - ypos)/10);
		ypos = ypos + dist;
	}
	if(ypos > final_y) {
		var dist = Math.ceil((ypos - final_y)/10);
		ypos = ypos - dist;
	}
	elem.style.left = xpos + "px";
	elem.style.top = ypos +"px";
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat,interval);
}
// 创建幻灯片并调用动画函数
function prepareSlideshow() {
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("intro")) return false;
	var intro = document.getElementById("intro");
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	var frame = document.createElement("img");
	frame.setAttribute("src","images/frame.gif");
	frame.setAttribute("alt","");
	frame.setAttribute("id","frame");
	slideshow.appendChild(frame);
	var preview = document.createElement("img");
	preview.setAttribute("src","images/slideshow.gif");
	preview.setAttribute("alt","a glimpse of what awaits you");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);

	var links = document.getElementsByTagName("a");
	var destination;
	for(var i=0; i<links.length; i++) {
		links[i].onmouseover = function() {
			destination = this.getAttribute("href");
			if(destination.indexOf("index.html") != -1) {
				moveElement("preview",0,0,5);
			}
			if(destination.indexOf("about.html") != -1) {
				moveElement("preview",-150,0,5);
			}
			if(destination.indexOf("photos.html") != -1) {
				moveElement("preview",-300,0,5);
			}
			if(destination.indexOf("live.html") != -1) {
				moveElement("preview",-450,0,5);
			}
			if(destination.indexOf("contact.html") != -1) {
				moveElement("preview",-600,0,5);
			}
		}
	}
}
addLoadEvent(prepareSlideshow);



// About页

// 显示相应部分，隐藏其它部分
function showSection(id) {
	var sections = document.getElementsByTagName("section");
	for(var i=0; i<sections.length; i++) {
		if(sections[i].getAttribute("id") != id) {
			sections[i].style.display = "none";
		} else {
			sections[i].style.display = "block";
		}
	}
}
// 遍历导航链接并调用显示隐藏函数
function prepareInternalnav() {
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var articles = document.getElementsByTagName("article");
	if(articles.length == 0) return false;
	var navs = articles[0].getElementsByTagName("nav");
	if(navs.length == 0) return false;
	var nav = navs[0];
	var links = nav.getElementsByTagName("a");
	for(var i=0; i<links.length; i++) {
		var sectionId = links[i].getAttribute("href").split("#")[1];
		if(!document.getElementById(sectionId)) cotinue;
		document.getElementById(sectionId).style.display = "none"; 
		links[i].destination = sectionId;
		links[i].onclick = function() {
			showSection(this.destination);
			return false;
		}
	}
}

addLoadEvent(prepareInternalnav);



// Photos页

// 显示相应图片和文本描述
function showPic(whichpic) {
	if(!document.getElementById("placeholder")) return false;
	var sourse = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src",sourse);
	if(!document.getElementById("description")) return false;
	if(whichpic.getAttribute("title")) {
		var text = whichpic.getAttribute("title");
	} else {
		var text = "";
	}
	var description = document.getElementById("description");
	if(description.firstChild.nodeType == 3) {
		description.firstChild.nodeValue = text;
	}
	return false;
}

// 创建图片和描述节点
function preparePlaceholder() {
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var placeholder = document.createElement("img"); 
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/placeholder.gif");
	placeholder.setAttribute("alt","my image gallery");
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var destext = document.createTextNode("Choose an image");
	description.appendChild(destext);
	var gallery = document.getElementById("imagegallery");

	insertAfter(description,gallery);
	insertAfter(placeholder,description);
}

// 遍历列表中的图片链接并添加点击事件
function prepareGallery() {
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for(var i=0; i<links.length; i++) {
		links[i].onclick = function() {
			return showPic(this);
		}
	}
}

addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);



// Live页

// 区分表格奇偶行并添加样式
function stripeTables() {
	if(!document.getElementsByTagName) return false;
	var tables = document.getElementsByTagName("table");
	for(var i=0; i<tables.length; i++) {
		var odd = false;
		var rows = tables[i].getElementsByTagName("tr");
		for(var j=0; j<rows.length; j++) {
			if (odd == true) {
				addClass(rows[j],"odd");
				odd = false;
			} else {
				odd = true;
			}
		}
	}
}

//遍历表格每行，添加鼠标移动事件
function highlightRows() {
	if(!document.getElementsByTagName) return false;
	var rows = document.getElementsByTagName("tr");
	for(var i=0; i<rows.length; i++) {
		rows[i].oldClassName = rows[i].className;
		rows[i].onmouseover = function() {
			addClass(this,"highlight");
		}
		rows[i].onmouseout = function() {
			this.className = this.oldClassName;
		}
	}
}

// 获取表格里缩写部分，并创建定义列表
function displayAbbreviations() {
	if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
	var abbreviations = document.getElementsByTagName("abbr");
	if(abbreviations.length < 1) return false;

	var defs = new Array();
	for(var i=0; i<abbreviations.length; i++) {
		var current_abbr = abbreviations[i];
		if(current_abbr.childNodes.length < 1) continue; //子节点是文本 
		var definition = current_abbr.getAttribute("title");
		var key = current_abbr.lastChild.nodeValue; //获取文本内容
		defs[key] = definition;
	}

	var dlist = document.createElement("dl");
	for (key in defs) {
		var definition = defs[key];
		var dtitle = document.createElement("dt");
		var dtitle_text = document.createTextNode(key);
		dtitle.appendChild(dtitle_text);
		var ddesc = document.createElement("dd");
		var ddesc_text = document.createTextNode(definition);
		ddesc.appendChild(ddesc_text);
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}

	if(dlist.childNodes.length < 1) return false;
	var header = document.createElement("h3");
	var header_text = document.createTextNode("Abbreviations");
	header.appendChild(header_text);
	var articles = document.getElementsByTagName("article");
	if(articles.length == 0) return false;
	var container = articles[0]; 
	container.appendChild(header);
	container.appendChild(dlist);
}

addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);



// Contact页

//鼠标点击添加焦点事件
function focusLabels() {
	if(!document.getElementsByTagName) return false;
	var labels = document.getElementsByTagName("label");
	for(var i=0; i<labels.length; i++) {
		if(!labels[i].getAttribute("for")) continue;
		labels[i].onclick = function() {
			var id = this.getAttribute("for");
			if(!document.getElementById(id)) return false;
			var element = document.getElementById(id);
			element.focus();
		}
	}
}
addLoadEvent(focusLabels);

// 对不支持placeholder属性的浏览器，设置字段中始终可以显示提示信息
function resetFields(whichform) {
	if(Modernizr.input.placeholder) return;
	for(var i=0; i<whichform.elements.length; i++) {
		var element = whichform.elements[i];
		if(element.type == "submit") continue;
		var check = element.placeholder || element.getAttribute('placeholder');
		if(!check) continue;
		element.onfocus = function() {
			var text = this.placeholder || this.getAttribute('placeholder');
			if(this.value == text) {
				this.className='';
				this.value='';
			}
		}
		element.onblur = function() {
			if(this.value == "") {
				this.className = 'placeholder';
				this.value = this.placeholder || this.getAttribute('placeholder');
			}
		}
		element.onblur();
	}
}

function prepareForms() {
	for(var i=0; i<document.forms.length; i++) {
		var thisform = document.forms[i];
		resetFields(thisform);
		console.log(thisform);
		thisform.onsubmit = function() {
			return validateForm(this);
		}
	}
}

addLoadEvent(prepareForms);

// 验证表单
function isFilled(field) {
	if(field.value.replace(' ','').length == 0) return false;  //检验是否为空
	var placeholder = field.placeholder || field.getAttribute('placeholder');
	return(field.value != placeholder);   //返回true或false
}

function isEmail(field) {
	return(field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}

function validateForm(whichform) {
	for(var i=0; i<whichform.elements.length; i++) {
		var element = whichform.elements[i];
		if(element.required == 'required') {
			if(!isFilled(element)) {
				alert("Please fill in the "+element.name+" field.");
				return false;
			}
		}
		if(element.type == 'email') {
			if(!isEmail(element)) {
				alert("The "+element.name+" field must be a valid email address.");
				return false;
			}
		}
	}
	return true;
}

//提交表单

// 不同IE版本中使用得XMLHTTP对象不完全相同，使用以下函数兼容所有浏览器
function getHTTPObject() {
	if(typeof XMLHttpRequest == "undefined")
	  XMLHttpRequest = function() {
		try { return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
				catch (e) {}
		try { return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
			catch (e) {}
		try { return new ActiveXObject("Msxml2.XMLHTTP");}
			catch (e) {}
		return false;
	}
	return new XMLHttpRequest();
}

function displayAjaxLoading(element) {
	while (element.hasChildNodes()) {
		element.removeChild(element.lastChild);
	}
	var content = document.createElement("img");
	content.setAttribute("src","images/loading.gif");
	content.setAttribute("alt","Loading...");
	element.appendChild(content);
}

function submitFormWithAjax ( whichform , thetarget ) {
	var request = getHTTPObject();
	if (!request) { return false; }
	displayAjaxLoading(thetarget);
	var dataParts = [];
	var element;
	for (var i=0; i<whichform.elements.length; i++) {
		element = whichform.elements[i];
		dataParts[i] = element.name + '=' +encodeURIComponent(element.value);
	}
	var data = dataParts.join('&');
	request.open('POST', whichform.getAttribute("action"), true);
	request.setRequestHeader("Content-type" , "application/x-www-form-urlencoded");
	request.onreadystatechange = function() {
		if(request.readyState == 4) {
			if(request.status == 200 || request.status == 0) {
				var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
				if(matches.length > 0) {
					thetarget.innerHTML = mathes[1];
				} else {
					thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>'
				}
			} else {
				thetarget.innerHTML = '<p>' + request.statusText + '</p>';
			}
		}
	}
	request.send(data);
	return true;
}

function prepareForms() {
	for(var i=0; i<document.forms.length; i++) {
		var thisform = document.forms[i];
		resetfields(thisform);
		this.onsubmit = function() {
			var article = document.getElementsByTagName('article')[0];
			if(submitFormWithAjax(this,article)) return false;
		}
	}
}