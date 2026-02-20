import { useToast as useToastOriginal } from './use-toast';

export function useToast() {
    const { toast, ...rest } = useToastOriginal();

    return {
        ...rest,
        toast,
        success: (title: string, description?: string) => {
            return toast({
                title,
                description,
                variant: 'default',
            });
        },
        error: (title: string, description?: string) => {
            return toast({
                title,
                description,
                variant: 'destructive',
            });
        },
        warning: (title: string, description?: string) => {
            return toast({
                title: title,
                description,
                variant: 'default',
            });
        },
        info: (title: string, description?: string) => {
            return toast({
                title,
                description,
                variant: 'default',
            });
        },
        promise: <T,>(
            promise: Promise<T>,
            {
                loading,
                success,
                error,
            }: {
                loading: string;
                success: string | ((data: T) => string);
                error: string | ((error: any) => string);
            }
        ) => {
            const id = toast({
                title: loading,
                description: 'Mohon tunggu...',
            }).id;

            promise
                .then((data) => {
                    toast({
                        id,
                        title: typeof success === 'function' ? success(data) : success,
                        variant: 'default',
                    });
                })
                .catch((err) => {
                    toast({
                        id,
                        title: typeof error === 'function' ? error(err) : error,
                        variant: 'destructive',
                    });
                });

            return promise;
        },
    };
}
