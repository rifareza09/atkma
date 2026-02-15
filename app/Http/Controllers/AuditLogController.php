<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AuditLogController extends Controller
{
    /**
     * Display audit logs
     */
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', AuditLog::class);

        $query = AuditLog::with('user');

        // Filter by model
        if ($request->filled('model')) {
            $query->where('model', $request->model);
        }

        // Filter by action
        if ($request->filled('action')) {
            $query->where('action', $request->action);
        }

        // Filter by user
        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        // Filter by date range
        if ($request->filled('start_date')) {
            $query->whereDate('created_at', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('created_at', '<=', $request->end_date);
        }

        // Search by model ID
        if ($request->filled('search')) {
            $query->where('model_id', 'like', "%{$request->search}%");
        }

        // Sort
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $auditLogs = $query->paginate($request->get('per_page', 15))
            ->withQueryString();

        // Get available models for filter
        $models = AuditLog::distinct('model')
            ->pluck('model')
            ->map(fn($model) => [
                'value' => $model,
                'label' => class_basename($model),
            ]);

        return Inertia::render('audit/index', [
            'auditLogs' => $auditLogs,
            'filters' => $request->only(['model', 'action', 'user_id', 'start_date', 'end_date', 'search']),
            'models' => $models,
        ]);
    }

    /**
     * Display detail of specific audit log
     */
    public function show(AuditLog $auditLog): Response
    {
        $this->authorize('view', $auditLog);

        $auditLog->load('user');

        return Inertia::render('audit/show', [
            'auditLog' => $auditLog,
            'changes' => $auditLog->changes,
        ]);
    }

    /**
     * Export audit logs to CSV
     */
    public function export(Request $request): StreamedResponse
    {
        $this->authorize('export', AuditLog::class);

        $query = AuditLog::with('user');

        // Apply same filters as index
        if ($request->filled('model')) {
            $query->where('model', $request->model);
        }

        if ($request->filled('action')) {
            $query->where('action', $request->action);
        }

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        if ($request->filled('start_date')) {
            $query->whereDate('created_at', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('created_at', '<=', $request->end_date);
        }

        $query->orderBy('created_at', 'desc');

        $filename = 'audit-logs-' . now()->format('Y-m-d-His') . '.csv';

        return response()->streamDownload(function () use ($query) {
            $handle = fopen('php://output', 'w');

            // CSV Headers
            fputcsv($handle, [
                'ID',
                'Timestamp',
                'User',
                'Action',
                'Model',
                'Model ID',
                'IP Address',
                'Changes',
            ]);

            // Stream data in chunks
            $query->chunk(100, function ($logs) use ($handle) {
                foreach ($logs as $log) {
                    $changes = '';
                    
                    if ($log->action === 'updated' && $log->old_value && $log->new_value) {
                        $changesArray = [];
                        foreach ($log->new_value as $key => $newValue) {
                            $oldValue = $log->old_value[$key] ?? null;
                            if ($oldValue !== $newValue) {
                                $changesArray[] = "{$key}: {$oldValue} → {$newValue}";
                            }
                        }
                        $changes = implode('; ', $changesArray);
                    } elseif ($log->action === 'created') {
                        $changes = 'New record created';
                    } elseif ($log->action === 'deleted') {
                        $changes = 'Record deleted';
                    }

                    fputcsv($handle, [
                        $log->id,
                        $log->created_at->format('Y-m-d H:i:s'),
                        $log->user?->name ?? 'System',
                        ucfirst($log->action),
                        class_basename($log->model),
                        $log->model_id,
                        $log->ip_address,
                        $changes,
                    ]);
                }
            });

            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ]);
    }

    /**
     * Get audit logs for specific model
     */
    public function forModel(Request $request, string $model, int $id)
    {
        $this->authorize('viewAny', AuditLog::class);

        $modelClass = "App\\Models\\{$model}";

        if (!class_exists($modelClass)) {
            abort(404, 'Model not found');
        }

        $logs = AuditLog::where('model', $modelClass)
            ->where('model_id', $id)
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($logs);
    }
}
