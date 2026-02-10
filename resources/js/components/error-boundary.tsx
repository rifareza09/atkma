import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: undefined });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex min-h-[400px] flex-col items-center justify-center p-8">
                    <div className="text-center">
                        <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
                        <h2 className="mt-4 text-xl font-semibold">
                            Terjadi Kesalahan
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {this.state.error?.message || 
                                'Maaf, terjadi kesalahan yang tidak terduga.'}
                        </p>
                        <div className="mt-6 flex gap-2 justify-center">
                            <Button
                                onClick={this.handleReset}
                                variant="outline"
                            >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Coba Lagi
                            </Button>
                            <Button
                                onClick={() => window.location.reload()}
                            >
                                Reload Halaman
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
