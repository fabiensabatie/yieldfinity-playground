import React, { useRef, useState } from "react";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

export function Upload() {
  const [files, setFiles] = useState("");
  const fileInput = useRef<any>()
  const handleChange = (e:any) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e: any) => {
      setFiles(JSON.parse(e.target.result));
    };
  };
  return (
    <div className="w-full h-full flex items-center">
      <button  className="p-3 bg-black-primary uppercase text-white text-sm rounded-md" onClick={() => { fileInput.current.click() }}>Upload your positions</button>
      <input
        type='file'
        name='image'
        ref={fileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      <HelpOutlineIcon className="ml-4 text-base cursor-pointer"></HelpOutlineIcon>
    </div>
  );
}