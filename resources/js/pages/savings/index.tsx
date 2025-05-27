import { SavingsList } from '@/components/savings-list';
import AppLayout from '@/layouts/app-layout';
import { Saving, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ahorros',
        href: '/Saving',
    },
];

interface SavingProps {
    [key: string]: string | number | boolean | Saving[] | undefined;
    savings: Saving[];
}

export default function Expenses() {
    const page = usePage<SavingProps>();
    const { savings } = page.props;
    console.log('savings', savings);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Expense" />
            <SavingsList saving={savings} />
        </AppLayout>
    );
}
