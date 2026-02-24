import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ReportController::excel
 * @see app/Http/Controllers/ReportController.php:221
 * @route '/reports/stock-movements/excel'
 */
export const excel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: excel.url(options),
    method: 'get',
})

excel.definition = {
    methods: ["get","head"],
    url: '/reports/stock-movements/excel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::excel
 * @see app/Http/Controllers/ReportController.php:221
 * @route '/reports/stock-movements/excel'
 */
excel.url = (options?: RouteQueryOptions) => {
    return excel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::excel
 * @see app/Http/Controllers/ReportController.php:221
 * @route '/reports/stock-movements/excel'
 */
excel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: excel.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::excel
 * @see app/Http/Controllers/ReportController.php:221
 * @route '/reports/stock-movements/excel'
 */
excel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: excel.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReportController::excel
 * @see app/Http/Controllers/ReportController.php:221
 * @route '/reports/stock-movements/excel'
 */
    const excelForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: excel.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReportController::excel
 * @see app/Http/Controllers/ReportController.php:221
 * @route '/reports/stock-movements/excel'
 */
        excelForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: excel.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReportController::excel
 * @see app/Http/Controllers/ReportController.php:221
 * @route '/reports/stock-movements/excel'
 */
        excelForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: excel.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    excel.form = excelForm
const stockMovements = {
    excel: Object.assign(excel, excel),
}

export default stockMovements