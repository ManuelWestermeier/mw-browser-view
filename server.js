import http from "http"

function getBody(req) {
    return new Promise(res => {
        var body = ""

        req.on("data", chunk => {
            body += chunk.toString("utf-8")
        })

        req.on("end", () => {
            res(body)
        })

        req.on("error", () => res(new Error()))

    })
}

http.createServer(async (req, res) => {
    res.setHeader("content-type", "text/plain")

    if (req.method == "POST") {
        
        const body = await getBody(req)

        res.setHeader("Access-Control-Allow-Origin", "*")

res.end(
`var p = { x: 0, y: 0 }
var s = { x: 1, y: 1 }

function Update() {
    const rect = view.rect()  
    view.setWidth(rect.width)
    view.setHeight(rect.height)
    ctx.fillRect(p.x, p.y, s.x * 20, s.y * 20)
    requestAnimationFrame(Update)
}

Update()

view.on("mouse-move", e => {
    e.preventDefault()
    p = { x: e.x + s.x * -10, y: e.y + s.y * -10 }
    //p.x += e.movementX
    //p.y += e.movementY
})

view.on("wheel", e => {
    e.preventDefault()
    p.x -= e.deltaX / 800
    p.y -= e.deltaY / 800
    s.x += e.deltaX / 400
    s.y += e.deltaY / 400
})
`
)
    
    }
    else res.end("404")

}).listen(80)