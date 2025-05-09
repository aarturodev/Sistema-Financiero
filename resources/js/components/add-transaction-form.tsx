import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export function AddTransactionForm() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [type, setType] = useState('gasto');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Aquí iría la lógica para guardar la transacción
        console.log({
            date,
            type,
            amount: Number.parseFloat(amount),
            description,
            category,
        });

        // Limpiar el formulario
        setAmount('');
        setDescription('');
        setCategory('');
    };

    // Categorías según el tipo de transacción
    const categories =
        type === 'ingreso'
            ? ['Salario', 'Inversiones', 'Regalos', 'Otros ingresos']
            : ['Vivienda', 'Alimentación', 'Transporte', 'Entretenimiento', 'Salud', 'Educación', 'Ropa', 'Otros gastos'];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="transaction-type">Tipo de transacción</Label>
                    <RadioGroup id="transaction-type" value={type} onValueChange={setType} className="flex">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="ingreso" id="ingreso" />
                            <Label htmlFor="ingreso" className="font-medium text-green-600">
                                Ingreso
                            </Label>
                        </div>
                        <div className="ml-4 flex items-center space-x-2">
                            <RadioGroupItem value="gasto" id="gasto" />
                            <Label htmlFor="gasto" className="font-medium text-red-600">
                                Gasto
                            </Label>
                        </div>
                    </RadioGroup>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="date">Fecha</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant={'outline'} className="w-full justify-start text-left font-normal" id="date">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, 'PPP', { locale: es }) : <span>Seleccionar fecha</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
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
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                        id="description"
                        placeholder="Describe la transacción"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="category">Categoría</Label>
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger id="category">
                            <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                    {cat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Button type="submit" className="w-full">
                Guardar Transacción
            </Button>
        </form>
    );
}
