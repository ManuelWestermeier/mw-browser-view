const catchString = Object.keys(window).map(key => `var ${key} = false`).join("\n")


export function envoirment(script, canvas, ctx, rect) {
    const mousePos = (evt) => {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    const view = {
        getWidth: () => canvas.width,
        getHeight: () => canvas.height,
        setWidth: (w) => canvas.width = w,
        setHeight: (h) => canvas.height = h,
        rect: (index = 0) => canvas.getClientRects().item(index),
        mousePos,
        on: (key, listener) => {
            if (key == "mouse-move") {
                canvas.onmousemove = e => {
                    listener({
                        preventDefault: () => e.preventDefault(),
                        movementX: e.movementX,
                        movementY: e.movementY,
                        ...mousePos(e)
                    })
                }
            }
            else if (key == "wheel") {
                canvas.onwheel = e => {
                    listener({
                        preventDefault: () => e.preventDefault(),
                        deltaX: e.deltaX,
                        deltaY: e.deltaY,
                    })
                }
            }
            else if (key == "click") {
                canvas.onclick = e => {
                    listener({
                        preventDefault: () => e.preventDefault(),
                    })
                }
            }
            else if (key == "context-menu") {
                canvas.oncontextmenu = e => {
                    e.preventDefault()
                    listener({
                        preventDefault: () => e.preventDefault(),
                    })
                }
            }
            else if (key == "key-up") {
                canvas.onkeyup = e => {
                    listener({
                        preventDefault: () => e.preventDefault(),
                        key: e.key,
                    })
                }
            }
            else if (key == "key-down") {
                canvas.onkeydown = e => {
                    listener({
                        preventDefault: () => e.preventDefault(),
                        key: e.key,
                    })
                }
            }
        }
    }

    eval(`(function (...arg) {
        ${catchString}
        var [view, ctx, rect, log, Promise, fetch, WebSocket, WebAssembly, setTimeout, setInterval, requestAnimationFrame] = arg;
        arg = false;
        try {
            ${script}
        } catch (error) {
            log(error)
        }
    })`)(view, ctx, rect, log, Promise, fetch, WebSocket, WebAssembly, setTimeout, setInterval, requestAnimationFrame)
}