import { modelType } from '../editorContext';
import monacoForType from 'monaco-editor';
import TopoSort from './TopoSort';

export default function appendPackageImports(
  monaco: typeof monacoForType,
  tsLines : string
) {
  const allModels = monaco.editor.getModels();
  //Parse import statements to perform DFS starting at selected model
  const strategy = allModels.find(model => {
    return model.uri.path === "/startegy.ts";
  });
  let importRegex = /import\s*[\s\S]*?\s*(from|import)\s+["']([^"']*)["']/g;
  let importStrings = (strategy?.getValue().match(importRegex) ?? []) //Get import strings
  return importStrings
}
