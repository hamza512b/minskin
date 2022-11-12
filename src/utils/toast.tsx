import toast from "react-hot-toast";


export default function customToast(message: string) {
  toast.custom((t) => (
    <p className={`${t.visible ? 'animate-enter' : 'animate-leave'} bg-slate-800 rounded-md shadow-lg p-4 font-semibold text-slate-50 text-sm`}>
      {message}
    </p>
  ))
}