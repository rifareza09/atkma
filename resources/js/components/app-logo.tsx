export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-10 items-center justify-center rounded-md bg-white p-0.5">
                {/* Logo Mahkamah Agung RI */}
                <img 
                    src="/logo-mahkamah-agung.png" 
                    alt="Logo Mahkamah Agung RI" 
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="ml-2 grid flex-1 text-left">
                <span className="truncate text-sm font-bold tracking-wide text-white">
                    Mahkamah Agung RI
                </span>
                <span className="truncate text-[10px] font-normal tracking-wider text-white/80">
                    Sistem Inventaris ATK
                </span>
            </div>
        </>
    );
}
