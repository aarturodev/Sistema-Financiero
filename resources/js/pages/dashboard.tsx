import { AddSavingForm } from '@/components/add-saving-form';
import { AddTransactionForm } from '@/components/add-transaction-form';
import Greeting from '@/components/greeting';
import HeroCards from '@/components/hero-cards';
import { TransactionList } from '@/components/transaction-list';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <Greeting />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                <HeroCards />
                <Tabs defaultValue="transacciones" className="center w-full">
                    <TabsList className="gap-2">
                        <TabsTrigger value="transacciones">Transacciones</TabsTrigger>
                        <TabsTrigger value="metas">Metas de Ahorro</TabsTrigger>
                        <TabsTrigger value="agregar" className="border-gray-500">
                            Agregar
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="transacciones">
                        <TransactionList />
                    </TabsContent>
                    <TabsContent value="presupuesto">tabla de presupuesto</TabsContent>
                    <TabsContent value="metas">tabla de ahorros</TabsContent>
                    <TabsContent value="activos">tabla de activos</TabsContent>
                    <TabsContent value="inversiones">tabla de inversiones</TabsContent>
                    <TabsContent value="agregar">
                        <Tabs defaultValue="transaccion" className="w-full">
                            <TabsList className="gap-2">
                                <TabsTrigger value="transaccion">Transaccion</TabsTrigger>
                                <TabsTrigger value="meta">Meta</TabsTrigger>
                                <TabsTrigger value="activo">activo</TabsTrigger>
                                <TabsTrigger value="inversion">Inversion</TabsTrigger>
                            </TabsList>
                            <TabsContent value="transaccion">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Agregar Nueva Transacción</CardTitle>
                                        <CardDescription>Registra un nuevo ingreso o gasto en tu sistema</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <AddTransactionForm />
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="meta">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Agregar Meta de Ahorro</CardTitle>
                                        <CardDescription>Establece una nueva meta de ahorro</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <AddSavingForm />
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="activo">formulario de activo</TabsContent>
                            <TabsContent value="inversion">formulario de inversion</TabsContent>
                        </Tabs>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
