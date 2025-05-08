import Greeting from '@/components/greeting';
import HeroCards from '@/components/hero-cards';
import { TransactionList } from '@/components/transaction-list';
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
                    <TabsList>
                        <TabsTrigger value="transacciones">Transacciones</TabsTrigger>
                        <TabsTrigger value="presupuesto">Presupuesto</TabsTrigger>
                        <TabsTrigger value="ahorros">Ahorros</TabsTrigger>
                        <TabsTrigger value="agregar" className="border-gray-500">
                            Agregar
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="transacciones">
                        <TransactionList />
                    </TabsContent>
                    <TabsContent value="presupuesto">tabla de presupuesto</TabsContent>
                    <TabsContent value="ahorros">tabla de ahorros</TabsContent>
                    <TabsContent value="activos">tabla de activos</TabsContent>
                    <TabsContent value="inversiones">tabla de inversiones</TabsContent>
                    <TabsContent value="agregar">
                        <Tabs defaultValue="ingreso" className="w-[400px]">
                            <TabsList>
                                <TabsTrigger value="ingreso">Ingreso</TabsTrigger>
                                <TabsTrigger value="egreso">Egreso</TabsTrigger>
                                <TabsTrigger value="ahorro">Ahorro</TabsTrigger>
                                <TabsTrigger value="activo">activo</TabsTrigger>
                                <TabsTrigger value="inversion">Inversion</TabsTrigger>
                            </TabsList>
                            <TabsContent value="ingreso">formulario de ingreso</TabsContent>
                            <TabsContent value="egreso">formulario de egreso</TabsContent>
                            <TabsContent value="ahorro">formulario de ahorro</TabsContent>
                            <TabsContent value="activo">formulario de activo</TabsContent>
                            <TabsContent value="inversion">formulario de inversion</TabsContent>
                        </Tabs>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
