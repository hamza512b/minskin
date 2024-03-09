import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CookePopup() {
  const [popupOpen, setPopupOpen] = useState(false);
  function closePopup() {
    if (typeof window !== 'undefined') {
      setPopupOpen(false);
      localStorage.setItem("consent-popup", "false")
    }
  }
  useEffect(() => {
    setPopupOpen(window.localStorage.getItem("consent-popup") ? false : true)
  }, [])
  return (
    <Transition
      show={popupOpen}
      className="z-50 fixed bottom-2 left-2"
      enter="transition-transform duration-500"
      enterFrom="translate-y-80"
      enterTo="translate-y-0"
      leave="transition-transform duration-500"
      leaveFrom="translate-y-0"
      leaveTo="translate-y-80"
    >
      <div className="max-w-xs w-full bg-white p-4 rounded-md shadow-lg">
        <h1 className="text-xl mb-2">Cookies</h1>
        <p className="mb-4">We use cookies to analyze traffic. Read our <Link href="https://linjar.se/policies/privacy-policy" className="border-b-2 border-slate-700">cookie policy</Link>.</p>
        <button className="inline-flex items-center justify-center rounded-md px-4 text-sm leading-4 font-semibold h-9 bg-slate-800 text-white shadow-md select-none focus:ring focus:ring-slate-400 hover:bg-slate-700 cursor-pointer" onClick={closePopup}>Got it</button>
      </div>
    </Transition>
  )
}