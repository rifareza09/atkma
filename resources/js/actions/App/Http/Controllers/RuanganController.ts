import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RuanganController::index
 * @see app/Http/Controllers/RuanganController.php:20
 * @route '/master/ruangan'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/master/ruangan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RuanganController::index
 * @see app/Http/Controllers/RuanganController.php:20
 * @route '/master/ruangan'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RuanganController::index
 * @see app/Http/Controllers/RuanganController.php:20
 * @route '/master/ruangan'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RuanganController::index
 * @see app/Http/Controllers/RuanganController.php:20
 * @route '/master/ruangan'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RuanganController::index
 * @see app/Http/Controllers/RuanganController.php:20
 * @route '/master/ruangan'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RuanganController::index
 * @see app/Http/Controllers/RuanganController.php:20
 * @route '/master/ruangan'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RuanganController::index
 * @see app/Http/Controllers/RuanganController.php:20
 * @route '/master/ruangan'
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
* @see \App\Http\Controllers\RuanganController::create
 * @see app/Http/Controllers/RuanganController.php:57
 * @route '/master/ruangan/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/master/ruangan/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RuanganController::create
 * @see app/Http/Controllers/RuanganController.php:57
 * @route '/master/ruangan/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RuanganController::create
 * @see app/Http/Controllers/RuanganController.php:57
 * @route '/master/ruangan/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RuanganController::create
 * @see app/Http/Controllers/RuanganController.php:57
 * @route '/master/ruangan/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RuanganController::create
 * @see app/Http/Controllers/RuanganController.php:57
 * @route '/master/ruangan/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RuanganController::create
 * @see app/Http/Controllers/RuanganController.php:57
 * @route '/master/ruangan/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RuanganController::create
 * @see app/Http/Controllers/RuanganController.php:57
 * @route '/master/ruangan/create'
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
* @see \App\Http\Controllers\RuanganController::store
 * @see app/Http/Controllers/RuanganController.php:67
 * @route '/master/ruangan'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/master/ruangan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RuanganController::store
 * @see app/Http/Controllers/RuanganController.php:67
 * @route '/master/ruangan'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RuanganController::store
 * @see app/Http/Controllers/RuanganController.php:67
 * @route '/master/ruangan'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RuanganController::store
 * @see app/Http/Controllers/RuanganController.php:67
 * @route '/master/ruangan'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RuanganController::store
 * @see app/Http/Controllers/RuanganController.php:67
 * @route '/master/ruangan'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\RuanganController::show
 * @see app/Http/Controllers/RuanganController.php:80
 * @route '/master/ruangan/{ruangan}'
 */
export const show = (args: { ruangan: number | { id: number } } | [ruangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/master/ruangan/{ruangan}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RuanganController::show
 * @see app/Http/Controllers/RuanganController.php:80
 * @route '/master/ruangan/{ruangan}'
 */
show.url = (args: { ruangan: number | { id: number } } | [ruangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ruangan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { ruangan: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    ruangan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ruangan: typeof args.ruangan === 'object'
                ? args.ruangan.id
                : args.ruangan,
                }

    return show.definition.url
            .replace('{ruangan}', parsedArgs.ruangan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RuanganController::show
 * @see app/Http/Controllers/RuanganController.php:80
 * @route '/master/ruangan/{ruangan}'
 */
show.get = (args: { ruangan: number | { id: number } } | [ruangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RuanganController::show
 * @see app/Http/Controllers/RuanganController.php:80
 * @route '/master/ruangan/{ruangan}'
 */
show.head = (args: { ruangan: number | { id: number } } | [ruangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RuanganController::show
 * @see app/Http/Controllers/RuanganController.php:80
 * @route '/master/ruangan/{ruangan}'
 */
    const showForm = (args: { ruangan: number | { id: number } } | [ruangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RuanganController::show
 * @see app/Http/Controllers/RuanganController.php:80
 * @route '/master/ruangan/{ruangan}'
 */
        showForm.get = (args: { ruangan: number | { id: number } } | [ruangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RuanganController::show
 * @see app/Http/Controllers/RuanganController.php:80
 * @route '/master/ruangan/{ruangan}'
 */
        showForm.head = (args: { ruangan: number | { id: number } } | [ruangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\RuanganController::edit
 * @see app/Http/Controllers/RuanganController.php:96
 * @route '/master/ruangan/{ruangan}/edit'
 */
export const edit = (args: { ruangan: number | { id: number } } | [ruangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/master/ruangan/{ruangan}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RuanganController::edit
 * @see app/Http/Controllers/RuanganController.php:96
 * @route '/master/ruangan/{ruangan}/edit'
 */
edit.url = (args: { ruangan: number | { id: number } } | [ruangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ruangan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { ruangan: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    ruangan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ruangan: typeof args.ruangan === 'object'
                ? args.ruangan.id
                : args.ruangan,
                }

    return edit.definition.url
            .replace('{ruangan}', parsedArgs.ruangan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RuanganController::edit
 * @see app/Http/Controllers/RuanganController.php:96
 * @route '/master/ruangan/{ruangan}/edit'
 */
edit.get = (args: { ruangan: number | { id: number } } | [ruangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RuanganController::edit
 * @see app/Http/Controllers/RuanganController.php:96
 * @route '/master/ruangan/{ruangan}/edit'
 */
edit.head = (args: { ruangan: number | { id: number } } | [ruangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RuanganController::edit
 * @see app/Http/Controllers/RuanganController.php:96
 * @route '/master/ruangan/{ruangan}/edit'
 */
    const editForm = (args: { ruangan: number | { id: number } } | [ruangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RuanganController::edit
 * @see app/Http/Controllers/RuanganController.php:96
 * @route '/master/ruangan/{ruangan}/edit'
 */
        editForm.get = (args: { ruangan: number | { id: number } } | [ruangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RuanganController::edit
 * @see app/Http/Controllers/RuanganController.php:96
 * @route '/master/ruangan/{ruangan}/edit'
 */
        editForm.head = (args: { ruangan: number | { id: number } } | [ruangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\RuanganController::update
 * @see app/Http/Controllers/RuanganController.php:108
 * @route '/master/ruangan/{ruangan}'
 */
export const update = (args: { ruangan: number | { id: number } } | [ruangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/master/ruangan/{ruangan}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\RuanganController::update
 * @see app/Http/Controllers/RuanganController.php:108
 * @route '/master/ruangan/{ruangan}'
 */
update.url = (args: { ruangan: number | { id: number } } | [ruangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ruangan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { ruangan: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    ruangan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ruangan: typeof args.ruangan === 'object'
                ? args.ruangan.id
                : args.ruangan,
                }

    return update.definition.url
            .replace('{ruangan}', parsedArgs.ruangan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RuanganController::update
 * @see app/Http/Controllers/RuanganController.php:108
 * @route '/master/ruangan/{ruangan}'
 */
update.put = (args: { ruangan: number | { id: number } } | [ruangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\RuanganController::update
 * @see app/Http/Controllers/RuanganController.php:108
 * @route '/master/ruangan/{ruangan}'
 */
update.patch = (args: { ruangan: number | { id: number } } | [ruangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\RuanganController::update
 * @see app/Http/Controllers/RuanganController.php:108
 * @route '/master/ruangan/{ruangan}'
 */
    const updateForm = (args: { ruangan: number | { id: number } } | [ruangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RuanganController::update
 * @see app/Http/Controllers/RuanganController.php:108
 * @route '/master/ruangan/{ruangan}'
 */
        updateForm.put = (args: { ruangan: number | { id: number } } | [ruangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\RuanganController::update
 * @see app/Http/Controllers/RuanganController.php:108
 * @route '/master/ruangan/{ruangan}'
 */
        updateForm.patch = (args: { ruangan: number | { id: number } } | [ruangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\RuanganController::destroy
 * @see app/Http/Controllers/RuanganController.php:121
 * @route '/master/ruangan/{ruangan}'
 */
export const destroy = (args: { ruangan: number | { id: number } } | [ruangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/master/ruangan/{ruangan}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RuanganController::destroy
 * @see app/Http/Controllers/RuanganController.php:121
 * @route '/master/ruangan/{ruangan}'
 */
destroy.url = (args: { ruangan: number | { id: number } } | [ruangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ruangan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { ruangan: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    ruangan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ruangan: typeof args.ruangan === 'object'
                ? args.ruangan.id
                : args.ruangan,
                }

    return destroy.definition.url
            .replace('{ruangan}', parsedArgs.ruangan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RuanganController::destroy
 * @see app/Http/Controllers/RuanganController.php:121
 * @route '/master/ruangan/{ruangan}'
 */
destroy.delete = (args: { ruangan: number | { id: number } } | [ruangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\RuanganController::destroy
 * @see app/Http/Controllers/RuanganController.php:121
 * @route '/master/ruangan/{ruangan}'
 */
    const destroyForm = (args: { ruangan: number | { id: number } } | [ruangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RuanganController::destroy
 * @see app/Http/Controllers/RuanganController.php:121
 * @route '/master/ruangan/{ruangan}'
 */
        destroyForm.delete = (args: { ruangan: number | { id: number } } | [ruangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const RuanganController = { index, create, store, show, edit, update, destroy }

export default RuanganController