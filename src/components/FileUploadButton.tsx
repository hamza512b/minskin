import React from 'react';
import { useAtom } from 'jotai';
import { fileUrlAtom } from '../utils/atoms';
import customToast from '../utils/toast';

export default function FileUploadButton() {
  const [,setFileUrl] = useAtom(fileUrlAtom)
  function onChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const file = ev.target.files?.[0];
    ev.currentTarget.value = "";
    if (!file) return;
    if (!["image/png", "image/jpeg"].includes(file.type)) return customToast("The file is not supported.");
    if (file.size > 1_048_576) return customToast("Image is too big.");
    
    const url = URL.createObjectURL(file);

    setFileUrl(url)
  }
  return (
    <label className="inline-flex items-center justify-center rounded-md px-4 text-sm leading-4 font-semibold h-9 bg-slate-800 text-white shadow-md select-none focus-within:ring focus-within:ring-slate-400 hover:bg-slate-700 cursor-pointer">
      <input type="file" className='sr-only' onChange={onChange} accept="image/png,image/jpeg" />
      Upload texture
    </label>
  );
}
