import Greeting from '@/components/greeting';
import HeroCards from '@/components/hero-cards';
import AppLayout from '@/layouts/app-layout';
import { HomeData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/dashboard',
    },
];

interface HomeProps {
    [key: string]: string | number | boolean | HomeData[] | undefined;
    data: HomeData[];
    balance: number;
    totalIncomes: number;
    totalExpenses: number;
    totalSavings: number;
    incomesChange: number;
    expensesChange: number;
    savingsChange: number;
    balanceChange: number;
}

export default function Dashboard() {
    const page = usePage<HomeProps>();
    const { totalIncomes, totalExpenses, totalSavings, balance, incomesChange, expensesChange, savingsChange, balanceChange } = page.props;

    const data: HomeData = {
        totalIncomes,
        totalExpenses,
        totalSavings,
        balance,
        incomesChange,
        expensesChange,
        savingsChange,
        balanceChange,
    };
    console.log('data', data);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <Greeting />
            <div className="m-2 flex h-full flex-1 flex-col gap-6 rounded-xl">
                <HeroCards data={data} />
            </div>
        </AppLayout>
    );
}
