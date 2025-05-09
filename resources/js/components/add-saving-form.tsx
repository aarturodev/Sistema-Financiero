import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export function AddSavingForm() {
    const [startDate, setStartDate] = useState(new Date());
    const [targetDate, setTargetDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
    const [type, setType] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [initialAmount, setInitialAmount] = useState('');
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Aquí iría la lógica para guardar el ahorro
        console.log({
            startDate,
            targetDate,
            type,
            targetAmount: Number.parseFloat(targetAmount),
            initialAmount: initialAmount ? Number.parseFloat(initialAmount) : 0,
            name,
            notes,
        });

        // Limpiar el formulario
        setTargetAmount('');
        setInitialAmount('');
        setName('');
        setNotes('');
        setType('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="saving-name">Nombre de la meta de ahorro</Label>
                    <Input
                        id="saving-name"
                        placeholder="Ej: Fondo de emergencia, Vacaciones, etc."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="saving-type">Tipo de ahorro</Label>
                    <Select value={type} onValueChange={setType} required>
                        <SelectTrigger id="saving-type">
                            <SelectValue placeholder="Selecciona un tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Emergencia">Fondo de emergencia</SelectItem>
                            <SelectItem value="Ocio">Ocio/Vacaciones</SelectItem>
                            <SelectItem value="Vivienda">Vivienda</SelectItem>
                            <SelectItem value="Educación">Educación</SelectItem>
                            <SelectItem value="Retiro">Jubilación/Retiro</SelectItem>
                            <SelectItem value="Otro">Otro</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="start-date">Fecha de inicio</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant={'outline'} className="w-full justify-start text-left font-normal" id="start-date">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {startDate ? format(startDate, 'PPP', { locale: es }) : <span>Seleccionar fecha</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={startDate} onSelect={(day) => setStartDate(day ?? new Date())} initialFocus />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="target-date">Fecha objetivo</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant={'outline'} className="w-full justify-start text-left font-normal" id="target-date">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {targetDate ? format(targetDate, 'PPP', { locale: es }) : <span>Seleccionar fecha</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={targetDate} onSelect={(day) => setTargetDate(day ?? new Date())} initialFocus />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="target-amount">Monto objetivo</Label>
                    <div className="relative">
                        <span className="absolute top-2.5 left-3">$</span>
                        <Input
                            id="target-amount"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            className="pl-7"
                            value={targetAmount}
                            onChange={(e) => setTargetAmount(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="initial-amount">Monto inicial (opcional)</Label>
                    <div className="relative">
                        <span className="absolute top-2.5 left-3">$</span>
                        <Input
                            id="initial-amount"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            className="pl-7"
                            value={initialAmount}
                            onChange={(e) => setInitialAmount(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="notes">Notas adicionales</Label>
                    <Textarea
                        id="notes"
                        placeholder="Detalles adicionales sobre tu meta de ahorro"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
            </div>

            <Button type="submit" className="w-full">
                Guardar Meta de Ahorro
            </Button>
        </form>
    );
}
