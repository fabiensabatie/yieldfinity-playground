import { modelsType } from '../editorContext';
import monacoForType, { editor } from 'monaco-editor';
import getModelsInOrder from './getModelsInOrder';
import { TSCompileService } from '../../../../../services/ts-compile.service';
import appendPackageImports from './appendPackageImports';
import { Store } from '../../../../../store';

function getErrors(
  monacoInstance: typeof monacoForType,
  orderedModels: editor.ITextModel[]
) {
  //Get model decoration errors
  const ranPaths = orderedModels.map(textModel => textModel.uri.path);
  const ranModelMarkers = monacoInstance.editor
    .getModelMarkers({})
    .filter(markers => ranPaths.includes(markers.resource.path));
  let messages = ranModelMarkers
    .filter(marker => marker.severity === 8)
    .map(model => `${model.resource.path.substr(1)}: ${model.message}`);

  //Get import/export formatting errors
  console.log(JSON.stringify(orderedModels[0].getValue()));
  orderedModels.map(textModel => {
    const errors = textModel.getValue().match(/export\s+[^{]+/);
    const errorsFormatted = errors?.map(
      error =>
        `Error: '${error}', this editor only supports named exports contained in a single line. Like 'export {thing1, thing2}`
    );
    if (errorsFormatted) {
      messages = [...messages, ...errorsFormatted];
    }
  });
  return messages;
}

export default async function runFile(
  editorId: string,
  monacoInstance: typeof monacoForType | undefined,
  models: modelsType | undefined,
  selectedIdx: number | undefined,
  setConsoleMessages: Function
): Promise<string | undefined> {
  setConsoleMessages([]);
  if (monacoInstance && models && selectedIdx !== undefined) {
    //runnerModel should (!) exist
    const runnerModel = monacoInstance.editor
      .getModels()
      .find(model => model.uri.toString() === 'file:///startegy.ts')!;
    const ranModels = getModelsInOrder(models[selectedIdx], monacoInstance); //dfs on imports
    ranModels.map(model => model.uri.path);

    //If type errors log and don't run files.
    const errors = getErrors(monacoInstance, ranModels);
    errors.map(error => console.error(error, editorId));
    //Concat files
    if (!errors.length) {
      const lines =
        ranModels
          .map(model =>
            model
              .getValue()
              .replace(
                /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g,
                ''
              )
              .replace(/export\s+{[^}]*}/g,'')
          ) //text array for each model
          .reduce((prevLines, line) => prevLines + line) + '\r\nexport {}'; //Prevents duplicate identifiers by making module;
    //Set runner model value as concatted text

    // runnerModel.setValue(lines);
    // const tsClient = await monacoInstance.languages.typescript
    //   .getTypeScriptWorker()
    //   .then(worker => worker(runnerModel.uri));
    // const emittedJS = (
    //   await tsClient.getEmitOutput(runnerModel.uri.toString())
    // ).outputFiles[0].text.replace(/export {};\r\n/, '');
    
      const importLines = appendPackageImports(monacoInstance, lines).join('\n')

      const compiled =  TSCompileService(importLines + lines).replaceAll('"use strict";', "");
      return compiled + "\nexports.endpoint = async (request, response) => { response.write(JSON.stringify(await backtest())); response.end(); } "
    }
  }
}

//Run every test file (currently only support 1 tested file)
export async function runTestFile(
  editorId: string,
  monacoInstance: typeof monacoForType | undefined,
  models: modelsType | undefined,
  setConsoleMessages: Function
) {
  let testModelIndex = models?.findIndex(model => model.tested);
  if (typeof testModelIndex !== 'undefined' && testModelIndex !== -1) {
    await runFile(
      editorId,
      monacoInstance,
      models,
      testModelIndex,
      setConsoleMessages
    );
  }
}
