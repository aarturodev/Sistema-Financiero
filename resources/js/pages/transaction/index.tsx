import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transacciones',
        href: '/dashboard/transactions',
    },
];

export default function Transaction() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transactions" />
        </AppLayout>
    );
}
