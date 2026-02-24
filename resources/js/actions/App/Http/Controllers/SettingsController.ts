import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SettingsController::index
 * @see app/Http/Controllers/SettingsController.php:19
 * @route '/settings'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingsController::index
 * @see app/Http/Controllers/SettingsController.php:19
 * @route '/settings'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingsController::index
 * @see app/Http/Controllers/SettingsController.php:19
 * @route '/settings'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SettingsController::index
 * @see app/Http/Controllers/SettingsController.php:19
 * @route '/settings'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SettingsController::index
 * @see app/Http/Controllers/SettingsController.php:19
 * @route '/settings'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SettingsController::index
 * @see app/Http/Controllers/SettingsController.php:19
 * @route '/settings'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SettingsController::index
 * @see app/Http/Controllers/SettingsController.php:19
 * @route '/settings'
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
* @see \App\Http\Controllers\SettingsController::update
 * @see app/Http/Controllers/SettingsController.php:33
 * @route '/settings'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/settings',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SettingsController::update
 * @see app/Http/Controllers/SettingsController.php:33
 * @route '/settings'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingsController::update
 * @see app/Http/Controllers/SettingsController.php:33
 * @route '/settings'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\SettingsController::update
 * @see app/Http/Controllers/SettingsController.php:33
 * @route '/settings'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingsController::update
 * @see app/Http/Controllers/SettingsController.php:33
 * @route '/settings'
 */
        updateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\SettingsController::clearCache
 * @see app/Http/Controllers/SettingsController.php:100
 * @route '/settings/clear-cache'
 */
export const clearCache = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: clearCache.url(options),
    method: 'post',
})

clearCache.definition = {
    methods: ["post"],
    url: '/settings/clear-cache',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SettingsController::clearCache
 * @see app/Http/Controllers/SettingsController.php:100
 * @route '/settings/clear-cache'
 */
clearCache.url = (options?: RouteQueryOptions) => {
    return clearCache.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingsController::clearCache
 * @see app/Http/Controllers/SettingsController.php:100
 * @route '/settings/clear-cache'
 */
clearCache.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: clearCache.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SettingsController::clearCache
 * @see app/Http/Controllers/SettingsController.php:100
 * @route '/settings/clear-cache'
 */
    const clearCacheForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: clearCache.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingsController::clearCache
 * @see app/Http/Controllers/SettingsController.php:100
 * @route '/settings/clear-cache'
 */
        clearCacheForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: clearCache.url(options),
            method: 'post',
        })
    
    clearCache.form = clearCacheForm
/**
* @see \App\Http\Controllers\SettingsController::testEmail
 * @see app/Http/Controllers/SettingsController.php:124
 * @route '/settings/test-email'
 */
export const testEmail = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: testEmail.url(options),
    method: 'post',
})

testEmail.definition = {
    methods: ["post"],
    url: '/settings/test-email',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SettingsController::testEmail
 * @see app/Http/Controllers/SettingsController.php:124
 * @route '/settings/test-email'
 */
testEmail.url = (options?: RouteQueryOptions) => {
    return testEmail.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingsController::testEmail
 * @see app/Http/Controllers/SettingsController.php:124
 * @route '/settings/test-email'
 */
testEmail.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: testEmail.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SettingsController::testEmail
 * @see app/Http/Controllers/SettingsController.php:124
 * @route '/settings/test-email'
 */
    const testEmailForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: testEmail.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingsController::testEmail
 * @see app/Http/Controllers/SettingsController.php:124
 * @route '/settings/test-email'
 */
        testEmailForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: testEmail.url(options),
            method: 'post',
        })
    
    testEmail.form = testEmailForm
const SettingsController = { index, update, clearCache, testEmail }

export default SettingsController