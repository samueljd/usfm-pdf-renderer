import React, { useEffect, useState } from 'react';
import usfmData from "./data/joel.json"
import { perf2html } from "./core/renderer";

export const AppContext = React.createContext();

export function AppContextProvider({
  children,
}) {
  const [printPreview, setPrintPreview] = useState(false)
  const [html, setHtml] = useState(null);
  const [htmlString, setHtmlString] = useState(null);
  const [currentHtml, setCurrentHtml] = useState();
  const [printPageSize,setPrintPageSize] = useState('A4')

  useEffect(() => {
    if (printPreview) {
      console.log("beforeupdate")
      const updatedHtml = document.getElementById("previewDiv").innerHTML;      
      console.log("after update")
      setCurrentHtml(updatedHtml)
      setHtml(updatedHtml)
      setPrintPreview(false)
    }
  }, [printPreview]);

  useEffect(() => {
    console.log({printPageSize})
    if (html) {
      const newPage = window.open('', '', '_window');
      const script = newPage.document.createElement('script');
      script.src = 'https://unpkg.com/pagedjs/dist/paged.polyfill.js';
      newPage.document.head.appendChild(script);
      const style = newPage.document.createElement('style');
      const newStyles = `
      body {
        margin: 1em;
        background: grey;
      }
      @page {
        size: ${printPageSize.cssVal};
      }
      .pagedjs_pages {
      }
      .pagedjs_page {
        background: white;
        margin: 1em;
      }
      div#page-2 {
        clear: right;
      }
      `;
      style.innerHTML = newStyles + html.replace(/^[\s\S]*<style>/, "").replace(/<\/style>[\s\S]*/, "");
      newPage.document.head.appendChild(style);
      newPage.document.body.innerHTML = html.replace(/^[\s\S]*<body>/, "").replace(/<\/body>[\s\S]*/, "");
      newPage.document.body.innerHTML = html
      setHtml(null);
    }
  }, [html, currentHtml ,printPageSize, printPreview])



  // create the value for the context provider
  const context = {
    state: {
      htmlString,
      printPreview,
      currentHtml
    },
    actions: {
      setHtmlString,
      setPrintPreview,
      setCurrentHtml,
      setPrintPageSize
    },
  };

  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  );
};

