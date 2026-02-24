import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ReportController::detail
 * @see app/Http/Controllers/ReportController.php:244
 * @route '/laporan/barang/{barang}/bulan/{month}/{year}'
 */
export const detail = (args: { barang: number | { id: number }, month: string | number, year: string | number } | [barang: number | { id: number }, month: string | number, year: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detail.url(args, options),
    method: 'get',
})

detail.definition = {
    methods: ["get","head"],
    url: '/laporan/barang/{barang}/bulan/{month}/{year}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::detail
 * @see app/Http/Controllers/ReportController.php:244
 * @route '/laporan/barang/{barang}/bulan/{month}/{year}'
 */
detail.url = (args: { barang: number | { id: number }, month: string | number, year: string | number } | [barang: number | { id: number }, month: string | number, year: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    barang: args[0],
                    month: args[1],
                    year: args[2],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        barang: typeof args.barang === 'object'
                ? args.barang.id
                : args.barang,
                                month: args.month,
                                year: args.year,
                }

    return detail.definition.url
            .replace('{barang}', parsedArgs.barang.toString())
            .replace('{month}', parsedArgs.month.toString())
            .replace('{year}', parsedArgs.year.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::detail
 * @see app/Http/Controllers/ReportController.php:244
 * @route '/laporan/barang/{barang}/bulan/{month}/{year}'
 */
detail.get = (args: { barang: number | { id: number }, month: string | number, year: string | number } | [barang: number | { id: number }, month: string | number, year: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detail.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::detail
 * @see app/Http/Controllers/ReportController.php:244
 * @route '/laporan/barang/{barang}/bulan/{month}/{year}'
 */
detail.head = (args: { barang: number | { id: number }, month: string | number, year: string | number } | [barang: number | { id: number }, month: string | number, year: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: detail.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReportController::detail
 * @see app/Http/Controllers/ReportController.php:244
 * @route '/laporan/barang/{barang}/bulan/{month}/{year}'
 */
    const detailForm = (args: { barang: number | { id: number }, month: string | number, year: string | number } | [barang: number | { id: number }, month: string | number, year: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: detail.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReportController::detail
 * @see app/Http/Controllers/ReportController.php:244
 * @route '/laporan/barang/{barang}/bulan/{month}/{year}'
 */
        detailForm.get = (args: { barang: number | { id: number }, month: string | number, year: string | number } | [barang: number | { id: number }, month: string | number, year: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: detail.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReportController::detail
 * @see app/Http/Controllers/ReportController.php:244
 * @route '/laporan/barang/{barang}/bulan/{month}/{year}'
 */
        detailForm.head = (args: { barang: number | { id: number }, month: string | number, year: string | number } | [barang: number | { id: number }, month: string | number, year: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: detail.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    detail.form = detailForm
const bulan = {
    detail: Object.assign(detail, detail),
}

export default bulan