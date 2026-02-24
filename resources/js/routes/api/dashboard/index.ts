import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import stockMovements from './stock-movements'
/**
* @see \App\Http\Controllers\DashboardController::lowStock
 * @see app/Http/Controllers/DashboardController.php:159
 * @route '/api/dashboard/low-stock'
 */
export const lowStock = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lowStock.url(options),
    method: 'get',
})

lowStock.definition = {
    methods: ["get","head"],
    url: '/api/dashboard/low-stock',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::lowStock
 * @see app/Http/Controllers/DashboardController.php:159
 * @route '/api/dashboard/low-stock'
 */
lowStock.url = (options?: RouteQueryOptions) => {
    return lowStock.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::lowStock
 * @see app/Http/Controllers/DashboardController.php:159
 * @route '/api/dashboard/low-stock'
 */
lowStock.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lowStock.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::lowStock
 * @see app/Http/Controllers/DashboardController.php:159
 * @route '/api/dashboard/low-stock'
 */
lowStock.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lowStock.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::lowStock
 * @see app/Http/Controllers/DashboardController.php:159
 * @route '/api/dashboard/low-stock'
 */
    const lowStockForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: lowStock.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::lowStock
 * @see app/Http/Controllers/DashboardController.php:159
 * @route '/api/dashboard/low-stock'
 */
        lowStockForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: lowStock.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::lowStock
 * @see app/Http/Controllers/DashboardController.php:159
 * @route '/api/dashboard/low-stock'
 */
        lowStockForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: lowStock.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    lowStock.form = lowStockForm
const dashboard = {
    lowStock: Object.assign(lowStock, lowStock),
stockMovements: Object.assign(stockMovements, stockMovements),
}

export default dashboard