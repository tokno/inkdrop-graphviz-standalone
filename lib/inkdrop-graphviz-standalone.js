"use babel"

import Viz from "viz.js"
import { Module, render } from "viz.js/full.render.js"

import { markdownRenderer } from "inkdrop"
import * as React from 'react'

function DotRenderer({ children }) {
  const code = children[0]

  const [svg, updateSvg] = React.useState("")
  const [error, updateError] = React.useState(null)
  const containerRef = React.useRef(null)

  React.useEffect(() => {
    if (containerRef && containerRef.current) {
      containerRef.current.parentElement.classList.add("graphviz-container")
    }

    const viz = new Viz({ Module, render })
    viz.renderString(code)
      .then(s => {
        updateSvg(s)
        updateError(null)
      })
      .catch(e => {
        console.error(e.message)
        updateSvg("")
        updateError(e.message)
      })
  })

  const element = svg
    ? (<object type="image/svg+xml;base64" data={`data:image/svg+xml;base64,${new Buffer(svg).toString("base64")}`} ></object>)
    : (<div>{error}</div>)

  return (
        <div ref={containerRef}>
          {element}
        </div>
    )
}


export function activate() {
  markdownRenderer.remarkCodeComponents["dot"] = DotRenderer;
}

export function deactivate() {
  markdownRenderer.remarkCodeComponents["dot"] = null
}

