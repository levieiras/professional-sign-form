"use client";

import { Component } from "react";
import { RotateCcw, AlertTriangle } from "lucide-react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-sm text-center space-y-4">
            <div className="mx-auto w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle size={28} className="text-destructive" />
            </div>
            <h2 className="text-xl font-bold">Algo deu errado</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Ocorreu um erro inesperado. Tente recomeçar o formulário.
            </p>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <pre className="text-xs text-left bg-muted p-3 rounded-lg overflow-auto max-h-32 text-destructive">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground font-semibold px-6 py-3 hover:bg-primary/90 transition-colors"
            >
              <RotateCcw size={16} />
              Recomeçar
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
