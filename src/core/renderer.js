import {SofriaRenderFromProskomma} from "proskomma-json-tools";
import {sofria2WebActions} from './sofria2web'
import {Proskomma} from "proskomma-core"
import usfmData from "../data/joel.json"

const perf2html = ({data,bookCode}) =>{
  console.log({data,bookCode})
  const pk = new Proskomma()
  pk.importDocuments(
    {lang: 'xxx', abbr: 'XXX'}, // doesn't matter...
    'usfm', 
    [usfmData.data]
  );
  console.log({pk})
  const query = `{ documents { id bookCode: header( id: "bookCode") } }`
  const result = pk.gqlQuerySync(query)
  console.log({result})
  const docId = result.data.documents.filter(d=> d.bookCode === 'JOL')[0].id
  
  const renderer = new SofriaRenderFromProskomma({
    proskomma: pk,
    actions: sofria2WebActions,
    debugLevel: 0
  });
  
  const config = {
    showWordAtts: true,
    showTitles: true,
    showHeadings: true,
    showIntroductions: true,
    showFootnotes: true,
    showXrefs: true,
    showParaStyles: true,
    showCharacterMarkup: true,
    showChapterLabels: true,
    showVersesLabels: true
  };
  const output = {};
  try {
    renderer.renderDocument(
        {
            docId,
            config,
            output,
        },
    );
  } catch (err) {
    console.log("Renderer", err);
    throw err;
  }
  return output
}

export {perf2html}