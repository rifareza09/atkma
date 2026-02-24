import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TransactionController::index
 * @see app/Http/Controllers/TransactionController.php:30
 * @route '/transaksi/permintaan'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/transaksi/permintaan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TransactionController::index
 * @see app/Http/Controllers/TransactionController.php:30
 * @route '/transaksi/permintaan'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TransactionController::index
 * @see app/Http/Controllers/TransactionController.php:30
 * @route '/transaksi/permintaan'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TransactionController::index
 * @see app/Http/Controllers/TransactionController.php:30
 * @route '/transaksi/permintaan'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TransactionController::index
 * @see app/Http/Controllers/TransactionController.php:30
 * @route '/transaksi/permintaan'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TransactionController::index
 * @see app/Http/Controllers/TransactionController.php:30
 * @route '/transaksi/permintaan'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TransactionController::index
 * @see app/Http/Controllers/TransactionController.php:30
 * @route '/transaksi/permintaan'
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
* @see \App\Http\Controllers\TransactionController::create
 * @see app/Http/Controllers/TransactionController.php:62
 * @route '/transaksi/permintaan/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/transaksi/permintaan/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TransactionController::create
 * @see app/Http/Controllers/TransactionController.php:62
 * @route '/transaksi/permintaan/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TransactionController::create
 * @see app/Http/Controllers/TransactionController.php:62
 * @route '/transaksi/permintaan/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TransactionController::create
 * @see app/Http/Controllers/TransactionController.php:62
 * @route '/transaksi/permintaan/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TransactionController::create
 * @see app/Http/Controllers/TransactionController.php:62
 * @route '/transaksi/permintaan/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TransactionController::create
 * @see app/Http/Controllers/TransactionController.php:62
 * @route '/transaksi/permintaan/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TransactionController::create
 * @see app/Http/Controllers/TransactionController.php:62
 * @route '/transaksi/permintaan/create'
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
* @see \App\Http\Controllers\TransactionController::store
 * @see app/Http/Controllers/TransactionController.php:87
 * @route '/transaksi/permintaan'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/transaksi/permintaan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TransactionController::store
 * @see app/Http/Controllers/TransactionController.php:87
 * @route '/transaksi/permintaan'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TransactionController::store
 * @see app/Http/Controllers/TransactionController.php:87
 * @route '/transaksi/permintaan'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TransactionController::store
 * @see app/Http/Controllers/TransactionController.php:87
 * @route '/transaksi/permintaan'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TransactionController::store
 * @see app/Http/Controllers/TransactionController.php:87
 * @route '/transaksi/permintaan'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\TransactionController::show
 * @see app/Http/Controllers/TransactionController.php:118
 * @route '/transaksi/permintaan/{permintaan}'
 */
export const show = (args: { permintaan: number | { id: number } } | [permintaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/transaksi/permintaan/{permintaan}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TransactionController::show
 * @see app/Http/Controllers/TransactionController.php:118
 * @route '/transaksi/permintaan/{permintaan}'
 */
show.url = (args: { permintaan: number | { id: number } } | [permintaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permintaan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { permintaan: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    permintaan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        permintaan: typeof args.permintaan === 'object'
                ? args.permintaan.id
                : args.permintaan,
                }

    return show.definition.url
            .replace('{permintaan}', parsedArgs.permintaan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TransactionController::show
 * @see app/Http/Controllers/TransactionController.php:118
 * @route '/transaksi/permintaan/{permintaan}'
 */
show.get = (args: { permintaan: number | { id: number } } | [permintaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TransactionController::show
 * @see app/Http/Controllers/TransactionController.php:118
 * @route '/transaksi/permintaan/{permintaan}'
 */
show.head = (args: { permintaan: number | { id: number } } | [permintaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TransactionController::show
 * @see app/Http/Controllers/TransactionController.php:118
 * @route '/transaksi/permintaan/{permintaan}'
 */
    const showForm = (args: { permintaan: number | { id: number } } | [permintaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TransactionController::show
 * @see app/Http/Controllers/TransactionController.php:118
 * @route '/transaksi/permintaan/{permintaan}'
 */
        showForm.get = (args: { permintaan: number | { id: number } } | [permintaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TransactionController::show
 * @see app/Http/Controllers/TransactionController.php:118
 * @route '/transaksi/permintaan/{permintaan}'
 */
        showForm.head = (args: { permintaan: number | { id: number } } | [permintaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\TransactionController::edit
 * @see app/Http/Controllers/TransactionController.php:164
 * @route '/transaksi/permintaan/{permintaan}/edit'
 */
export const edit = (args: { permintaan: number | { id: number } } | [permintaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/transaksi/permintaan/{permintaan}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TransactionController::edit
 * @see app/Http/Controllers/TransactionController.php:164
 * @route '/transaksi/permintaan/{permintaan}/edit'
 */
edit.url = (args: { permintaan: number | { id: number } } | [permintaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permintaan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { permintaan: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    permintaan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        permintaan: typeof args.permintaan === 'object'
                ? args.permintaan.id
                : args.permintaan,
                }

    return edit.definition.url
            .replace('{permintaan}', parsedArgs.permintaan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TransactionController::edit
 * @see app/Http/Controllers/TransactionController.php:164
 * @route '/transaksi/permintaan/{permintaan}/edit'
 */
edit.get = (args: { permintaan: number | { id: number } } | [permintaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TransactionController::edit
 * @see app/Http/Controllers/TransactionController.php:164
 * @route '/transaksi/permintaan/{permintaan}/edit'
 */
edit.head = (args: { permintaan: number | { id: number } } | [permintaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TransactionController::edit
 * @see app/Http/Controllers/TransactionController.php:164
 * @route '/transaksi/permintaan/{permintaan}/edit'
 */
    const editForm = (args: { permintaan: number | { id: number } } | [permintaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TransactionController::edit
 * @see app/Http/Controllers/TransactionController.php:164
 * @route '/transaksi/permintaan/{permintaan}/edit'
 */
        editForm.get = (args: { permintaan: number | { id: number } } | [permintaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TransactionController::edit
 * @see app/Http/Controllers/TransactionController.php:164
 * @route '/transaksi/permintaan/{permintaan}/edit'
 */
        editForm.head = (args: { permintaan: number | { id: number } } | [permintaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\TransactionController::update
 * @see app/Http/Controllers/TransactionController.php:177
 * @route '/transaksi/permintaan/{permintaan}'
 */
export const update = (args: { permintaan: number | { id: number } } | [permintaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/transaksi/permintaan/{permintaan}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\TransactionController::update
 * @see app/Http/Controllers/TransactionController.php:177
 * @route '/transaksi/permintaan/{permintaan}'
 */
update.url = (args: { permintaan: number | { id: number } } | [permintaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permintaan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { permintaan: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    permintaan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        permintaan: typeof args.permintaan === 'object'
                ? args.permintaan.id
                : args.permintaan,
                }

    return update.definition.url
            .replace('{permintaan}', parsedArgs.permintaan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TransactionController::update
 * @see app/Http/Controllers/TransactionController.php:177
 * @route '/transaksi/permintaan/{permintaan}'
 */
update.put = (args: { permintaan: number | { id: number } } | [permintaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\TransactionController::update
 * @see app/Http/Controllers/TransactionController.php:177
 * @route '/transaksi/permintaan/{permintaan}'
 */
update.patch = (args: { permintaan: number | { id: number } } | [permintaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\TransactionController::update
 * @see app/Http/Controllers/TransactionController.php:177
 * @route '/transaksi/permintaan/{permintaan}'
 */
    const updateForm = (args: { permintaan: number | { id: number } } | [permintaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TransactionController::update
 * @see app/Http/Controllers/TransactionController.php:177
 * @route '/transaksi/permintaan/{permintaan}'
 */
        updateForm.put = (args: { permintaan: number | { id: number } } | [permintaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\TransactionController::update
 * @see app/Http/Controllers/TransactionController.php:177
 * @route '/transaksi/permintaan/{permintaan}'
 */
        updateForm.patch = (args: { permintaan: number | { id: number } } | [permintaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\TransactionController::destroy
 * @see app/Http/Controllers/TransactionController.php:191
 * @route '/transaksi/permintaan/{permintaan}'
 */
export const destroy = (args: { permintaan: number | { id: number } } | [permintaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/transaksi/permintaan/{permintaan}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TransactionController::destroy
 * @see app/Http/Controllers/TransactionController.php:191
 * @route '/transaksi/permintaan/{permintaan}'
 */
destroy.url = (args: { permintaan: number | { id: number } } | [permintaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permintaan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { permintaan: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    permintaan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        permintaan: typeof args.permintaan === 'object'
                ? args.permintaan.id
                : args.permintaan,
                }

    return destroy.definition.url
            .replace('{permintaan}', parsedArgs.permintaan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TransactionController::destroy
 * @see app/Http/Controllers/TransactionController.php:191
 * @route '/transaksi/permintaan/{permintaan}'
 */
destroy.delete = (args: { permintaan: number | { id: number } } | [permintaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\TransactionController::destroy
 * @see app/Http/Controllers/TransactionController.php:191
 * @route '/transaksi/permintaan/{permintaan}'
 */
    const destroyForm = (args: { permintaan: number | { id: number } } | [permintaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TransactionController::destroy
 * @see app/Http/Controllers/TransactionController.php:191
 * @route '/transaksi/permintaan/{permintaan}'
 */
        destroyForm.delete = (args: { permintaan: number | { id: number } } | [permintaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\TransactionController::exportExcel
 * @see app/Http/Controllers/TransactionController.php:212
 * @route '/transaksi/permintaan-export/excel'
 */
export const exportExcel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportExcel.url(options),
    method: 'get',
})

exportExcel.definition = {
    methods: ["get","head"],
    url: '/transaksi/permintaan-export/excel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TransactionController::exportExcel
 * @see app/Http/Controllers/TransactionController.php:212
 * @route '/transaksi/permintaan-export/excel'
 */
exportExcel.url = (options?: RouteQueryOptions) => {
    return exportExcel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TransactionController::exportExcel
 * @see app/Http/Controllers/TransactionController.php:212
 * @route '/transaksi/permintaan-export/excel'
 */
exportExcel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportExcel.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TransactionController::exportExcel
 * @see app/Http/Controllers/TransactionController.php:212
 * @route '/transaksi/permintaan-export/excel'
 */
exportExcel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportExcel.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TransactionController::exportExcel
 * @see app/Http/Controllers/TransactionController.php:212
 * @route '/transaksi/permintaan-export/excel'
 */
    const exportExcelForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportExcel.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TransactionController::exportExcel
 * @see app/Http/Controllers/TransactionController.php:212
 * @route '/transaksi/permintaan-export/excel'
 */
        exportExcelForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportExcel.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TransactionController::exportExcel
 * @see app/Http/Controllers/TransactionController.php:212
 * @route '/transaksi/permintaan-export/excel'
 */
        exportExcelForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportExcel.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportExcel.form = exportExcelForm
/**
* @see \App\Http\Controllers\TransactionController::exportPdf
 * @see app/Http/Controllers/TransactionController.php:224
 * @route '/transaksi/permintaan-export/pdf'
 */
export const exportPdf = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportPdf.url(options),
    method: 'get',
})

exportPdf.definition = {
    methods: ["get","head"],
    url: '/transaksi/permintaan-export/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TransactionController::exportPdf
 * @see app/Http/Controllers/TransactionController.php:224
 * @route '/transaksi/permintaan-export/pdf'
 */
exportPdf.url = (options?: RouteQueryOptions) => {
    return exportPdf.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TransactionController::exportPdf
 * @see app/Http/Controllers/TransactionController.php:224
 * @route '/transaksi/permintaan-export/pdf'
 */
exportPdf.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportPdf.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TransactionController::exportPdf
 * @see app/Http/Controllers/TransactionController.php:224
 * @route '/transaksi/permintaan-export/pdf'
 */
exportPdf.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportPdf.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TransactionController::exportPdf
 * @see app/Http/Controllers/TransactionController.php:224
 * @route '/transaksi/permintaan-export/pdf'
 */
    const exportPdfForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportPdf.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TransactionController::exportPdf
 * @see app/Http/Controllers/TransactionController.php:224
 * @route '/transaksi/permintaan-export/pdf'
 */
        exportPdfForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportPdf.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TransactionController::exportPdf
 * @see app/Http/Controllers/TransactionController.php:224
 * @route '/transaksi/permintaan-export/pdf'
 */
        exportPdfForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportPdf.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportPdf.form = exportPdfForm
const TransactionController = { index, create, store, show, edit, update, destroy, exportExcel, exportPdf }

export default TransactionController