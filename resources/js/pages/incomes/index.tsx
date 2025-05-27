import { IncomeList } from '@/components/income-list';
import AppLayout from '@/layouts/app-layout';
import { Income, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ingresos',
        href: '/dashboard/income',
    },
];

interface IncomeProps {
    [key: string]: string | number | boolean | Income[] | undefined;
    incomes: Income[];
}

export default function Transaction() {
    const page = usePage<IncomeProps>();

    console.log('Incomes:', page.props.incomes);
    const { incomes } = page.props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Income" />

            <IncomeList incomes={incomes} />
        </AppLayout>
    );
}
