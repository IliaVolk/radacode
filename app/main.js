var getLegs = ()=>[1,2,3,4,5,6].map(i=>document.getElementById(`leg${i}`))
var getWidth = ()=>Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
var criticalWidth = 1100
var legTimeout = 0
window.onload = function() {

    var w = getWidth()
    if (w < criticalWidth)return
    var dy = 0.6 * Math.log(1.7+w/1821)
    var dx = 0.6 * Math.pow(w/1821, 2)
    var scale = 1+3*Math.log(1+dx)
    var setStyle = function(el, style){
        var [x, y, angle] = style
        el.setAttribute("style", `transform:translate(${dx * x}px, ${dy * y}px)
            rotate(${angle}deg)
            scale(${scale})`)
    }

    var styles = [
        [40, 20, 96],
        [280, 0, 90],
        [500, 70, 125],
        [650, 200, 150],
        [700, 420, 180],
        [690, 640, 200]
    ]
    var legs = getLegs()

    for (var i = 0; i < styles.length; i+=1){
        setStyle(legs[i], styles[i])
    }
    var delay = 1000
    var display = i=>{
        legs[i].className = ""
        if (legs[i+1]){
            legTimeout = setTimeout(display.bind(null, i+1), delay)
        }
    }
    legTimeout = setTimeout(display.bind(null,0), delay)

}

window.onresize = ()=>{
    var legs = getLegs()
    clearTimeout(legTimeout)
    if (getWidth()>criticalWidth){
        legs.forEach(leg=>leg.className = "")
        window.onload()
    }else {
        legs.forEach(leg=>leg.className = "displayNone")
    }
}