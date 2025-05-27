import { HomeData } from '@/types';
import { DollarSign, PiggyBank, TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
});

export default function HeroCards({ data }: { data: HomeData }) {
    return (
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Balance Total</CardTitle>
                    <DollarSign className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatter.format(data.balance)}</div>
                    <p className="text-muted-foreground text-xs">{data.balanceChange}% desde el mes pasado</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatter.format(data.totalIncomes)}</div>
                    <p className="text-muted-foreground text-xs">{data.incomesChange}% desde el mes pasado</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Gastos</CardTitle>
                    <TrendingDown className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatter.format(data.totalExpenses)}</div>
                    <p className="text-muted-foreground text-xs">{data.expensesChange}% desde el mes pasado</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ahorros</CardTitle>
                    <PiggyBank className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatter.format(data.totalSavings)}</div>
                    <p className="text-muted-foreground text-xs">{data.savingsChange}% desde el mes pasado</p>
                </CardContent>
            </Card>
        </div>
    );
}
