import { AddTransactionForm } from '@/components/add-transaction-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transacciones',
        href: '/dashboard/transactions/create',
    },
];

export default function Transaction() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="create" />

            <Card className="border-0 p-6">
                <CardHeader>
                    <CardTitle>Agregar Nueva Transacción</CardTitle>
                    <CardDescription>Registra un nuevo ingreso o gasto en tu sistema</CardDescription>
                </CardHeader>
                <CardContent>
                    <AddTransactionForm />
                </CardContent>
            </Card>
        </AppLayout>
    );
}
