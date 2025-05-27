import { AddSavingForm } from '@/components/add-saving-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ahorros',
        href: '/Saving',
    },
    {
        title: 'Crear',
        href: '/Saving/create',
    },
];

export default function Transaction() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="create" />

            <Card className="border-0">
                <CardHeader>
                    <CardTitle>Agregar Nuevo Ahorro</CardTitle>
                    <CardDescription>Registra un nuevo ahorro en tu sistema</CardDescription>
                </CardHeader>
                <CardContent>
                    <AddSavingForm />
                </CardContent>
            </Card>
        </AppLayout>
    );
}
