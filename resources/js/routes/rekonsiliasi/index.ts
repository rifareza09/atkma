import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\StockReconciliationController::index
 * @see app/Http/Controllers/StockReconciliationController.php:23
 * @route '/stok/rekonsiliasi'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/stok/rekonsiliasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StockReconciliationController::index
 * @see app/Http/Controllers/StockReconciliationController.php:23
 * @route '/stok/rekonsiliasi'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StockReconciliationController::index
 * @see app/Http/Controllers/StockReconciliationController.php:23
 * @route '/stok/rekonsiliasi'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StockReconciliationController::index
 * @see app/Http/Controllers/StockReconciliationController.php:23
 * @route '/stok/rekonsiliasi'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StockReconciliationController::index
 * @see app/Http/Controllers/StockReconciliationController.php:23
 * @route '/stok/rekonsiliasi'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StockReconciliationController::index
 * @see app/Http/Controllers/StockReconciliationController.php:23
 * @route '/stok/rekonsiliasi'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StockReconciliationController::index
 * @see app/Http/Controllers/StockReconciliationController.php:23
 * @route '/stok/rekonsiliasi'
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
* @see \App\Http\Controllers\StockReconciliationController::create
 * @see app/Http/Controllers/StockReconciliationController.php:50
 * @route '/stok/rekonsiliasi/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/stok/rekonsiliasi/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StockReconciliationController::create
 * @see app/Http/Controllers/StockReconciliationController.php:50
 * @route '/stok/rekonsiliasi/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StockReconciliationController::create
 * @see app/Http/Controllers/StockReconciliationController.php:50
 * @route '/stok/rekonsiliasi/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StockReconciliationController::create
 * @see app/Http/Controllers/StockReconciliationController.php:50
 * @route '/stok/rekonsiliasi/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StockReconciliationController::create
 * @see app/Http/Controllers/StockReconciliationController.php:50
 * @route '/stok/rekonsiliasi/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StockReconciliationController::create
 * @see app/Http/Controllers/StockReconciliationController.php:50
 * @route '/stok/rekonsiliasi/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StockReconciliationController::create
 * @see app/Http/Controllers/StockReconciliationController.php:50
 * @route '/stok/rekonsiliasi/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\StockReconciliationController::store
 * @see app/Http/Controllers/StockReconciliationController.php:66
 * @route '/stok/rekonsiliasi'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/stok/rekonsiliasi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\StockReconciliationController::store
 * @see app/Http/Controllers/StockReconciliationController.php:66
 * @route '/stok/rekonsiliasi'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StockReconciliationController::store
 * @see app/Http/Controllers/StockReconciliationController.php:66
 * @route '/stok/rekonsiliasi'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\StockReconciliationController::store
 * @see app/Http/Controllers/StockReconciliationController.php:66
 * @route '/stok/rekonsiliasi'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\StockReconciliationController::store
 * @see app/Http/Controllers/StockReconciliationController.php:66
 * @route '/stok/rekonsiliasi'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\StockReconciliationController::show
 * @see app/Http/Controllers/StockReconciliationController.php:132
 * @route '/stok/rekonsiliasi/{rekonsiliasi}'
 */
export const show = (args: { rekonsiliasi: string | number } | [rekonsiliasi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/stok/rekonsiliasi/{rekonsiliasi}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StockReconciliationController::show
 * @see app/Http/Controllers/StockReconciliationController.php:132
 * @route '/stok/rekonsiliasi/{rekonsiliasi}'
 */
show.url = (args: { rekonsiliasi: string | number } | [rekonsiliasi: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rekonsiliasi: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    rekonsiliasi: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rekonsiliasi: args.rekonsiliasi,
                }

    return show.definition.url
            .replace('{rekonsiliasi}', parsedArgs.rekonsiliasi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StockReconciliationController::show
 * @see app/Http/Controllers/StockReconciliationController.php:132
 * @route '/stok/rekonsiliasi/{rekonsiliasi}'
 */
show.get = (args: { rekonsiliasi: string | number } | [rekonsiliasi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StockReconciliationController::show
 * @see app/Http/Controllers/StockReconciliationController.php:132
 * @route '/stok/rekonsiliasi/{rekonsiliasi}'
 */
show.head = (args: { rekonsiliasi: string | number } | [rekonsiliasi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StockReconciliationController::show
 * @see app/Http/Controllers/StockReconciliationController.php:132
 * @route '/stok/rekonsiliasi/{rekonsiliasi}'
 */
    const showForm = (args: { rekonsiliasi: string | number } | [rekonsiliasi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StockReconciliationController::show
 * @see app/Http/Controllers/StockReconciliationController.php:132
 * @route '/stok/rekonsiliasi/{rekonsiliasi}'
 */
        showForm.get = (args: { rekonsiliasi: string | number } | [rekonsiliasi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StockReconciliationController::show
 * @see app/Http/Controllers/StockReconciliationController.php:132
 * @route '/stok/rekonsiliasi/{rekonsiliasi}'
 */
        showForm.head = (args: { rekonsiliasi: string | number } | [rekonsiliasi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\StockReconciliationController::destroy
 * @see app/Http/Controllers/StockReconciliationController.php:176
 * @route '/stok/rekonsiliasi/{rekonsiliasi}'
 */
export const destroy = (args: { rekonsiliasi: string | number } | [rekonsiliasi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/stok/rekonsiliasi/{rekonsiliasi}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\StockReconciliationController::destroy
 * @see app/Http/Controllers/StockReconciliationController.php:176
 * @route '/stok/rekonsiliasi/{rekonsiliasi}'
 */
destroy.url = (args: { rekonsiliasi: string | number } | [rekonsiliasi: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rekonsiliasi: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    rekonsiliasi: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rekonsiliasi: args.rekonsiliasi,
                }

    return destroy.definition.url
            .replace('{rekonsiliasi}', parsedArgs.rekonsiliasi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StockReconciliationController::destroy
 * @see app/Http/Controllers/StockReconciliationController.php:176
 * @route '/stok/rekonsiliasi/{rekonsiliasi}'
 */
destroy.delete = (args: { rekonsiliasi: string | number } | [rekonsiliasi: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\StockReconciliationController::destroy
 * @see app/Http/Controllers/StockReconciliationController.php:176
 * @route '/stok/rekonsiliasi/{rekonsiliasi}'
 */
    const destroyForm = (args: { rekonsiliasi: string | number } | [rekonsiliasi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\StockReconciliationController::destroy
 * @see app/Http/Controllers/StockReconciliationController.php:176
 * @route '/stok/rekonsiliasi/{rekonsiliasi}'
 */
        destroyForm.delete = (args: { rekonsiliasi: string | number } | [rekonsiliasi: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const rekonsiliasi = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
destroy: Object.assign(destroy, destroy),
}

export default rekonsiliasi