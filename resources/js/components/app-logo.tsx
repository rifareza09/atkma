import { Building2 } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-10 items-center justify-center rounded-md bg-white/10">
                <Building2 className="size-6 text-white" />
            </div>
            <div className="ml-2 grid flex-1 text-left">
                <span className="truncate text-sm font-bold tracking-wide text-white">
                    Mahkamah Agung
                </span>
                <span className="truncate text-[10px] font-normal tracking-wider text-white/80">
                    REPUBLIK OF INDONESIA
                </span>
            </div>
        </>
    );
}
