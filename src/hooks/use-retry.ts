"use client";

import { useState, useCallback, useRef } from 'react';

interface RetryOptions {
  maxAttempts?: number;
  delay?: number;
  backoff?: boolean;
  onError?: (error: Error, attempt: number) => void;
  onSuccess?: (result: any, attempt: number) => void;
}

interface RetryState {
  isLoading: boolean;
  error: Error | null;
  attempt: number;
  canRetry: boolean;
}

export function useRetry<T>(
  asyncFunction: () => Promise<T>,
  options: RetryOptions = {}
) {
  const {
    maxAttempts = 3,
    delay = 1000,
    backoff = true,
    onError,
    onSuccess
  } = options;

  const [state, setState] = useState<RetryState>({
    isLoading: false,
    error: null,
    attempt: 0,
    canRetry: true
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(async (): Promise<T | null> => {
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      attempt: prev.attempt + 1
    }));

    let currentAttempt = state.attempt + 1;

    for (let attempt = currentAttempt; attempt <= maxAttempts; attempt++) {
      try {
        // Check if request was aborted
        if (abortControllerRef.current?.signal.aborted) {
          throw new Error('Request was cancelled');
        }

        const result = await asyncFunction();
        
        setState({
          isLoading: false,
          error: null,
          attempt,
          canRetry: true
        });

        if (onSuccess) {
          onSuccess(result, attempt);
        }

        return result;
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        
        // Don't retry if request was aborted
        if (err.message === 'Request was cancelled') {
          setState(prev => ({
            ...prev,
            isLoading: false,
            error: err,
            canRetry: false
          }));
          return null;
        }

        if (onError) {
          onError(err, attempt);
        }

        // If this is the last attempt, set final error state
        if (attempt === maxAttempts) {
          setState({
            isLoading: false,
            error: err,
            attempt,
            canRetry: false
          });
          throw err;
        }

        // Wait before retrying (with exponential backoff if enabled)
        const waitTime = backoff ? delay * Math.pow(2, attempt - 1) : delay;
        await new Promise(resolve => setTimeout(resolve, waitTime));

        // Update attempt count
        setState(prev => ({
          ...prev,
          attempt
        }));
      }
    }

    return null;
  }, [asyncFunction, maxAttempts, delay, backoff, onError, onSuccess, state.attempt]);

  const retry = useCallback(() => {
    setState(prev => ({
      ...prev,
      attempt: 0,
      canRetry: true,
      error: null
    }));
    return execute();
  }, [execute]);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setState(prev => ({
      ...prev,
      isLoading: false,
      canRetry: true
    }));
  }, []);

  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setState({
      isLoading: false,
      error: null,
      attempt: 0,
      canRetry: true
    });
  }, []);

  return {
    ...state,
    execute,
    retry,
    cancel,
    reset
  };
}

// Specialized hook for network requests
export function useNetworkRetry<T>(
  requestFunction: () => Promise<T>,
  options: RetryOptions = {}
) {
  const defaultOptions: RetryOptions = {
    maxAttempts: 3,
    delay: 1000,
    backoff: true,
    onError: (error, attempt) => {
      console.warn(`Network request failed (attempt ${attempt}):`, error.message);
    },
    ...options
  };

  return useRetry(requestFunction, defaultOptions);
}

// Hook for handling API errors with user-friendly messages
export function useApiErrorHandler() {
  const getErrorMessage = useCallback((error: Error | any): string => {
    if (!error) return 'An unknown error occurred';

    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return 'Network connection failed. Please check your internet connection.';
    }

    // Handle timeout errors
    if (error.message.includes('timeout') || error.message.includes('ETIMEDOUT')) {
      return 'Request timed out. Please try again.';
    }

    // Handle abort errors
    if (error.message === 'Request was cancelled') {
      return 'Request was cancelled.';
    }

    // Handle HTTP errors
    if (error.status) {
      switch (error.status) {
        case 400:
          return 'Invalid request. Please check your input.';
        case 401:
          return 'Authentication required. Please sign in again.';
        case 403:
          return 'Access denied. You don\'t have permission for this action.';
        case 404:
          return 'Resource not found.';
        case 409:
          return 'Conflict detected. The resource may already exist.';
        case 429:
          return 'Too many requests. Please wait a moment and try again.';
        case 500:
          return 'Server error. Please try again later.';
        case 503:
          return 'Service temporarily unavailable. Please try again later.';
        default:
          return `Server error (${error.status}). Please try again.`;
      }
    }

    // Return the error message if it's user-friendly, otherwise use a generic message
    if (typeof error.message === 'string' && error.message.length < 100) {
      return error.message;
    }

    return 'An unexpected error occurred. Please try again.';
  }, []);

  return { getErrorMessage };
}