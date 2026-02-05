# 📚 Frontend Development Cheatsheet - ATK MA

## 🎯 Common Patterns & Usage

### 1. Create New Page

```typescript
// resources/js/pages/your-page.tsx
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Your Page', href: '#' },
];

export default function YourPage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Your Page" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Your content here */}
            </div>
        </AppLayout>
    );
}
```

### 2. Create Form with Inertia

```typescript
import { useForm } from '@inertiajs/react';
import { InputWithLabel, SelectWithLabel } from '@/components/form';
import { useToast } from '@/hooks/use-toast';

export default function FormPage() {
    const { toast } = useToast();
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/your-endpoint', {
            onSuccess: () => {
                toast({
                    title: 'Berhasil',
                    description: 'Data berhasil disimpan',
                });
            },
            onError: () => {
                toast({
                    title: 'Gagal',
                    description: 'Terjadi kesalahan',
                    variant: 'destructive',
                });
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputWithLabel
                label="Name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                error={errors.name}
                required
            />

            <Button type="submit" disabled={processing}>
                {processing ? 'Saving...' : 'Save'}
            </Button>
        </form>
    );
}
```

### 3. Create DataTable

```typescript
import { DataTable, type Column } from '@/components/data-table';
import { Pagination } from '@/components/pagination';
import type { YourType, PaginatedResponse } from '@/types';

interface Props {
    items: PaginatedResponse<YourType>;
}

export default function ListPage({ items }: Props) {
    const columns: Column<YourType>[] = [
        {
            key: 'name',
            label: 'Name',
        },
        {
            key: 'status',
            label: 'Status',
            render: (item) => (
                <Badge>{item.status}</Badge>
            ),
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (item) => (
                <div className="flex gap-2">
                    <Button size="sm" variant="ghost" asChild>
                        <Link href={`/items/${item.id}`}>
                            <Eye className="size-4" />
                        </Link>
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <DataTable columns={columns} data={items.data} />
            <Pagination meta={items.meta} />
        </>
    );
}
```

### 4. Show Toast Notification

```typescript
import { useToast } from '@/hooks/use-toast';

function YourComponent() {
    const { toast } = useToast();

    // Success toast
    toast({
        title: 'Berhasil',
        description: 'Operasi berhasil dilakukan',
    });

    // Error toast
    toast({
        title: 'Gagal',
        description: 'Terjadi kesalahan',
        variant: 'destructive',
    });
}
```

### 5. Handle Delete with Confirmation

```typescript
import { router } from '@inertiajs/react';
import { useToast } from '@/hooks/use-toast';

function DeleteButton({ id }: { id: number }) {
    const { toast } = useToast();

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            router.delete(`/your-endpoint/${id}`, {
                onSuccess: () => {
                    toast({
                        title: 'Berhasil',
                        description: 'Data berhasil dihapus',
                    });
                },
                onError: () => {
                    toast({
                        title: 'Gagal',
                        description: 'Terjadi kesalahan',
                        variant: 'destructive',
                    });
                },
            });
        }
    };

    return (
        <Button onClick={handleDelete} variant="destructive">
            <Trash2 className="size-4" />
        </Button>
    );
}
```

### 6. Search & Filter

```typescript
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Filters {
    search?: string;
    status?: string;
}

export default function FilterPage({ filters }: { filters: Filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/your-route',
            { search },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <form onSubmit={handleSearch}>
            <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Button type="submit">Search</Button>
        </form>
    );
}
```

---

## 🎨 Component Library Reference

### Form Components

```typescript
import {
    InputWithLabel,
    SelectWithLabel,
    TextareaWithLabel
} from '@/components/form';

// InputWithLabel
<InputWithLabel
    label="Field Name"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    error={errors.field}
    required
    placeholder="Enter value"
    helperText="Optional helper text"
/>

// SelectWithLabel
<SelectWithLabel
    label="Status"
    value={value}
    onValueChange={(val) => setValue(val)}
    options={[
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
    ]}
    error={errors.field}
    required
/>

// TextareaWithLabel
<TextareaWithLabel
    label="Description"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    error={errors.field}
    rows={4}
/>
```

### UI Components

```typescript
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Button variants
<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// Badge variants
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>

// Card
<Card>
    <CardHeader>
        <CardTitle>Title</CardTitle>
    </CardHeader>
    <CardContent>
        Content here
    </CardContent>
</Card>
```

---

## 🗂️ Type Definitions

### Import Types

```typescript
import type {
    Barang,
    Ruangan,
    Transaction,
    BreadcrumbItem,
    PaginatedResponse,
    SelectOption,
} from '@/types';
```

### Common Types

```typescript
// Breadcrumb
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Home', href: '/' },
    { title: 'Page', href: '/page' },
];

// Paginated Response
interface Props {
    items: PaginatedResponse<YourType>;
}

// Select Options
const options: SelectOption[] = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
];
```

---

## 🎯 Naming Conventions

### Files

- **Pages:** `kebab-case.tsx` (e.g., `barang-index.tsx`)
- **Components:** `kebab-case.tsx` (e.g., `data-table.tsx`)
- **Types:** `kebab-case.ts` (e.g., `atk.ts`)
- **Utils:** `kebab-case.ts` (e.g., `date-formatter.ts`)

### Components

- **Component names:** `PascalCase` (e.g., `DataTable`)
- **Function names:** `camelCase` (e.g., `handleSubmit`)
- **Constants:** `UPPER_SNAKE_CASE` (e.g., `API_URL`)

### Props Interfaces

```typescript
// Page props
interface BarangIndexProps {
    barangs: PaginatedResponse<Barang>;
    filters: { search?: string };
}

// Component props
interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
}
```

---

## 🚀 Quick Commands

```bash
# Development
npm run dev              # Start dev server
php artisan serve        # Start Laravel server

# Code Quality
npm run lint            # Lint code
npm run format          # Format code
npm run types           # Check types

# Build
npm run build          # Production build
npm run build:ssr      # SSR build
```

---

## 📁 Where to Put Files

```
New Page            → resources/js/pages/your-page.tsx
New Component       → resources/js/components/your-component.tsx
New UI Component    → resources/js/components/ui/your-ui.tsx
New Type            → resources/js/types/your-type.ts
New Hook            → resources/js/hooks/use-your-hook.ts
New Utility         → resources/js/lib/your-util.ts
```

---

## 💡 Tips & Best Practices

1. **Always use TypeScript types** - No `any` types!
2. **Use Inertia forms** - `useForm` hook for form handling
3. **Show toast feedback** - Success/error notifications
4. **Handle loading states** - Disable buttons while processing
5. **Validate on client** - Before sending to server
6. **Use breadcrumbs** - For navigation context
7. **Make it responsive** - Mobile-first design
8. **Keep components small** - Single responsibility
9. **Reuse components** - Don't repeat yourself
10. **Follow existing patterns** - Consistency is key

---

**Happy Coding! 🚀**
