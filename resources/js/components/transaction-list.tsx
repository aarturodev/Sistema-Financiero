import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowDownIcon, ArrowUpIcon, Edit, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

// Datos de ejemplo para las transacciones
const transactions = [
    {
        id: '1',
        date: '2023-04-15',
        description: 'Salario',
        category: 'Ingresos',
        amount: 3500,
        type: 'ingreso',
    },
    {
        id: '2',
        date: '2023-04-16',
        description: 'Supermercado',
        category: 'Alimentación',
        amount: 120.5,
        type: 'gasto',
    },
    {
        id: '3',
        date: '2023-04-18',
        description: 'Gasolina',
        category: 'Transporte',
        amount: 45.0,
        type: 'gasto',
    },
    {
        id: '4',
        date: '2023-04-20',
        description: 'Netflix',
        category: 'Entretenimiento',
        amount: 15.99,
        type: 'gasto',
    },
    {
        id: '5',
        date: '2023-04-22',
        description: 'Trabajo freelance',
        category: 'Ingresos',
        amount: 700,
        type: 'ingreso',
    },
    {
        id: '6',
        date: '2023-04-25',
        description: 'Alquiler',
        category: 'Vivienda',
        amount: 950,
        type: 'gasto',
    },
    {
        id: '7',
        date: '2023-04-28',
        description: 'Cena restaurante',
        category: 'Alimentación',
        amount: 65.75,
        type: 'gasto',
    },
];

export function TransactionList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('todos');

    const filteredTransactions = transactions.filter((transaction) => {
        const matchesSearch =
            transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.category.toLowerCase().includes(searchTerm.toLowerCase());

        if (filter === 'todos') return matchesSearch;
        if (filter === 'ingresos') return matchesSearch && transaction.type === 'ingreso';
        if (filter === 'gastos') return matchesSearch && transaction.type === 'gasto';

        return matchesSearch;
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
    };

    return (
        <div className="my-4 gap-6 rounded-xl">
            <div className="my-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
                <div className="flex flex-1 items-center gap-2 sm:flex-initial">
                    <Input
                        type="search"
                        placeholder="Buscar transacciones..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filtrar por" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="ingresos">Ingresos</SelectItem>
                        <SelectItem value="gastos">Gastos</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="rounded-md border">
                <Table className="w-full">
                    <TableHeader className="bg-gray-100">
                        <TableRow className="text-gray-500">
                            <TableHead className="text-center">Fecha</TableHead>
                            <TableHead className="text-center">Descripción</TableHead>
                            <TableHead className="text-center">Categoría</TableHead>
                            <TableHead className="text-center">Monto</TableHead>
                            <TableHead className="text-center">Editar</TableHead>
                            <TableHead className="text-center">Eliminar</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredTransactions.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    No se encontraron transacciones
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredTransactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell className="text-center">{formatDate(transaction.date)}</TableCell>
                                    <TableCell className="text-center">{transaction.description}</TableCell>
                                    <TableCell className="text-center">{transaction.category}</TableCell>
                                    <TableCell className="text-center">
                                        <span
                                            className={`flex items-center justify-center font-medium ${
                                                transaction.type === 'ingreso' ? 'text-green-600' : 'text-red-600'
                                            }`}
                                        >
                                            {transaction.type === 'ingreso' ? (
                                                <ArrowUpIcon className="mr-1 h-4 w-4" />
                                            ) : (
                                                <ArrowDownIcon className="mr-1 h-4 w-4" />
                                            )}
                                            ${transaction.amount.toFixed(2)}
                                        </span>
                                    </TableCell>

                                    <TableCell className="text-center">
                                        <span className="flex items-center justify-center">
                                            <Edit className="flex h-4 w-4 cursor-pointer justify-end text-gray-500 hover:underline" />
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <span className="flex items-center justify-center">
                                            <Trash2Icon className="flex h-4 w-4 cursor-pointer justify-center text-red-400 hover:underline" />
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
