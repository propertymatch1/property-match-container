import { Button } from "~/components/ui/button";

interface ChatLoadingProps {
  message: string;
}

export function ChatLoading({ message }: ChatLoadingProps) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      <span className="text-sm">{message}</span>
    </div>
  );
}

interface SaveErrorProps {
  message: string;
  onRetry: () => void;
  details?: string;
}

export function SaveError({ message, onRetry, details }: SaveErrorProps) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-3">
      <div className="flex items-start gap-2">
        <div className="text-red-600">⚠️</div>
        <div className="flex-1">
          <p className="text-sm font-medium text-red-800">{message}</p>
          {details && (
            <p className="mt-1 text-xs text-red-600">{details}</p>
          )}
          <Button
            onClick={onRetry}
            variant="outline"
            size="sm"
            className="mt-2 h-7 border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700"
          >
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}

interface RetryPromptProps {
  message: string;
  onRetry: () => void;
  onCancel: () => void;
}

export function RetryPrompt({ message, onRetry, onCancel }: RetryPromptProps) {
  return (
    <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
      <div className="flex items-start gap-2">
        <div className="text-yellow-600">🔄</div>
        <div className="flex-1">
          <p className="text-sm font-medium text-yellow-800">{message}</p>
          <div className="mt-2 flex gap-2">
            <Button
              onClick={onRetry}
              size="sm"
              className="h-7 bg-yellow-600 text-white hover:bg-yellow-700"
            >
              Retry
            </Button>
            <Button
              onClick={onCancel}
              variant="outline"
              size="sm"
              className="h-7 border-yellow-600 text-yellow-600 hover:bg-yellow-100"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}