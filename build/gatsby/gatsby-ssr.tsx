import React from "react";
import { readdirSync } from 'fs';

const publicFolder = '../../../public'

const isWorker = file => file.endsWith('.worker.js')
const shouldPreload = (file, preloads) => preloads.some(preload => file.includes(preload))

let preloadScripts = []

export const onRenderBody = ({ setHeadComponents }, { preloads = [] } = {}) => {

  if (!preloadScripts.length) {
    preloadScripts = readdirSync(publicFolder)
      .filter(file => isWorker(file) && shouldPreload(file, preloads))
      .map(file => (
        <link
          key={file}
          as='worker'
          crossOrigin='anonymous'
          href={`/${file}`}
          rel='preload'
        />
      ))
  }

  setHeadComponents(preloadScripts)

};

export * from './gatsby-browser';
