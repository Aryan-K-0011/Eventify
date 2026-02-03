import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-luxBlack text-white flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-luxCharcoal border border-white/10 p-8 md:p-12 rounded-sm max-w-2xl w-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-luxGold to-transparent"></div>
                
                <div className="w-20 h-20 bg-luxGold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-luxGold animate-pulse">
                    <AlertTriangle size={40} />
                </div>
                
                <h1 className="text-4xl font-royal text-white mb-4">Anomaly Detected</h1>
                <p className="text-gray-400 font-light mb-8">
                    The interface encountered an unexpected deviation. Our engineers have been notified.
                </p>

                <div className="bg-black/50 p-4 rounded text-left mb-8 border border-white/5 overflow-auto max-h-40">
                    <p className="text-red-400 font-mono text-xs mb-2">ERROR_LOG_DUMP:</p>
                    <pre className="text-gray-500 font-mono text-xs whitespace-pre-wrap">
                        {this.state.error && this.state.error.toString()}
                    </pre>
                </div>

                <button 
                    onClick={() => window.location.reload()}
                    className="bg-luxGold text-luxBlack px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-white transition-colors flex items-center gap-2 mx-auto"
                >
                    <RefreshCw size={14} /> Reboot Interface
                </button>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;