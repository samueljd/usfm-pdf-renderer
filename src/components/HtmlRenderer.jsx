import React,{ useContext } from "react";
import { AppContext } from '../App.context';
const HtmlRenderer = (props) => {
  const {
    actions: {
      setPrintPreview,
    }
  } = useContext(AppContext)
  const handlePrint = () => {
    // console.log("handlePrint() not yet implemented!")
    setPrintPreview(true)
  };
//     const {htmlString} = perf2html(usfmData)
//     console.log({htmlString})
// return <div dangerouslySetInnerHTML= {{__html: htmlString}} />
return         <button  onClick={handlePrint}>
            {"Print Imported Books"}
          </button>
}

export default HtmlRenderer;