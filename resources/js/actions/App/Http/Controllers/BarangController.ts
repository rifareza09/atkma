import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\BarangController::index
 * @see app/Http/Controllers/BarangController.php:21
 * @route '/master/barang'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/master/barang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BarangController::index
 * @see app/Http/Controllers/BarangController.php:21
 * @route '/master/barang'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BarangController::index
 * @see app/Http/Controllers/BarangController.php:21
 * @route '/master/barang'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BarangController::index
 * @see app/Http/Controllers/BarangController.php:21
 * @route '/master/barang'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BarangController::index
 * @see app/Http/Controllers/BarangController.php:21
 * @route '/master/barang'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BarangController::index
 * @see app/Http/Controllers/BarangController.php:21
 * @route '/master/barang'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BarangController::index
 * @see app/Http/Controllers/BarangController.php:21
 * @route '/master/barang'
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
* @see \App\Http\Controllers\BarangController::create
 * @see app/Http/Controllers/BarangController.php:59
 * @route '/master/barang/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/master/barang/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BarangController::create
 * @see app/Http/Controllers/BarangController.php:59
 * @route '/master/barang/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BarangController::create
 * @see app/Http/Controllers/BarangController.php:59
 * @route '/master/barang/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BarangController::create
 * @see app/Http/Controllers/BarangController.php:59
 * @route '/master/barang/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BarangController::create
 * @see app/Http/Controllers/BarangController.php:59
 * @route '/master/barang/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BarangController::create
 * @see app/Http/Controllers/BarangController.php:59
 * @route '/master/barang/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BarangController::create
 * @see app/Http/Controllers/BarangController.php:59
 * @route '/master/barang/create'
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
* @see \App\Http\Controllers\BarangController::store
 * @see app/Http/Controllers/BarangController.php:69
 * @route '/master/barang'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/master/barang',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BarangController::store
 * @see app/Http/Controllers/BarangController.php:69
 * @route '/master/barang'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BarangController::store
 * @see app/Http/Controllers/BarangController.php:69
 * @route '/master/barang'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\BarangController::store
 * @see app/Http/Controllers/BarangController.php:69
 * @route '/master/barang'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BarangController::store
 * @see app/Http/Controllers/BarangController.php:69
 * @route '/master/barang'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\BarangController::show
 * @see app/Http/Controllers/BarangController.php:82
 * @route '/master/barang/{barang}'
 */
export const show = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/master/barang/{barang}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BarangController::show
 * @see app/Http/Controllers/BarangController.php:82
 * @route '/master/barang/{barang}'
 */
show.url = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { barang: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { barang: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    barang: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        barang: typeof args.barang === 'object'
                ? args.barang.id
                : args.barang,
                }

    return show.definition.url
            .replace('{barang}', parsedArgs.barang.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BarangController::show
 * @see app/Http/Controllers/BarangController.php:82
 * @route '/master/barang/{barang}'
 */
show.get = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BarangController::show
 * @see app/Http/Controllers/BarangController.php:82
 * @route '/master/barang/{barang}'
 */
show.head = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BarangController::show
 * @see app/Http/Controllers/BarangController.php:82
 * @route '/master/barang/{barang}'
 */
    const showForm = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BarangController::show
 * @see app/Http/Controllers/BarangController.php:82
 * @route '/master/barang/{barang}'
 */
        showForm.get = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BarangController::show
 * @see app/Http/Controllers/BarangController.php:82
 * @route '/master/barang/{barang}'
 */
        showForm.head = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\BarangController::edit
 * @see app/Http/Controllers/BarangController.php:96
 * @route '/master/barang/{barang}/edit'
 */
export const edit = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/master/barang/{barang}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BarangController::edit
 * @see app/Http/Controllers/BarangController.php:96
 * @route '/master/barang/{barang}/edit'
 */
edit.url = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { barang: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { barang: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    barang: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        barang: typeof args.barang === 'object'
                ? args.barang.id
                : args.barang,
                }

    return edit.definition.url
            .replace('{barang}', parsedArgs.barang.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BarangController::edit
 * @see app/Http/Controllers/BarangController.php:96
 * @route '/master/barang/{barang}/edit'
 */
edit.get = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BarangController::edit
 * @see app/Http/Controllers/BarangController.php:96
 * @route '/master/barang/{barang}/edit'
 */
edit.head = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BarangController::edit
 * @see app/Http/Controllers/BarangController.php:96
 * @route '/master/barang/{barang}/edit'
 */
    const editForm = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BarangController::edit
 * @see app/Http/Controllers/BarangController.php:96
 * @route '/master/barang/{barang}/edit'
 */
        editForm.get = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BarangController::edit
 * @see app/Http/Controllers/BarangController.php:96
 * @route '/master/barang/{barang}/edit'
 */
        editForm.head = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\BarangController::update
 * @see app/Http/Controllers/BarangController.php:108
 * @route '/master/barang/{barang}'
 */
export const update = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/master/barang/{barang}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\BarangController::update
 * @see app/Http/Controllers/BarangController.php:108
 * @route '/master/barang/{barang}'
 */
update.url = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { barang: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { barang: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    barang: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        barang: typeof args.barang === 'object'
                ? args.barang.id
                : args.barang,
                }

    return update.definition.url
            .replace('{barang}', parsedArgs.barang.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BarangController::update
 * @see app/Http/Controllers/BarangController.php:108
 * @route '/master/barang/{barang}'
 */
update.put = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\BarangController::update
 * @see app/Http/Controllers/BarangController.php:108
 * @route '/master/barang/{barang}'
 */
update.patch = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\BarangController::update
 * @see app/Http/Controllers/BarangController.php:108
 * @route '/master/barang/{barang}'
 */
    const updateForm = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BarangController::update
 * @see app/Http/Controllers/BarangController.php:108
 * @route '/master/barang/{barang}'
 */
        updateForm.put = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\BarangController::update
 * @see app/Http/Controllers/BarangController.php:108
 * @route '/master/barang/{barang}'
 */
        updateForm.patch = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\BarangController::destroy
 * @see app/Http/Controllers/BarangController.php:121
 * @route '/master/barang/{barang}'
 */
export const destroy = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/master/barang/{barang}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\BarangController::destroy
 * @see app/Http/Controllers/BarangController.php:121
 * @route '/master/barang/{barang}'
 */
destroy.url = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { barang: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { barang: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    barang: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        barang: typeof args.barang === 'object'
                ? args.barang.id
                : args.barang,
                }

    return destroy.definition.url
            .replace('{barang}', parsedArgs.barang.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BarangController::destroy
 * @see app/Http/Controllers/BarangController.php:121
 * @route '/master/barang/{barang}'
 */
destroy.delete = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\BarangController::destroy
 * @see app/Http/Controllers/BarangController.php:121
 * @route '/master/barang/{barang}'
 */
    const destroyForm = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BarangController::destroy
 * @see app/Http/Controllers/BarangController.php:121
 * @route '/master/barang/{barang}'
 */
        destroyForm.delete = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\BarangController::transactionHistory
 * @see app/Http/Controllers/BarangController.php:156
 * @route '/master/barang/{barang}/transaction-history'
 */
export const transactionHistory = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transactionHistory.url(args, options),
    method: 'get',
})

transactionHistory.definition = {
    methods: ["get","head"],
    url: '/master/barang/{barang}/transaction-history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BarangController::transactionHistory
 * @see app/Http/Controllers/BarangController.php:156
 * @route '/master/barang/{barang}/transaction-history'
 */
transactionHistory.url = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { barang: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { barang: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    barang: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        barang: typeof args.barang === 'object'
                ? args.barang.id
                : args.barang,
                }

    return transactionHistory.definition.url
            .replace('{barang}', parsedArgs.barang.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BarangController::transactionHistory
 * @see app/Http/Controllers/BarangController.php:156
 * @route '/master/barang/{barang}/transaction-history'
 */
transactionHistory.get = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transactionHistory.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BarangController::transactionHistory
 * @see app/Http/Controllers/BarangController.php:156
 * @route '/master/barang/{barang}/transaction-history'
 */
transactionHistory.head = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: transactionHistory.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BarangController::transactionHistory
 * @see app/Http/Controllers/BarangController.php:156
 * @route '/master/barang/{barang}/transaction-history'
 */
    const transactionHistoryForm = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: transactionHistory.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BarangController::transactionHistory
 * @see app/Http/Controllers/BarangController.php:156
 * @route '/master/barang/{barang}/transaction-history'
 */
        transactionHistoryForm.get = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: transactionHistory.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BarangController::transactionHistory
 * @see app/Http/Controllers/BarangController.php:156
 * @route '/master/barang/{barang}/transaction-history'
 */
        transactionHistoryForm.head = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: transactionHistory.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    transactionHistory.form = transactionHistoryForm
/**
* @see \App\Http\Controllers\BarangController::exportTransactionHistory
 * @see app/Http/Controllers/BarangController.php:260
 * @route '/master/barang/{barang}/transaction-history/export'
 */
export const exportTransactionHistory = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportTransactionHistory.url(args, options),
    method: 'get',
})

exportTransactionHistory.definition = {
    methods: ["get","head"],
    url: '/master/barang/{barang}/transaction-history/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BarangController::exportTransactionHistory
 * @see app/Http/Controllers/BarangController.php:260
 * @route '/master/barang/{barang}/transaction-history/export'
 */
exportTransactionHistory.url = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { barang: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { barang: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    barang: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        barang: typeof args.barang === 'object'
                ? args.barang.id
                : args.barang,
                }

    return exportTransactionHistory.definition.url
            .replace('{barang}', parsedArgs.barang.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BarangController::exportTransactionHistory
 * @see app/Http/Controllers/BarangController.php:260
 * @route '/master/barang/{barang}/transaction-history/export'
 */
exportTransactionHistory.get = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportTransactionHistory.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BarangController::exportTransactionHistory
 * @see app/Http/Controllers/BarangController.php:260
 * @route '/master/barang/{barang}/transaction-history/export'
 */
exportTransactionHistory.head = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportTransactionHistory.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BarangController::exportTransactionHistory
 * @see app/Http/Controllers/BarangController.php:260
 * @route '/master/barang/{barang}/transaction-history/export'
 */
    const exportTransactionHistoryForm = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportTransactionHistory.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BarangController::exportTransactionHistory
 * @see app/Http/Controllers/BarangController.php:260
 * @route '/master/barang/{barang}/transaction-history/export'
 */
        exportTransactionHistoryForm.get = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportTransactionHistory.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BarangController::exportTransactionHistory
 * @see app/Http/Controllers/BarangController.php:260
 * @route '/master/barang/{barang}/transaction-history/export'
 */
        exportTransactionHistoryForm.head = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportTransactionHistory.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportTransactionHistory.form = exportTransactionHistoryForm
const BarangController = { index, create, store, show, edit, update, destroy, transactionHistory, exportTransactionHistory }

export default BarangController