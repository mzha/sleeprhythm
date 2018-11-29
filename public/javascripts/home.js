var links = [{label: 'Intro', bg: '#2ebdbd', bg2: '#537c8e', value: 'intro'},
             {label: 'Dawn', bg: '#718ec4', bg2: '#dc8998', value: 'dawn'},
             {label: 'Noon', bg: '#5389a6', bg2: '#a6dcee', value: 'noon'},
             {label: 'Dusk', bg: '#253477', bg2: '#c17a87', value: 'dusk'},
             {label: 'Midnight', bg: '#060621', bg2: '#202082', value: 'midnight'},
             {label: 'Disorders', bg: '#776477', bg2: '#a8aec1', value: 'disorders'},
             {label: 'More', bg: '#77888f', bg2: '#3d494c', value: 'more'}];
var windowHeight = window.innerHeight;
if(windowHeight === 0) windowHeight = 238;
var radius = windowHeight*0.5,
    circle = document.createElement('div'),
    title = document.createElement('h1'),
    borderSize = radius*0.021;
    totalArea = 54,
    increment = totalArea/(links.length-1),
    startPoint = 0-(totalArea/2),
    fontSize = radius*0.12,
    linkSize = radius*0.25;

styleTitle();
addTitle();
styleCircle();
addCircle();
addLinks();
styleLinks();
setBox('intro');

function styleCircle() {
  circle.style.border= borderSize+'px solid #fff';
  circle.style.width = radius*2+'px';
  circle.style.height = radius*2+'px';
  circle.style.borderRadius = radius+'px';
  circle.style.position = 'absolute';
  circle.style.top = '-'+radius*0.2+'px';
  circle.style.left = radius*-1+'px';
}

function styleTitle() {
  title.innerHTML = "Circadian Rhythms and You";
  title.style.width = radius*0.75 + 'px';
  title.style.height = radius-20 + 'px';
  title.style.position = 'absolute';
  title.style.top = radius/2 - (fontSize + 10)/2 + 'px';
  title.style.left = radius*0.12 + 'px';
  title.style.fontSize = fontSize + 10 + 'px';
  title.style.fontWeight = 'bolder';
  title.style.color = 'white';
}

function addTitle() {
  document.body.appendChild(title);
}

function addCircle() {
  document.body.appendChild(circle);
}

function addLinks() {
  for (var i=0, l=links.length; i<l; i++) {
    link = document.createElement('a'),
    hover = document.createElement('span');
    link.href = "#";
    link.dataset.color = links[i].bg;
    link.dataset.color2 = links[i].bg2;
    link.dataset.value = links[i].value;
    link.style.display = 'inline-block';
    link.style.textDecoration = 'none';
    link.style.color = '#fff';
    link.style.position = 'absolute';
    link.style.zIndex = 100;
    link.innerHTML = links[i].label
    hover.style.position = 'absolute';
    hover.style.display = 'inline-block';
    hover.style.zIndex = 50;
    hover.style.opacity = 0;
    document.body.appendChild(link);
    document.body.appendChild(hover);
    link.addEventListener('mouseover', linkOver);
    link.addEventListener('mouseout', linkOut);
    links[i].elem = link;
    links[i].hover = hover;
  }
}

function styleLinks() {
  for (var i=0, l=links.length; i<l; i++) {
    var link = links[i].elem, hover = links[i].hover, deg = startPoint+(i*increment);
    link.style.paddingLeft = radius*1.15+'px';
    link.style.fontSize = fontSize+'px';
    link.style.height = linkSize+'px';
    link.style.lineHeight = linkSize+'px';
    setTransformOrigin(link, '0px '+linkSize*0.5+'px');
    setTransition(link, 'all 0.2s ease-out');
    setTransform(link, 'rotate('+deg+'deg)');
    link.style.left = borderSize+'px';
    link.style.top = (windowHeight/2) - (windowHeight*0.16)+borderSize+'px';

    hover.style.left = borderSize+'px';
    setTransformOrigin(hover, '0px '+linkSize*0.5+'px');
    setTransition(hover, 'all 0.2s ease-out');
    setTransform(hover, 'rotate('+deg+'deg)');
    hover.style.top = (windowHeight*0.34)+borderSize +'px';
    hover.style.width = radius+(borderSize/2)+'px';
    hover.style.height = linkSize+'px';
    hover.style.borderRight = borderSize*2+'px solid #fff';

  }
}

function setBox(id) {
  var boxes = document.getElementsByClassName("box");
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].style.display = 'none';
  }
  var unhidden = document.getElementById(id);
  unhidden.style.display = 'block';
}

window.onresize = function() {
  windowHeight = window.innerHeight;
  radius = windowHeight*0.5,
  borderSize = radius*0.021;
  fontSize = radius*0.12,
  linkSize = radius*0.25;
  styleCircle();
  styleLinks();
  styleTitle();
}

function linkOver(e) {
  var thisLink = e.target, thisHover = thisLink.nextSibling;
  thisLink.style.paddingLeft = radius*1.2+'px';
  thisHover.style.opacity = 1;
  document.body.style.backgroundImage = "linear-gradient(to bottom right, " + thisLink.dataset.color + ", " + thisLink.dataset.color2 + ")";

  setBox(thisLink.dataset.value);
}

function linkOut(e) {
  var thisLink = e.target, thisHover = thisLink.nextSibling;
  thisLink.style.paddingLeft = radius*1.15+'px';
  thisHover.style.opacity = 0;
}

function setTransform(element, string) {
  element.style.webkitTransform = string;
  element.style.MozTransform = string;
  element.style.msTransform = string;
  element.style.OTransform = string;
  element.style.transform = string;
}

function setTransformOrigin(element, string) {
  element.style.webkitTransformOrigin = string;
  element.style.MozTransformOrigin = string;
  element.style.msTransformOrigin = string;
  element.style.OTransformOrigin = string;
  element.style.transformOrigin = string;
}

function setTransition(element, string) {
  element.style.webkitTransition = string;
  element.style.MozTransition = string;
  element.style.msTransition = string;
  element.style.OTransition = string;
  element.style.transition = string;
}
