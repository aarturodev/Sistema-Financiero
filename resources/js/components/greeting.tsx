import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Greeting() {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const { user } = auth;
    const userName = user.name.split(' ')[0];
    console.log(auth);

    const hour = new Date().getHours();
    const greeting = hour < 12 ? `Buenos días ${userName}!` : hour < 18 ? `Buenas tardes ${userName}!` : `Buenas noches ${userName}!`;

    return (
        <div className="m-4 flex justify-start gap-4">
            <h1 className="text-2xl font-bold">{greeting}</h1>
        </div>
    );
}
