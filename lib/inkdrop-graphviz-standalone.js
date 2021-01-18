"use babel"

import Viz from "viz.js"
import { Module, render } from "viz.js/full.render.js"

import { markdownRenderer } from "inkdrop"
import * as React from 'react'

function dotRenderer({ children }) {
  const code = children[0]

  const [element, updateElement] = React.useState("")
  const containerRef = React.useRef(null)

  React.useEffect(() => {
    if (containerRef && containerRef.current) {
      containerRef.current.parentElement.classList.add("graphviz-container")
    }

    const viz = new Viz({ Module, render })
    viz.renderString(code)
      .then(updateElement)
      .catch(console.log)
  })

  return (
        <div
          ref={containerRef}
          dangerouslySetInnerHTML={{
            __html: element,
          }}
        >
        </div>
    )
}


export function activate() {
  markdownRenderer.remarkCodeComponents["dot"] = dotRenderer;
}

export function deactivate() {
  markdownRenderer.remarkCodeComponents["dot"] = null
}

