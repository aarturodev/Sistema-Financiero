import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

export function AddExpense() {
    const { data, setData, post } = useForm({
        date: '',
        amount: '',
        description: '',
        category: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Aquí iría la lógica para guardar la transacción
        console.log('Transacción guardada:', data);
        post(route('expense.store'));
        toast.success('Egreso guardado correctamente', {
            description: 'La transacción ha sido guardado exitosamente.',
            duration: 3000,
        });
        // Resetear el formulario después de guardar
        setData({
            date: '',
            amount: '',
            description: '',
            category: '',
        });
    };

    // Categorías según el tipo de transacción
    const categories = ['fijo', 'variable', 'ocacional', 'inversión', 'discrecional', 'otro'];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="date">Fecha</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant={'outline'} className="w-full justify-start text-left font-normal" id="date">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {data.date ? format(new Date(data.date), 'PPP', { locale: es }) : <span>Seleccionar fecha</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={data.date && !isNaN(Date.parse(data.date)) ? new Date(data.date) : undefined}
                                onSelect={(date) => {
                                    setData('date', date?.toISOString() || '');
                                    // Cerrar el popover después de seleccionar la fecha
                                    setTimeout(() => {
                                        const popover = document.querySelector('.popover-content');
                                        if (popover) {
                                            popover.classList.remove('show');
                                            popover.classList.add('hide');
                                        }
                                    }, 100);
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="amount">Monto</Label>
                    <div className="relative">
                        <span className="absolute top-2.5 left-3">$</span>
                        <Input
                            id="amount"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            className="pl-7"
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                        id="description"
                        placeholder="Describe la transacción"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="category">Categoría</Label>
                    <Select
                        value={data.category}
                        onValueChange={(value) => {
                            setData('category', value);
                        }}
                        defaultValue={data.category}
                    >
                        <SelectTrigger id="category">
                            <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                            {(categories ?? []).map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                    {cat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Button type="submit" className="w-full">
                Guardar Egreso
            </Button>
        </form>
    );
}
