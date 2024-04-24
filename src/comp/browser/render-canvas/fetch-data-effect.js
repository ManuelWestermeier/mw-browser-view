import { createRenderingCanvas } from "."

export async function getResource({
    protocol = "mw",
    pathName = "root",
    host = "localhost",
    port = 80
}, canvas) {

    var resource = ""

    if (protocol == "mw" || protocol == "mws") {

        const httpProtocol = protocol == "mw" ? "http" : "https"

        var res = await fetch(`${httpProtocol}://${host}:${port}`, {
            body: pathName,
            method: "POST"
        })
        resource = await res.text()

    }
    else {
        return alert("!!!wrong protocol!!!")
    }

    createRenderingCanvas(canvas, resource)

}