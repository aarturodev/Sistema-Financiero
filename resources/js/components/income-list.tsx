import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
//import { useToast } from '@/components/ui/use-toast';
import { Income } from '@/types';
import { router } from '@inertiajs/react';
import { ArrowUpIcon, Pencil, PlusIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
});

export function IncomeList({ incomes }: { incomes: Income[] }) {
    const [searchTerm] = useState('');
    const [filter, setFilter] = useState('todos');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [currentTransactionId, setCurrentTransactionId] = useState<number | null>(null);
    const [editTransaction, setEditTransaction] = useState<Income | null>(null);

    //const { toast } = useToast();

    const filteredTransactions = incomes.filter((transaction) => {
        const matchesSearch =
            transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.category.toLowerCase().includes(searchTerm.toLowerCase());

        if (filter === 'todos') return matchesSearch;
        if (filter === 'fijo') return matchesSearch && transaction.type === 'fijo';
        if (filter === 'variable') return matchesSearch && transaction.type === 'variable';
        if (filter === 'ocacional') return matchesSearch && transaction.type === 'ocacional';
        if (filter === 'pasivo') return matchesSearch && transaction.type === 'pasivo';
        if (filter === 'inversión') return matchesSearch && transaction.type === 'inversión';
        if (filter === 'otro') return matchesSearch && transaction.type === 'otro';

        return matchesSearch;
    });

    const formatDate = (dateString: string) => {
        const [year, month, day] = dateString.split('-');
        const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

        return `${parseInt(day)} de ${meses[parseInt(month) - 1]} de ${year}`;
    };

    const confirmDelete = () => {
        if (currentTransactionId) {
            router.delete(route('income.destroy', currentTransactionId));
        }
        setDeleteDialogOpen(false);
        setCurrentTransactionId(null);
    };

    const handleEditTransaction = (transaction: Income) => {
        setEditTransaction(transaction);
        setEditDialogOpen(true);
    };

    const handleDeleteTransaction = (transactionId: number) => {
        setCurrentTransactionId(transactionId);
        setDeleteDialogOpen(true);
    };

    const saveEditedTransaction = (e: React.FormEvent) => {
        e.preventDefault();
        if (editTransaction) {
            router.put(
                route('income.update', editTransaction.id),
                {
                    ...editTransaction,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        toast.success('Ingreso actualizado', {
                            description: 'Los cambios han sido guardados correctamente',
                            duration: 3000,
                        });
                    },
                    onError: () => {
                        toast.error('Error al actualizar el ingreso', {
                            description: 'Hubo un problema al guardar los cambios. Inténtalo de nuevo.',
                            duration: 3000,
                        });
                    },
                },
            );

            // Resetear el formulario después de guardar
            setEditDialogOpen(false);
            setEditTransaction(null);
        }
    };

    return (
        <Card className="border-0 p-4">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* Botón de agregar */}
                    <div className="w-full sm:w-auto">
                        <a href="/Income/create">
                            <Button variant="default" className="w-full cursor-pointer sm:w-auto" size="lg">
                                <PlusIcon className="mr-2 h-4 w-4" />
                                <span>Agregar</span>
                            </Button>
                        </a>
                    </div>

                    {/* Búsqueda y filtro */}
                    <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                        <div className="w-full sm:w-[200px]">
                            <Select value={filter} onValueChange={setFilter}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Filtrar por" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todos">Todos</SelectItem>
                                    <SelectItem value="fijo">Fijo</SelectItem>
                                    <SelectItem value="variable">Variable</SelectItem>
                                    <SelectItem value="ocacional">Ocacional</SelectItem>
                                    <SelectItem value="pasivo">Pasivo</SelectItem>
                                    <SelectItem value="inversión">Inversión</SelectItem>
                                    <SelectItem value="otro">Otro</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">Fecha</TableHead>
                                <TableHead className="text-center">Descripción</TableHead>
                                <TableHead className="text-center">Categoría</TableHead>
                                <TableHead className="text-center">Monto</TableHead>
                                <TableHead className="text-center">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredTransactions.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        No se encontraron transacciones
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredTransactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell className="text-center">{formatDate(transaction.date)}</TableCell>
                                        <TableCell className="text-center">{transaction.description}</TableCell>
                                        <TableCell className="text-center">{transaction.type}</TableCell>
                                        <TableCell className="text-center">
                                            <span
                                                className={`flex items-center justify-center font-medium ${transaction.type === 'ingreso' ? 'text-green-600' : 'text-green-600'}`}
                                            >
                                                <ArrowUpIcon className="mr-1 h-4 w-4" />
                                                {formatter.format(transaction.amount)}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex justify-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => handleEditTransaction(transaction)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                    <span className="sr-only">Editar</span>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                                                    onClick={() => handleDeleteTransaction(transaction.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">Eliminar</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Diálogo de confirmación para eliminar */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. Esto eliminará permanentemente la transacción de tu sistema.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Diálogo para editar transacción */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Transacción</DialogTitle>
                        <DialogDescription>Modifica los detalles de la transacción. Haz clic en guardar cuando termines.</DialogDescription>
                    </DialogHeader>
                    {editTransaction && (
                        <form onSubmit={saveEditedTransaction} className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-date">Fecha</Label>

                                <Input
                                    id="edit-date"
                                    type="date"
                                    value={new Date(editTransaction.date).toISOString().split('T')[0]}
                                    onChange={(e) => setEditTransaction({ ...editTransaction, date: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-description">Descripción</Label>
                                <Input
                                    id="edit-description"
                                    value={editTransaction.description}
                                    onChange={(e) => setEditTransaction({ ...editTransaction, description: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-category">Categoría</Label>
                                <Select
                                    value={editTransaction.type}
                                    onValueChange={(value) => setEditTransaction({ ...editTransaction, type: value })}
                                >
                                    <SelectTrigger id="edit-category">
                                        <SelectValue placeholder="Selecciona una categoría" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="fijo">Fijo</SelectItem>
                                        <SelectItem value="variable">Variable</SelectItem>
                                        <SelectItem value="ocacional">Ocacional</SelectItem>
                                        <SelectItem value="pasivo">Pasivo</SelectItem>
                                        <SelectItem value="inversión">Inversión</SelectItem>
                                        <SelectItem value="otro">Otro</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="edit-amount">Monto</Label>
                                <div className="relative">
                                    <span className="absolute top-2.5 left-3">$</span>
                                    <Input
                                        id="edit-amount"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        className="pl-7"
                                        value={editTransaction.amount}
                                        onChange={(e) => setEditTransaction({ ...editTransaction, amount: Number.parseFloat(e.target.value) })}
                                        required
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Guardar cambios</Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </Card>
    );
}
