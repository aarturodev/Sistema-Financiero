import { AddIncome } from '@/components/add-income';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ingresos',
        href: '/Income',
    },
    {
        title: 'Crear',
        href: '/Income/create',
    },
];

export default function Transaction() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="create" />

            <Card className="border-0">
                <CardHeader>
                    <CardTitle>Agregar Nuevo Ingreso</CardTitle>
                    <CardDescription>Registra un nuevo ingreso en tu sistema</CardDescription>
                </CardHeader>
                <CardContent>
                    <AddIncome />
                </CardContent>
            </Card>
        </AppLayout>
    );
}
