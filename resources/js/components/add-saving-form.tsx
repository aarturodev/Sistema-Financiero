import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

export function AddSavingForm() {
    const { data, setData, post } = useForm({
        start_date: '',
        target_date: '',
        type: '',
        target_amount: '',
        current_amount: '',
        name: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Aquí iría la lógica para guardar el ahorro
        post(route('saving.store'));

        toast.success('Meta de ahorro guardada correctamente');

        // Limpiar el formulario
        setData({
            start_date: '',
            target_date: '',
            type: '',
            target_amount: '',
            current_amount: '',
            name: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="saving-name">Nombre de la meta de ahorro</Label>
                    <Input
                        id="saving-name"
                        placeholder="Ej: Fondo de emergencia, Vacaciones, etc."
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="saving-type">Tipo de ahorro</Label>
                    <Select value={data.type} required onValueChange={(value) => setData('type', value)}>
                        <SelectTrigger id="saving-type">
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
                    <Label htmlFor="start-date">Fecha de inicio</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant={'outline'} className="w-full justify-start text-left font-normal" id="start-date">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {data.start_date ? format(new Date(data.start_date), 'PPP', { locale: es }) : <span>Seleccionar fecha</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={data.start_date && !isNaN(Date.parse(data.start_date)) ? new Date(data.start_date) : undefined}
                                onSelect={(date) => setData('start_date', date?.toISOString() || '')} // Convertir Date a string
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="target-date">Fecha objetivo</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant={'outline'} className="w-full justify-start text-left font-normal" id="target-date">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {data.target_date ? format(new Date(data.target_date), 'PPP', { locale: es }) : <span>Seleccionar fecha</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={data.target_date && !isNaN(Date.parse(data.target_date)) ? new Date(data.target_date) : undefined}
                                onSelect={(date) => setData('target_date', date?.toISOString() || '')} // Convertir Date a string
                                initialFocus
                            />
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
                            value={data.target_amount}
                            onChange={(e) => setData('target_amount', e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="current-amount">Monto inicial (opcional)</Label>
                    <div className="relative">
                        <span className="absolute top-2.5 left-3">$</span>
                        <Input
                            id="current-amount"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            className="pl-7"
                            value={data.current_amount}
                            onChange={(e) => setData('current_amount', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <Button type="submit" className="w-full">
                Guardar Meta de Ahorro
            </Button>
        </form>
    );
}
