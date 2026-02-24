import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\AuditLogController::index
 * @see app/Http/Controllers/AuditLogController.php:16
 * @route '/audit-logs'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/audit-logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AuditLogController::index
 * @see app/Http/Controllers/AuditLogController.php:16
 * @route '/audit-logs'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuditLogController::index
 * @see app/Http/Controllers/AuditLogController.php:16
 * @route '/audit-logs'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AuditLogController::index
 * @see app/Http/Controllers/AuditLogController.php:16
 * @route '/audit-logs'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AuditLogController::index
 * @see app/Http/Controllers/AuditLogController.php:16
 * @route '/audit-logs'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AuditLogController::index
 * @see app/Http/Controllers/AuditLogController.php:16
 * @route '/audit-logs'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AuditLogController::index
 * @see app/Http/Controllers/AuditLogController.php:16
 * @route '/audit-logs'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\AuditLogController::exportMethod
 * @see app/Http/Controllers/AuditLogController.php:92
 * @route '/audit-logs/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/audit-logs/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AuditLogController::exportMethod
 * @see app/Http/Controllers/AuditLogController.php:92
 * @route '/audit-logs/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuditLogController::exportMethod
 * @see app/Http/Controllers/AuditLogController.php:92
 * @route '/audit-logs/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AuditLogController::exportMethod
 * @see app/Http/Controllers/AuditLogController.php:92
 * @route '/audit-logs/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AuditLogController::exportMethod
 * @see app/Http/Controllers/AuditLogController.php:92
 * @route '/audit-logs/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AuditLogController::exportMethod
 * @see app/Http/Controllers/AuditLogController.php:92
 * @route '/audit-logs/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AuditLogController::exportMethod
 * @see app/Http/Controllers/AuditLogController.php:92
 * @route '/audit-logs/export'
 */
        exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod.form = exportMethodForm
/**
* @see \App\Http\Controllers\AuditLogController::show
 * @see app/Http/Controllers/AuditLogController.php:77
 * @route '/audit-logs/{auditLog}'
 */
export const show = (args: { auditLog: number | { id: number } } | [auditLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/audit-logs/{auditLog}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AuditLogController::show
 * @see app/Http/Controllers/AuditLogController.php:77
 * @route '/audit-logs/{auditLog}'
 */
show.url = (args: { auditLog: number | { id: number } } | [auditLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { auditLog: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { auditLog: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    auditLog: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        auditLog: typeof args.auditLog === 'object'
                ? args.auditLog.id
                : args.auditLog,
                }

    return show.definition.url
            .replace('{auditLog}', parsedArgs.auditLog.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuditLogController::show
 * @see app/Http/Controllers/AuditLogController.php:77
 * @route '/audit-logs/{auditLog}'
 */
show.get = (args: { auditLog: number | { id: number } } | [auditLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AuditLogController::show
 * @see app/Http/Controllers/AuditLogController.php:77
 * @route '/audit-logs/{auditLog}'
 */
show.head = (args: { auditLog: number | { id: number } } | [auditLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AuditLogController::show
 * @see app/Http/Controllers/AuditLogController.php:77
 * @route '/audit-logs/{auditLog}'
 */
    const showForm = (args: { auditLog: number | { id: number } } | [auditLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AuditLogController::show
 * @see app/Http/Controllers/AuditLogController.php:77
 * @route '/audit-logs/{auditLog}'
 */
        showForm.get = (args: { auditLog: number | { id: number } } | [auditLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AuditLogController::show
 * @see app/Http/Controllers/AuditLogController.php:77
 * @route '/audit-logs/{auditLog}'
 */
        showForm.head = (args: { auditLog: number | { id: number } } | [auditLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\AuditLogController::forModel
 * @see app/Http/Controllers/AuditLogController.php:181
 * @route '/audit-logs/model/{model}/{id}'
 */
export const forModel = (args: { model: string | number, id: string | number } | [model: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: forModel.url(args, options),
    method: 'get',
})

forModel.definition = {
    methods: ["get","head"],
    url: '/audit-logs/model/{model}/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AuditLogController::forModel
 * @see app/Http/Controllers/AuditLogController.php:181
 * @route '/audit-logs/model/{model}/{id}'
 */
forModel.url = (args: { model: string | number, id: string | number } | [model: string | number, id: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    model: args[0],
                    id: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        model: args.model,
                                id: args.id,
                }

    return forModel.definition.url
            .replace('{model}', parsedArgs.model.toString())
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuditLogController::forModel
 * @see app/Http/Controllers/AuditLogController.php:181
 * @route '/audit-logs/model/{model}/{id}'
 */
forModel.get = (args: { model: string | number, id: string | number } | [model: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: forModel.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AuditLogController::forModel
 * @see app/Http/Controllers/AuditLogController.php:181
 * @route '/audit-logs/model/{model}/{id}'
 */
forModel.head = (args: { model: string | number, id: string | number } | [model: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: forModel.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AuditLogController::forModel
 * @see app/Http/Controllers/AuditLogController.php:181
 * @route '/audit-logs/model/{model}/{id}'
 */
    const forModelForm = (args: { model: string | number, id: string | number } | [model: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: forModel.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AuditLogController::forModel
 * @see app/Http/Controllers/AuditLogController.php:181
 * @route '/audit-logs/model/{model}/{id}'
 */
        forModelForm.get = (args: { model: string | number, id: string | number } | [model: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: forModel.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AuditLogController::forModel
 * @see app/Http/Controllers/AuditLogController.php:181
 * @route '/audit-logs/model/{model}/{id}'
 */
        forModelForm.head = (args: { model: string | number, id: string | number } | [model: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: forModel.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    forModel.form = forModelForm
const auditLogs = {
    index: Object.assign(index, index),
export: Object.assign(exportMethod, exportMethod),
show: Object.assign(show, show),
forModel: Object.assign(forModel, forModel),
}

export default auditLogs