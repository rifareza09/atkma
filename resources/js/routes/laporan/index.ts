import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import barang from './barang'
/**
* @see \App\Http\Controllers\ReportController::inventaris
 * @see app/Http/Controllers/ReportController.php:24
 * @route '/laporan/inventaris'
 */
export const inventaris = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: inventaris.url(options),
    method: 'get',
})

inventaris.definition = {
    methods: ["get","head"],
    url: '/laporan/inventaris',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::inventaris
 * @see app/Http/Controllers/ReportController.php:24
 * @route '/laporan/inventaris'
 */
inventaris.url = (options?: RouteQueryOptions) => {
    return inventaris.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::inventaris
 * @see app/Http/Controllers/ReportController.php:24
 * @route '/laporan/inventaris'
 */
inventaris.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: inventaris.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::inventaris
 * @see app/Http/Controllers/ReportController.php:24
 * @route '/laporan/inventaris'
 */
inventaris.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: inventaris.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReportController::inventaris
 * @see app/Http/Controllers/ReportController.php:24
 * @route '/laporan/inventaris'
 */
    const inventarisForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: inventaris.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReportController::inventaris
 * @see app/Http/Controllers/ReportController.php:24
 * @route '/laporan/inventaris'
 */
        inventarisForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: inventaris.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReportController::inventaris
 * @see app/Http/Controllers/ReportController.php:24
 * @route '/laporan/inventaris'
 */
        inventarisForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: inventaris.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    inventaris.form = inventarisForm
/**
* @see \App\Http\Controllers\ReportController::transaksi
 * @see app/Http/Controllers/ReportController.php:62
 * @route '/laporan/transaksi'
 */
export const transaksi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transaksi.url(options),
    method: 'get',
})

transaksi.definition = {
    methods: ["get","head"],
    url: '/laporan/transaksi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::transaksi
 * @see app/Http/Controllers/ReportController.php:62
 * @route '/laporan/transaksi'
 */
transaksi.url = (options?: RouteQueryOptions) => {
    return transaksi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::transaksi
 * @see app/Http/Controllers/ReportController.php:62
 * @route '/laporan/transaksi'
 */
transaksi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transaksi.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::transaksi
 * @see app/Http/Controllers/ReportController.php:62
 * @route '/laporan/transaksi'
 */
transaksi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: transaksi.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReportController::transaksi
 * @see app/Http/Controllers/ReportController.php:62
 * @route '/laporan/transaksi'
 */
    const transaksiForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: transaksi.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReportController::transaksi
 * @see app/Http/Controllers/ReportController.php:62
 * @route '/laporan/transaksi'
 */
        transaksiForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: transaksi.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReportController::transaksi
 * @see app/Http/Controllers/ReportController.php:62
 * @route '/laporan/transaksi'
 */
        transaksiForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: transaksi.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    transaksi.form = transaksiForm
const laporan = {
    inventaris: Object.assign(inventaris, inventaris),
transaksi: Object.assign(transaksi, transaksi),
barang: Object.assign(barang, barang),
}

export default laporan