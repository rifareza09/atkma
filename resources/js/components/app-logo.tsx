export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-16 items-center justify-center rounded-md bg-slate-800 p-2">
                {/* Logo Mahkamah Agung RI */}
                <img 
                    src="/Logo_Mahkamah_Agung_RI-removebg-preview.png" 
                    alt="Logo Mahkamah Agung RI" 
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="ml-3 grid flex-1 text-left">
                <span className="truncate text-sm font-semibold text-slate-100">
                    Mahkamah Agung RI
                </span>
                <span className="truncate text-xs text-slate-500">
                    Sistem Inventaris ATK
                </span>
            </div>
        </>
    );
}
