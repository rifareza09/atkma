import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import inventory from './inventory'
import transactions from './transactions'
import stockMovements from './stock-movements'
/**
* @see \App\Http\Controllers\ReportController::kartuStok
 * @see app/Http/Controllers/ReportController.php:134
 * @route '/reports/kartu-stok/{barang}'
 */
export const kartuStok = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kartuStok.url(args, options),
    method: 'get',
})

kartuStok.definition = {
    methods: ["get","head"],
    url: '/reports/kartu-stok/{barang}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::kartuStok
 * @see app/Http/Controllers/ReportController.php:134
 * @route '/reports/kartu-stok/{barang}'
 */
kartuStok.url = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return kartuStok.definition.url
            .replace('{barang}', parsedArgs.barang.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::kartuStok
 * @see app/Http/Controllers/ReportController.php:134
 * @route '/reports/kartu-stok/{barang}'
 */
kartuStok.get = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kartuStok.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::kartuStok
 * @see app/Http/Controllers/ReportController.php:134
 * @route '/reports/kartu-stok/{barang}'
 */
kartuStok.head = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kartuStok.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReportController::kartuStok
 * @see app/Http/Controllers/ReportController.php:134
 * @route '/reports/kartu-stok/{barang}'
 */
    const kartuStokForm = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: kartuStok.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReportController::kartuStok
 * @see app/Http/Controllers/ReportController.php:134
 * @route '/reports/kartu-stok/{barang}'
 */
        kartuStokForm.get = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: kartuStok.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReportController::kartuStok
 * @see app/Http/Controllers/ReportController.php:134
 * @route '/reports/kartu-stok/{barang}'
 */
        kartuStokForm.head = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: kartuStok.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    kartuStok.form = kartuStokForm
const reports = {
    inventory: Object.assign(inventory, inventory),
kartuStok: Object.assign(kartuStok, kartuStok),
transactions: Object.assign(transactions, transactions),
stockMovements: Object.assign(stockMovements, stockMovements),
}

export default reports