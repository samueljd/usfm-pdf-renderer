import {Proskomma} from 'proskomma-core'

export const usfm2perf = (usfm) => {
    let perf;
    try {
        const pk = new Proskomma();
        console.log({pk})
        pk.importDocuments(
            {lang: 'eng', abbr: 'jol'}, // doesn't matter...
            'usfm', 
            [usfm]
        );
        const perfResultDocument = pk.gqlQuerySync(
            '{documents {id docSetId perf} }')
            .data.documents[0];
        console.log({perfResultDocument})
        perf = JSON.parse(perfResultDocument.perf);
    } catch (e) {
      console.log(e)
        perf = null
    }
    return perf;
}
