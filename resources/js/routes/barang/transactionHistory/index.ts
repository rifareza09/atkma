import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\BarangController::exportMethod
 * @see app/Http/Controllers/BarangController.php:260
 * @route '/master/barang/{barang}/transaction-history/export'
 */
export const exportMethod = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/master/barang/{barang}/transaction-history/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BarangController::exportMethod
 * @see app/Http/Controllers/BarangController.php:260
 * @route '/master/barang/{barang}/transaction-history/export'
 */
exportMethod.url = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return exportMethod.definition.url
            .replace('{barang}', parsedArgs.barang.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BarangController::exportMethod
 * @see app/Http/Controllers/BarangController.php:260
 * @route '/master/barang/{barang}/transaction-history/export'
 */
exportMethod.get = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BarangController::exportMethod
 * @see app/Http/Controllers/BarangController.php:260
 * @route '/master/barang/{barang}/transaction-history/export'
 */
exportMethod.head = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BarangController::exportMethod
 * @see app/Http/Controllers/BarangController.php:260
 * @route '/master/barang/{barang}/transaction-history/export'
 */
    const exportMethodForm = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BarangController::exportMethod
 * @see app/Http/Controllers/BarangController.php:260
 * @route '/master/barang/{barang}/transaction-history/export'
 */
        exportMethodForm.get = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BarangController::exportMethod
 * @see app/Http/Controllers/BarangController.php:260
 * @route '/master/barang/{barang}/transaction-history/export'
 */
        exportMethodForm.head = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod.form = exportMethodForm
const transactionHistory = {
    export: Object.assign(exportMethod, exportMethod),
}

export default transactionHistory