import {
  useMonaco,
  useModels,
  useModelIndex,
  useConsoleMessages,
} from '../editorContext';

import runFile from '../utils/runFile';
import { Store } from "../../../../../store";

export default function useCtrlRunFile(id: string) {
  const [monacoInstance, setMonacoInstance] = useMonaco();
  const [selectedIdx, setSelectedIdx] = useModelIndex();
  const [models, setModels] = useModels();
  const [consoleMessages, setConsoleMessages] = useConsoleMessages();
  const setConsoleCode = Store.strategies(state => state.setConsole);

  let runCtrlFile = async () => {
    const code = await runFile(id, monacoInstance, models, selectedIdx, setConsoleMessages);
    setConsoleCode(code || "")
  }
    
  return runCtrlFile;
}
