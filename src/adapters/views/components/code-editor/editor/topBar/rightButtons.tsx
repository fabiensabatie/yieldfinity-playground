import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import React from 'react';
import { Store } from "../../../../../store";
import {
  modelsInfoType, useConsoleMessages, useEditor, useModelIndex, useModels, useMonaco
} from '../editorContext';
import runFile from '../utils/runFile';

type PlayButtonType = { editorId: string; modelsInfo: modelsInfoType };
export default function PlayButton({ editorId, modelsInfo }: PlayButtonType) {
  const [selectedIdx, setSelectedIdx] = useModelIndex();
  const setConsoleMessages = useConsoleMessages()[1];
  const monacoInstance = useMonaco()[0];
  const ctxEditor = useEditor()[0];
  const [models, setModels] = useModels();
  const setConsoleCode = Store.strategies(state => state.setConsole);
  const setPositions = Store.positions(state => state.set);

  return (
    <div style={{ display: 'flex', marginLeft: 'auto', marginRight: '3px' }}>
      <PlayArrowIcon
        onClick={async () => {
          const code = await runFile(
            editorId,
            monacoInstance,
            models,
            selectedIdx,
            setConsoleMessages
          );
          setConsoleCode(code || "", setPositions)
        }}
        style={{ color: '#09ad11' }}
      />
    </div>
  );
}
