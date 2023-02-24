import React, { useEffect, useState } from 'react';
import usfmData from "./data/joel.json"
import { perf2html } from "./core/renderer";

export const AppContext = React.createContext();

export function AppContextProvider({
  children,
}) {
  const [printPreview, setPrintPreview] = useState(false)
  const [html, setHtml] = useState(null);

  useEffect(() => {
    
    const fetchHtml = async () => {
      const {htmlString} = perf2html(usfmData)
      setHtml(htmlString);
      setPrintPreview(false)
    }

    if ( printPreview ) {
      console.log("print preview was clicked");
      fetchHtml();
    }
  }, [printPreview]);

  useEffect(() => {
    if ( html ) {
      console.log("html data is available",{html})
      const newPage = window.open('','','_window');
      newPage.document.head.innerHTML = 
      `<head>
          <meta charset="UTF-8"/>
          <title>PDF Render</title>
          <script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"></script>
          <script>
          </script>
      </head>`;
      console.log("html rader", newPage.document)
      const script = newPage.document.createElement('script');
      script.src = 'https://unpkg.com/pagedjs/dist/paged.polyfill.js';
      newPage.document.head.appendChild(script);
      const style = newPage.document.createElement('style');
      const newStyles = `
      body {
        margin: 1em;
        background: grey;
      }
      .pagedjs_pages {
      }
      .pagedjs_page {
        background: white;
        margin: 1em;
      }
      .pagedjs_right_page {
        float: right;
      }
      .pagedjs_left_page {
        float: left;
      }
      div#page-2 {
        clear: right;
      }
      `;
      // style.innerHTML = newStyles + html.replace(/^[\s\S]*<style>/, "").replace(/<\/style>[\s\S]*/, "");
      // console.log({style})
      // newPage.document.head.appendChild(style);
      // newPage.document.body.innerHTML = html.replace(/^[\s\S]*<body>/, "").replace(/<\/body>[\s\S]*/, "");      
      newPage.document.body.innerHTML = html   
      setHtml(null);
    }
  }, [html])



  // create the value for the context provider
  const context = {
    state: {
      printPreview,
    },
    actions: {
      setPrintPreview,
    },
  };

  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  );
};

