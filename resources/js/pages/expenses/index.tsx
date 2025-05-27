import { ExpenseList } from '@/components/expense-list';
import AppLayout from '@/layouts/app-layout';
import { Expense, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Egresos',
        href: '/Expense',
    },
];

interface ExpenseProps {
    [key: string]: string | number | boolean | Expense[] | undefined;
    expenses: Expense[];
}

export default function Expenses() {
    const page = usePage<ExpenseProps>();

    console.log('Expenses:', page.props.expenses);
    const { expenses } = page.props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Expense" />
            <ExpenseList expenses={expenses} />
        </AppLayout>
    );
}
