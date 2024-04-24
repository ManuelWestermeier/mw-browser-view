import { envoirment } from "./envoirement"

export function createRenderingCanvas(canvas = document.createElement("canvas"), resource) {

    const ctx = canvas.getContext("2d")
    const rect = canvas.getClientRects().item(0)

    envoirment(resource, canvas, ctx, rect)

}