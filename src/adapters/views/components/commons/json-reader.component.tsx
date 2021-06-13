import React, { useRef, useState } from "react";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useEffect } from "react";
import { Store } from "../../../store";
import PositionMapper from "../../../mappers/position.mapper";

export function Upload() {
  const fileInput = useRef<any>()
  const setPositions = Store.positions(state => state.set);
  const handleChange = (e:any) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e: any) => {
      const rawPositions = JSON.parse(e.target.result);
      setPositions(rawPositions.map(PositionMapper.toDomain));
    };
  };

  return (
    <div className="w-full h-full flex items-center">
      <button  className="p-3 bg-black-primary uppercase text-white text-sm rounded-md" onClick={() => { fileInput.current.click() }}>Upload your positions</button>
      <input type="file" ref={fileInput} onChange={handleChange} className="hidden" />
      <a href="https://github.com/fabiensabatie/backtester-front/blob/main/positions.md" target="_blank" rel="noreferrer">
        <HelpOutlineIcon className="ml-4 text-base cursor-pointer" />
      </a>
    </div>
  );
}