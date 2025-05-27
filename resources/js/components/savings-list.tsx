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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Saving } from '@/types';
import { router } from '@inertiajs/react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, Pencil, PiggyBank, Plus, PlusIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function SavingsList({ saving }: { saving: Saving[] }) {
    console.log('savings', saving);
    const [searchTerm] = useState('');
    const [filter, setFilter] = useState('todos');

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [depositDialogOpen, setDepositDialogOpen] = useState(false);
    const [currentSavingId, setCurrentSavingId] = useState<string | null>(null);
    const [editSaving, setEditSaving] = useState<Saving | null>(null);
    const [depositAmount, setDepositAmount] = useState('');
    const [currentSaving, setCurrentSaving] = useState<Saving | null>(null);

    const handleDeleteSaving = (id: string) => {
        setCurrentSavingId(id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (currentSavingId) {
            console.log(`Ahorro ${currentSavingId} eliminado`);
            router.delete(route('saving.destroy', currentSavingId), {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Ahorro eliminado', {
                        description: 'La meta de ahorro ha sido eliminada correctamente',
                        duration: 3000,
                    });
                },
                onError: () => {
                    toast.error('Error al eliminar el ahorro', {
                        description: 'Hubo un problema al eliminar la meta de ahorro. Inténtalo de nuevo.',
                        duration: 3000,
                    });
                },
            });
        }
        setDeleteDialogOpen(false);
        setCurrentSavingId(null);
    };

    const handleEditSaving = (saving: Saving) => {
        setEditSaving({
            ...saving,
            target_date: new Date(saving.target_date).toISOString(),
            start_date: new Date(saving.start_date || Date.now()).toISOString(),
        });
        setEditDialogOpen(true);
    };

    const saveEditedSaving = (e: React.FormEvent) => {
        e.preventDefault();
        if (editSaving) {
            // Aquí iría la lógica para actualizar el ahorro
            // En una aplicación real, aquí se haría una llamada a la API
            console.log('Ahorro actualizado:', editSaving);
            router.put(
                route('saving.update', editSaving.id),
                {
                    ...editSaving,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        toast('Ahorro actualizado', {
                            description: 'Los cambios han sido guardados correctamente',
                            duration: 3000,
                        });
                    },
                    onError: () => {
                        toast.error('Error al actualizar el Ahoro', {
                            description: 'Hubo un problema al guardar los cambios. Inténtalo de nuevo.',
                            duration: 3000,
                        });
                    },
                },
            );

            setEditDialogOpen(false);
            setEditSaving(null);
        }
    };

    const handleAddDeposit = (saving: Saving) => {
        setCurrentSaving(saving);
        setDepositAmount('');
        setDepositDialogOpen(true);
    };

    const saveDeposit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentSaving && depositAmount) {
            const amount = Number.parseFloat(depositAmount);
            if (isNaN(amount) || amount <= 0) {
                toast.error('El monto del depósito debe ser un número positivo');
                return;
            }

            // Aquí iría la lógica para añadir el depósito
            router.post(
                route('saving.deposit', { id: currentSaving.id }),
                {
                    amount: amount,
                },
                {
                    onSuccess: () => {
                        toast.success('Depósito añadido', {
                            description: `Se ha añadido un depósito de $${amount} a la meta de ahorro "${currentSaving.name}".`,
                            duration: 3000,
                        });
                    },
                    onError: () => {
                        toast.error('Error al añadir el depósito', {
                            description: 'Hubo un problema al añadir el depósito. Por favor, inténtalo de nuevo.',
                            duration: 3000,
                        });
                    },
                },
            );

            setDepositDialogOpen(false);
            setCurrentSaving(null);
            setDepositAmount('');
        }
    };

    const filteredSavings = saving.filter((saving) => {
        const matchesSearch =
            saving.name.toLowerCase().includes(searchTerm.toLowerCase()) || saving.type.toLowerCase().includes(searchTerm.toLowerCase());

        if (filter === 'todos') return matchesSearch;
        return matchesSearch && saving.type.toLowerCase() === filter.toLowerCase();
    });

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value);
    };

    const getTotalSavings = () => {
        return filteredSavings.reduce((total, saving) => total + saving.current_amount, 0);
    };

    const getTotalTarget = () => {
        return filteredSavings.reduce((total, saving) => total + saving.target_amount, 0);
    };

    const getOverallProgress = () => {
        const totalTarget = getTotalTarget();
        const totalSavings = getTotalSavings();
        return totalTarget > 0 ? (totalSavings / totalTarget) * 100 : 0;
    };

    return (
        <Card className={`border-0 p-4`}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* Botón de agregar */}
                    <div className="w-full sm:w-auto">
                        <a href="/Saving/create">
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
                                    <SelectItem value="emergencia">Emergencia</SelectItem>
                                    <SelectItem value="ocio">Ocio</SelectItem>
                                    <SelectItem value="vivienda">Vivienda</SelectItem>
                                    <SelectItem value="educación">Educación</SelectItem>
                                    <SelectItem value="retiro">Retiro</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {filteredSavings.length > 0 && (
                    <div className="mb-2 grid grid-cols-2 gap-4 sm:grid-cols-3">
                        <div className="rounded-md bg-slate-100 p-2 text-center dark:border-1 dark:bg-gray-900/800">
                            <p className="text-muted-foreground text-xs">Ahorrado</p>
                            <p className="font-bold">{formatCurrency(getTotalSavings())}</p>
                        </div>
                        <div className="rounded-md bg-slate-100 p-2 text-center dark:border-1 dark:bg-gray-900/800">
                            <p className="text-muted-foreground text-xs">Objetivo</p>
                            <p className="font-bold">{formatCurrency(getTotalTarget())}</p>
                        </div>
                        <div className="rounded-md bg-slate-100 p-2 text-center dark:border-1 dark:bg-gray-900/800">
                            <p className="text-muted-foreground text-xs">Progreso</p>
                            <p className="font-bold">{getOverallProgress().toFixed(1)}%</p>
                        </div>
                    </div>
                )}

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">Nombre</TableHead>
                                <TableHead className="text-center"> Tipo</TableHead>
                                <TableHead className="text-center">Progreso</TableHead>
                                <TableHead className="text-center">Actual</TableHead>
                                <TableHead className="text-center">Objetivo</TableHead>
                                <TableHead className="text-center">Fecha límite</TableHead>
                                <TableHead className="text-center">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredSavings.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center">
                                        No se encontraron ahorros
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredSavings.map((saving) => (
                                    <TableRow key={saving.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center justify-center gap-2">
                                                <PiggyBank className="h-4 w-4 text-green-600" />
                                                {saving.name}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge
                                                variant="outline"
                                                className={
                                                    saving.type === 'emergencia'
                                                        ? 'bg-red-50 text-red-700 hover:bg-red-50'
                                                        : saving.type === 'ocio'
                                                          ? 'bg-purple-50 text-purple-700 hover:bg-purple-50'
                                                          : saving.type === 'vivienda'
                                                            ? 'bg-amber-50 text-amber-700 hover:bg-amber-50'
                                                            : saving.type === 'educación'
                                                              ? 'bg-blue-50 text-blue-700 hover:bg-blue-50'
                                                              : 'bg-green-50 text-green-700 hover:bg-green-50'
                                                }
                                            >
                                                {saving.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex flex-col gap-1">
                                                <Progress value={saving.progress} className="h-2" />
                                                <span className="text-muted-foreground text-xs">{saving.progress.toFixed(1)}%</span>
                                            </div>{' '}
                                        </TableCell>
                                        <TableCell className="text-center">{formatCurrency(saving.current_amount)}</TableCell>
                                        <TableCell className="text-center">{formatCurrency(saving.target_amount)}</TableCell>
                                        <TableCell className="text-center">
                                            {saving.target_date ? format(new Date(saving.target_date), 'PPP', { locale: es }) : 'Sin fecha'}
                                        </TableCell>

                                        <TableCell className="text-center">
                                            <div className="flex justify-center gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleAddDeposit(saving)}>
                                                    <Plus className="h-4 w-4" />
                                                    <span className="sr-only">Añadir depósito</span>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditSaving(saving)}>
                                                    <Pencil className="h-4 w-4" />
                                                    <span className="sr-only">Editar</span>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                                                    onClick={() => handleDeleteSaving(saving.id)}
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
                            Esta acción no se puede deshacer. Esto eliminará permanentemente la meta de ahorro y todo su historial de depósitos.
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

            {/* Diálogo para editar ahorro */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Meta de Ahorro</DialogTitle>
                        <DialogDescription>Modifica los detalles de tu meta de ahorro. Haz clic en guardar cuando termines.</DialogDescription>
                    </DialogHeader>
                    {editSaving && (
                        <form onSubmit={saveEditedSaving} className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-name">Nombre</Label>
                                <Input
                                    id="edit-name"
                                    value={editSaving.name}
                                    onChange={(e) => setEditSaving({ ...editSaving, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-type">Tipo</Label>
                                <Select value={editSaving.type} onValueChange={(value) => setEditSaving({ ...editSaving, type: value })}>
                                    <SelectTrigger id="edit-type">
                                        <SelectValue placeholder="Selecciona un tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="emergencia">Fondo de emergencia</SelectItem>
                                        <SelectItem value="ocio">Ocio/Vacaciones</SelectItem>
                                        <SelectItem value="vivienda">Vivienda</SelectItem>
                                        <SelectItem value="educación">Educación</SelectItem>
                                        <SelectItem value="retiro">Jubilación/Retiro</SelectItem>
                                        <SelectItem value="otro">Otro</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-target-date">Fecha objetivo</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant={'outline'} className="w-full justify-start text-left font-normal" id="edit-target-date">
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {editSaving.target_date ? (
                                                format(editSaving.target_date, 'PPP', { locale: es })
                                            ) : (
                                                <span>Seleccionar fecha</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={editSaving.target_date ? new Date(editSaving.target_date) : undefined}
                                            onSelect={(date) => setEditSaving({ ...editSaving, target_date: date?.toISOString() || '' })}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-target-amount">Monto objetivo</Label>
                                <div className="relative">
                                    <span className="absolute top-2.5 left-3">$</span>
                                    <Input
                                        id="edit-target-amount"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        className="pl-7"
                                        value={editSaving.target_amount}
                                        onChange={(e) => setEditSaving({ ...editSaving, target_amount: Number.parseFloat(e.target.value) })}
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

            {/* Diálogo para añadir depósito */}
            <Dialog open={depositDialogOpen} onOpenChange={setDepositDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Añadir Depósito</DialogTitle>
                        <DialogDescription>{currentSaving && `Añade un depósito a tu meta de ahorro "${currentSaving.name}".`}</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={saveDeposit} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="deposit-amount">Monto a depositar</Label>
                            <div className="relative">
                                <span className="absolute top-2.5 left-3">$</span>
                                <Input
                                    id="deposit-amount"
                                    type="number"
                                    step="0.01"
                                    min="0.01"
                                    className="pl-7"
                                    value={depositAmount}
                                    onChange={(e) => setDepositAmount(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Añadir Depósito</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </Card>
    );
}
