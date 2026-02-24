import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\IncomingStockController::index
 * @see app/Http/Controllers/IncomingStockController.php:18
 * @route '/stok/barang-masuk'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/stok/barang-masuk',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IncomingStockController::index
 * @see app/Http/Controllers/IncomingStockController.php:18
 * @route '/stok/barang-masuk'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IncomingStockController::index
 * @see app/Http/Controllers/IncomingStockController.php:18
 * @route '/stok/barang-masuk'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\IncomingStockController::index
 * @see app/Http/Controllers/IncomingStockController.php:18
 * @route '/stok/barang-masuk'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\IncomingStockController::index
 * @see app/Http/Controllers/IncomingStockController.php:18
 * @route '/stok/barang-masuk'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\IncomingStockController::index
 * @see app/Http/Controllers/IncomingStockController.php:18
 * @route '/stok/barang-masuk'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\IncomingStockController::index
 * @see app/Http/Controllers/IncomingStockController.php:18
 * @route '/stok/barang-masuk'
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
* @see \App\Http\Controllers\IncomingStockController::create
 * @see app/Http/Controllers/IncomingStockController.php:76
 * @route '/stok/barang-masuk/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/stok/barang-masuk/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IncomingStockController::create
 * @see app/Http/Controllers/IncomingStockController.php:76
 * @route '/stok/barang-masuk/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IncomingStockController::create
 * @see app/Http/Controllers/IncomingStockController.php:76
 * @route '/stok/barang-masuk/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\IncomingStockController::create
 * @see app/Http/Controllers/IncomingStockController.php:76
 * @route '/stok/barang-masuk/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\IncomingStockController::create
 * @see app/Http/Controllers/IncomingStockController.php:76
 * @route '/stok/barang-masuk/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\IncomingStockController::create
 * @see app/Http/Controllers/IncomingStockController.php:76
 * @route '/stok/barang-masuk/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\IncomingStockController::create
 * @see app/Http/Controllers/IncomingStockController.php:76
 * @route '/stok/barang-masuk/create'
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
* @see \App\Http\Controllers\IncomingStockController::store
 * @see app/Http/Controllers/IncomingStockController.php:91
 * @route '/stok/barang-masuk'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/stok/barang-masuk',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\IncomingStockController::store
 * @see app/Http/Controllers/IncomingStockController.php:91
 * @route '/stok/barang-masuk'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IncomingStockController::store
 * @see app/Http/Controllers/IncomingStockController.php:91
 * @route '/stok/barang-masuk'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\IncomingStockController::store
 * @see app/Http/Controllers/IncomingStockController.php:91
 * @route '/stok/barang-masuk'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\IncomingStockController::store
 * @see app/Http/Controllers/IncomingStockController.php:91
 * @route '/stok/barang-masuk'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\IncomingStockController::show
 * @see app/Http/Controllers/IncomingStockController.php:113
 * @route '/stok/barang-masuk/{barangMasuk}'
 */
export const show = (args: { barangMasuk: number | { id: number } } | [barangMasuk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/stok/barang-masuk/{barangMasuk}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IncomingStockController::show
 * @see app/Http/Controllers/IncomingStockController.php:113
 * @route '/stok/barang-masuk/{barangMasuk}'
 */
show.url = (args: { barangMasuk: number | { id: number } } | [barangMasuk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { barangMasuk: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { barangMasuk: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    barangMasuk: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        barangMasuk: typeof args.barangMasuk === 'object'
                ? args.barangMasuk.id
                : args.barangMasuk,
                }

    return show.definition.url
            .replace('{barangMasuk}', parsedArgs.barangMasuk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IncomingStockController::show
 * @see app/Http/Controllers/IncomingStockController.php:113
 * @route '/stok/barang-masuk/{barangMasuk}'
 */
show.get = (args: { barangMasuk: number | { id: number } } | [barangMasuk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\IncomingStockController::show
 * @see app/Http/Controllers/IncomingStockController.php:113
 * @route '/stok/barang-masuk/{barangMasuk}'
 */
show.head = (args: { barangMasuk: number | { id: number } } | [barangMasuk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\IncomingStockController::show
 * @see app/Http/Controllers/IncomingStockController.php:113
 * @route '/stok/barang-masuk/{barangMasuk}'
 */
    const showForm = (args: { barangMasuk: number | { id: number } } | [barangMasuk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\IncomingStockController::show
 * @see app/Http/Controllers/IncomingStockController.php:113
 * @route '/stok/barang-masuk/{barangMasuk}'
 */
        showForm.get = (args: { barangMasuk: number | { id: number } } | [barangMasuk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\IncomingStockController::show
 * @see app/Http/Controllers/IncomingStockController.php:113
 * @route '/stok/barang-masuk/{barangMasuk}'
 */
        showForm.head = (args: { barangMasuk: number | { id: number } } | [barangMasuk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\IncomingStockController::edit
 * @see app/Http/Controllers/IncomingStockController.php:132
 * @route '/stok/barang-masuk/{barangMasuk}/edit'
 */
export const edit = (args: { barangMasuk: number | { id: number } } | [barangMasuk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/stok/barang-masuk/{barangMasuk}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IncomingStockController::edit
 * @see app/Http/Controllers/IncomingStockController.php:132
 * @route '/stok/barang-masuk/{barangMasuk}/edit'
 */
edit.url = (args: { barangMasuk: number | { id: number } } | [barangMasuk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { barangMasuk: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { barangMasuk: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    barangMasuk: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        barangMasuk: typeof args.barangMasuk === 'object'
                ? args.barangMasuk.id
                : args.barangMasuk,
                }

    return edit.definition.url
            .replace('{barangMasuk}', parsedArgs.barangMasuk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IncomingStockController::edit
 * @see app/Http/Controllers/IncomingStockController.php:132
 * @route '/stok/barang-masuk/{barangMasuk}/edit'
 */
edit.get = (args: { barangMasuk: number | { id: number } } | [barangMasuk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\IncomingStockController::edit
 * @see app/Http/Controllers/IncomingStockController.php:132
 * @route '/stok/barang-masuk/{barangMasuk}/edit'
 */
edit.head = (args: { barangMasuk: number | { id: number } } | [barangMasuk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\IncomingStockController::edit
 * @see app/Http/Controllers/IncomingStockController.php:132
 * @route '/stok/barang-masuk/{barangMasuk}/edit'
 */
    const editForm = (args: { barangMasuk: number | { id: number } } | [barangMasuk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\IncomingStockController::edit
 * @see app/Http/Controllers/IncomingStockController.php:132
 * @route '/stok/barang-masuk/{barangMasuk}/edit'
 */
        editForm.get = (args: { barangMasuk: number | { id: number } } | [barangMasuk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\IncomingStockController::edit
 * @see app/Http/Controllers/IncomingStockController.php:132
 * @route '/stok/barang-masuk/{barangMasuk}/edit'
 */
        editForm.head = (args: { barangMasuk: number | { id: number } } | [barangMasuk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\IncomingStockController::update
 * @see app/Http/Controllers/IncomingStockController.php:150
 * @route '/stok/barang-masuk/{barangMasuk}'
 */
export const update = (args: { barangMasuk: number | { id: number } } | [barangMasuk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/stok/barang-masuk/{barangMasuk}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\IncomingStockController::update
 * @see app/Http/Controllers/IncomingStockController.php:150
 * @route '/stok/barang-masuk/{barangMasuk}'
 */
update.url = (args: { barangMasuk: number | { id: number } } | [barangMasuk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { barangMasuk: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { barangMasuk: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    barangMasuk: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        barangMasuk: typeof args.barangMasuk === 'object'
                ? args.barangMasuk.id
                : args.barangMasuk,
                }

    return update.definition.url
            .replace('{barangMasuk}', parsedArgs.barangMasuk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IncomingStockController::update
 * @see app/Http/Controllers/IncomingStockController.php:150
 * @route '/stok/barang-masuk/{barangMasuk}'
 */
update.put = (args: { barangMasuk: number | { id: number } } | [barangMasuk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\IncomingStockController::update
 * @see app/Http/Controllers/IncomingStockController.php:150
 * @route '/stok/barang-masuk/{barangMasuk}'
 */
update.patch = (args: { barangMasuk: number | { id: number } } | [barangMasuk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\IncomingStockController::update
 * @see app/Http/Controllers/IncomingStockController.php:150
 * @route '/stok/barang-masuk/{barangMasuk}'
 */
    const updateForm = (args: { barangMasuk: number | { id: number } } | [barangMasuk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\IncomingStockController::update
 * @see app/Http/Controllers/IncomingStockController.php:150
 * @route '/stok/barang-masuk/{barangMasuk}'
 */
        updateForm.put = (args: { barangMasuk: number | { id: number } } | [barangMasuk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\IncomingStockController::update
 * @see app/Http/Controllers/IncomingStockController.php:150
 * @route '/stok/barang-masuk/{barangMasuk}'
 */
        updateForm.patch = (args: { barangMasuk: number | { id: number } } | [barangMasuk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\IncomingStockController::destroy
 * @see app/Http/Controllers/IncomingStockController.php:170
 * @route '/stok/barang-masuk/{barangMasuk}'
 */
export const destroy = (args: { barangMasuk: number | { id: number } } | [barangMasuk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/stok/barang-masuk/{barangMasuk}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\IncomingStockController::destroy
 * @see app/Http/Controllers/IncomingStockController.php:170
 * @route '/stok/barang-masuk/{barangMasuk}'
 */
destroy.url = (args: { barangMasuk: number | { id: number } } | [barangMasuk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { barangMasuk: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { barangMasuk: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    barangMasuk: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        barangMasuk: typeof args.barangMasuk === 'object'
                ? args.barangMasuk.id
                : args.barangMasuk,
                }

    return destroy.definition.url
            .replace('{barangMasuk}', parsedArgs.barangMasuk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IncomingStockController::destroy
 * @see app/Http/Controllers/IncomingStockController.php:170
 * @route '/stok/barang-masuk/{barangMasuk}'
 */
destroy.delete = (args: { barangMasuk: number | { id: number } } | [barangMasuk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\IncomingStockController::destroy
 * @see app/Http/Controllers/IncomingStockController.php:170
 * @route '/stok/barang-masuk/{barangMasuk}'
 */
    const destroyForm = (args: { barangMasuk: number | { id: number } } | [barangMasuk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\IncomingStockController::destroy
 * @see app/Http/Controllers/IncomingStockController.php:170
 * @route '/stok/barang-masuk/{barangMasuk}'
 */
        destroyForm.delete = (args: { barangMasuk: number | { id: number } } | [barangMasuk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\IncomingStockController::exportMethod
 * @see app/Http/Controllers/IncomingStockController.php:189
 * @route '/stok/barang-masuk/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/stok/barang-masuk/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IncomingStockController::exportMethod
 * @see app/Http/Controllers/IncomingStockController.php:189
 * @route '/stok/barang-masuk/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IncomingStockController::exportMethod
 * @see app/Http/Controllers/IncomingStockController.php:189
 * @route '/stok/barang-masuk/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\IncomingStockController::exportMethod
 * @see app/Http/Controllers/IncomingStockController.php:189
 * @route '/stok/barang-masuk/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\IncomingStockController::exportMethod
 * @see app/Http/Controllers/IncomingStockController.php:189
 * @route '/stok/barang-masuk/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\IncomingStockController::exportMethod
 * @see app/Http/Controllers/IncomingStockController.php:189
 * @route '/stok/barang-masuk/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\IncomingStockController::exportMethod
 * @see app/Http/Controllers/IncomingStockController.php:189
 * @route '/stok/barang-masuk/export'
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
const IncomingStockController = { index, create, store, show, edit, update, destroy, exportMethod, export: exportMethod }

export default IncomingStockController