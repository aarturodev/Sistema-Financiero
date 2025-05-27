import { DollarSign } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="bg-sidebar-accent-foreground text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <DollarSign className="size-4" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-lg">
                <span className="mb-0.2 truncate leading-none font-semibold">MiCapital</span>
            </div>
        </>
    );
}
