import { modelType } from '../editorContext';
import monacoForType from 'monaco-editor';
import TopoSort from '../utils/TopoSort';

export default function getModelsInOrder(
  currentModel: modelType,
  monaco: typeof monacoForType
) {
  const allModels = monaco.editor.getModels();
  //Parse import statements to perform DFS starting at selected model
  const graph = allModels.map(model => {
    let importRegex = /(from|import)\s+["']([^"']*)["']/gm;
    let importStrings = (model.getValue().match(importRegex) ?? []) //Get import strings
    console.log(importStrings)
    let importName = importStrings.map(s => s.match(/["']([^"']*)["']/)![1]) //find name
    let importModels = importName.map(s =>
      allModels.findIndex(
        findImportModel => {
          return s.includes(findImportModel.uri.path.substring(1).replace(/\.[^.]*$/, ''))
        }
      )
    )
    return importModels
    .filter(index => index !== -1);
  });

  const currentIndex = allModels.findIndex(
    model => model === currentModel.model
  );
  //Perform DFS
  return TopoSort(currentIndex, graph).map(index => allModels[index]);
}
