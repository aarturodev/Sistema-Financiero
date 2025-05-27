import { AddExpense } from '@/components/add-expense';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Egresos',
        href: '/Expense',
    },
    {
        title: 'Crear',
        href: '/Expense/create',
    },
];

export default function Transaction() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="create" />

            <Card className="border-0">
                <CardHeader>
                    <CardTitle>Agregar Nuevo Egreso</CardTitle>
                    <CardDescription>Registra un nuevo egreso en tu sistema</CardDescription>
                </CardHeader>
                <CardContent>
                    <AddExpense />
                </CardContent>
            </Card>
        </AppLayout>
    );
}
