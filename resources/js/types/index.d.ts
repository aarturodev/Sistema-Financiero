import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

interface Transaction {
    id: string;
    name?: string;
    amount: number;
    type: string;
    date: string;
    description: string;
    category: string;
}

interface Income {
    id: number;
    date: string;
    description: string;
    category: string;
    amount: number;
    type: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

interface Expense {
    id: number;
    date: string;
    description: string;
    category: string;
    amount: number;
    type: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface Saving {
    id: string;
    name: string;
    type: string;
    target_amount: number;
    current_amount: number;
    start_date: string; // o Date si ya es un objeto Date
    target_date: string; // o Date si ya es un objeto Date
    progress: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface HomeData {
    totalIncomes: number;
    totalExpenses: number;
    totalSavings: number;
    balance: number;
    incomesChange: number;
    expensesChange: number;
    savingsChange: number;
    balanceChange: number;
}
