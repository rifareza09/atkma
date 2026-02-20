# Frontend Enhancement - Panduan Penggunaan

## 📦 Komponen Baru yang Tersedia

### 1. ErrorBoundary

Menangkap error React dan menampilkan fallback UI yang user-friendly.

**Sudah diintegrasikan di app.tsx** - semua page otomatis terlindungi.

```tsx
import { ErrorBoundary } from '@/components/error-boundary';

// Custom error boundary untuk specific component
<ErrorBoundary fallback={<div>Custom error message</div>}>
    <YourComponent />
</ErrorBoundary>;
```

### 2. Toast Notifications

Toast helper dengan variants: success, error, warning, info, promise.

```tsx
import { useToast } from '@/hooks/use-toast-helpers';

function MyComponent() {
    const { success, error, warning, promise } = useToast();

    const handleSubmit = () => {
        success('Data berhasil disimpan!', 'Data telah tersimpan di database');

        // Atau untuk error
        error('Gagal menyimpan', 'Terjadi kesalahan saat menyimpan data');

        // Untuk async operations
        promise(saveData(), {
            loading: 'Menyimpan data...',
            success: 'Data berhasil disimpan!',
            error: 'Gagal menyimpan data',
        });
    };
}
```

### 3. Loading Button

Button dengan loading state dan disabled otomatis.

```tsx
import { LoadingButton } from '@/components/loading-button';

<LoadingButton
    loading={isSubmitting}
    loadingText="Menyimpan..."
    disabled={!isValid}
>
    Simpan Data
</LoadingButton>;
```

### 4. Validated Input

Input dengan validasi real-time dan error messages.

```tsx
import { ValidatedInput } from '@/components/validated-input';
import { validators } from '@/lib/validators';

<ValidatedInput
    id="email"
    label="Email"
    type="email"
    value={data.email}
    onChange={(e) => setData('email', e.target.value)}
    error={errors.email}
    validate={validators.compose(
        validators.required('Email'),
        validators.email,
    )}
    required
    hint="Masukkan email yang valid"
/>;
```

### 5. Validators

Utility functions untuk validasi form.

```tsx
import { validators, isFormValid } from '@/lib/validators';

// Available validators:
validators.required('Field name');
validators.email;
validators.minLength(8, 'Password');
validators.maxLength(50, 'Name');
validators.numeric;
validators.phone;
validators.alphanumeric;
validators.username;
validators.password;
validators.match(otherValue, 'Password');
validators.url;
validators.compose(...validators); // Combine multiple

// Example usage
const validate = validators.compose(
    validators.required('Email'),
    validators.email,
);

const error = validate(value);
if (error) {
    console.log(error); // "Email wajib diisi" or "Email tidak valid"
}
```

### 6. Skeleton Loading

Loading states untuk berbagai UI elements.

```tsx
import {
    Skeleton,
    SkeletonCard,
    SkeletonTable,
    SkeletonForm,
} from '@/components/ui/skeleton';

// Simple skeleton
{
    loading && <Skeleton className="h-4 w-full" />;
}

// Pre-built skeletons
{
    loading && <SkeletonTable rows={10} />;
}
{
    loading && <SkeletonForm />;
}
{
    loading && <SkeletonCard />;
}
```

### 7. Empty State

Tampilan untuk data kosong yang informatif.

```tsx
import { EmptyState } from '@/components/empty-state';
import { PackageOpen, Users, FileText } from 'lucide-react';

<EmptyState
    icon={PackageOpen}
    title="Belum ada data stok"
    description="Mulai tambahkan data stok barang Anda untuk memulai."
    action={{
        label: 'Tambah Stok',
        onClick: () => router.visit('/stok/create'),
    }}
/>;
```

### 8. Accessible Dialog

Dialog dengan focus trap dan keyboard navigation (ESC, Tab).

```tsx
import { AccessibleDialog } from '@/components/accessible-dialog';

<AccessibleDialog
    open={isOpen}
    onOpenChange={setIsOpen}
    title="Konfirmasi Hapus"
    description="Apakah Anda yakin ingin menghapus data ini?"
>
    <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" onClick={() => setIsOpen(false)}>
            Batal
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
            Hapus
        </Button>
    </div>
</AccessibleDialog>;
```

### 9. Responsive Table

Tabel yang responsive dengan horizontal scroll.

```tsx
import { ResponsiveTableWrapper, DesktopTable, MobileTableCard } from '@/components/responsive-table';

// Wrap existing table
<ResponsiveTableWrapper>
    <Table>
        {/* Your table content */}
    </Table>
</ResponsiveTableWrapper>

// Or separate desktop/mobile views
<>
    <DesktopTable>
        <Table>{/* Desktop table */}</Table>
    </DesktopTable>

    <MobileTableCard>
        {data.map(item => (
            <Card key={item.id}>{/* Mobile card view */}</Card>
        ))}
    </MobileTableCard>
</>
```

### 10. Accessibility Hooks

Hooks untuk keyboard navigation dan focus management.

```tsx
import {
    useFocusTrap,
    useEscapeKey,
    useRestoreFocus,
} from '@/hooks/use-accessibility';

function MyModal({ isOpen, onClose }) {
    const containerRef = useFocusTrap(isOpen);
    useEscapeKey(onClose, isOpen);
    useRestoreFocus();

    return <div ref={containerRef}>{/* Modal content */}</div>;
}
```

## 🎨 Best Practices

### Form Validation

```tsx
import { useForm } from '@inertiajs/react';
import { ValidatedInput } from '@/components/validated-input';
import { validators, isFormValid } from '@/lib/validators';
import { LoadingButton } from '@/components/loading-button';
import { useToast } from '@/hooks/use-toast-helpers';

function MyForm() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const { success, error } = useToast();

    const [localErrors, setLocalErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        post('/users', {
            onSuccess: () => {
                success('Berhasil!', 'User telah dibuat');
            },
            onError: () => {
                error('Gagal!', 'Terjadi kesalahan saat menyimpan');
            },
        });
    };

    const isValid = isFormValid(localErrors) && isFormValid(errors);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <ValidatedInput
                id="name"
                label="Nama"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                error={errors.name}
                validate={validators.required('Nama')}
                required
            />

            <ValidatedInput
                id="email"
                label="Email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                error={errors.email}
                validate={validators.compose(
                    validators.required('Email'),
                    validators.email,
                )}
                required
            />

            <ValidatedInput
                id="password"
                label="Password"
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                error={errors.password}
                validate={validators.password}
                required
                hint="Minimal 8 karakter dengan huruf besar, kecil, dan angka"
            />

            <LoadingButton
                type="submit"
                loading={processing}
                disabled={!isValid || processing}
                loadingText="Menyimpan..."
            >
                Simpan
            </LoadingButton>
        </form>
    );
}
```

### Table dengan Loading & Empty State

```tsx
import { SkeletonTable } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/empty-state';
import { ResponsiveTableWrapper } from '@/components/responsive-table';

function MyTable({ data, loading }) {
    if (loading) {
        return <SkeletonTable rows={10} />;
    }

    if (data.length === 0) {
        return (
            <EmptyState
                title="Belum ada data"
                description="Mulai tambahkan data pertama Anda"
                action={{
                    label: 'Tambah Data',
                    onClick: () => router.visit('/create'),
                }}
            />
        );
    }

    return (
        <ResponsiveTableWrapper>
            <Table>{/* Table content */}</Table>
        </ResponsiveTableWrapper>
    );
}
```

## ♿ Accessibility Checklist

### Semua komponen baru sudah include:

- ✅ ARIA labels pada button, input, dan interactive elements
- ✅ Keyboard navigation (Tab, Shift+Tab, ESC)
- ✅ Focus trap di modal/dialog
- ✅ Focus restoration setelah modal ditutup
- ✅ Error messages dengan role="alert"
- ✅ Descriptive labels dan hints
- ✅ Required field indicators
- ✅ Loading states yang accessible

## 📱 Responsive Design

### Breakpoints yang digunakan:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Testing:

- ✅ Mobile (320px - 767px)
- ✅ Tablet (768px - 1023px)
- ✅ Desktop (1024px+)

## 🧪 Testing Guidelines

### Manual Testing Checklist:

- [ ] Form validation bekerja real-time
- [ ] Toast muncul dengan benar (success/error)
- [ ] Loading states muncul saat processing
- [ ] Empty states tampil saat data kosong
- [ ] Skeleton muncul saat loading
- [ ] Keyboard navigation bekerja (Tab, ESC)
- [ ] Focus trap di modal bekerja
- [ ] Responsive di mobile/tablet
- [ ] Table horizontal scroll di mobile
- [ ] Error boundary menangkap error

## 📝 Migration Guide

### Update Existing Forms:

**Before:**

```tsx
<Input value={data.email} onChange={(e) => setData('email', e.target.value)} />;
{
    errors.email && <p className="text-red-500">{errors.email}</p>;
}
```

**After:**

```tsx
<ValidatedInput
    id="email"
    label="Email"
    value={data.email}
    onChange={(e) => setData('email', e.target.value)}
    error={errors.email}
    validate={validators.email}
    required
/>
```

### Update Existing Buttons:

**Before:**

```tsx
<Button disabled={processing}>{processing ? 'Loading...' : 'Submit'}</Button>
```

**After:**

```tsx
<LoadingButton loading={processing} loadingText="Menyimpan...">
    Submit
</LoadingButton>
```

## 🚀 Next Steps

1. Update semua form pages menggunakan `ValidatedInput`
2. Replace semua button submit dengan `LoadingButton`
3. Tambahkan `EmptyState` di semua index pages
4. Tambahkan `SkeletonTable` di pages dengan data fetching
5. Wrap semua table dengan `ResponsiveTableWrapper`
6. Replace dialog custom dengan `AccessibleDialog`
7. Gunakan `useToast` helpers untuk semua notifications

## 📞 Support

Jika ada pertanyaan atau butuh bantuan implementasi, silakan tanya di group atau lihat contoh penggunaan di file-file berikut:

- `resources/js/components/*.tsx` - Component examples
- `resources/js/lib/validators.ts` - Validation utilities
- `resources/js/hooks/*.ts` - Custom hooks
