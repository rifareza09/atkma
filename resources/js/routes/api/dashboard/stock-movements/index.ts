import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DashboardController::today
 * @see app/Http/Controllers/DashboardController.php:191
 * @route '/api/dashboard/stock-movements/today'
 */
export const today = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: today.url(options),
    method: 'get',
})

today.definition = {
    methods: ["get","head"],
    url: '/api/dashboard/stock-movements/today',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::today
 * @see app/Http/Controllers/DashboardController.php:191
 * @route '/api/dashboard/stock-movements/today'
 */
today.url = (options?: RouteQueryOptions) => {
    return today.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::today
 * @see app/Http/Controllers/DashboardController.php:191
 * @route '/api/dashboard/stock-movements/today'
 */
today.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: today.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::today
 * @see app/Http/Controllers/DashboardController.php:191
 * @route '/api/dashboard/stock-movements/today'
 */
today.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: today.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::today
 * @see app/Http/Controllers/DashboardController.php:191
 * @route '/api/dashboard/stock-movements/today'
 */
    const todayForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: today.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::today
 * @see app/Http/Controllers/DashboardController.php:191
 * @route '/api/dashboard/stock-movements/today'
 */
        todayForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: today.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::today
 * @see app/Http/Controllers/DashboardController.php:191
 * @route '/api/dashboard/stock-movements/today'
 */
        todayForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: today.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    today.form = todayForm
const stockMovements = {
    today: Object.assign(today, today),
}

export default stockMovements