import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import bulanB7a1d5 from './bulan'
/**
* @see \App\Http\Controllers\ReportController::bulan
 * @see app/Http/Controllers/ReportController.php:234
 * @route '/laporan/barang/{barang}/bulan'
 */
export const bulan = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bulan.url(args, options),
    method: 'get',
})

bulan.definition = {
    methods: ["get","head"],
    url: '/laporan/barang/{barang}/bulan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::bulan
 * @see app/Http/Controllers/ReportController.php:234
 * @route '/laporan/barang/{barang}/bulan'
 */
bulan.url = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return bulan.definition.url
            .replace('{barang}', parsedArgs.barang.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::bulan
 * @see app/Http/Controllers/ReportController.php:234
 * @route '/laporan/barang/{barang}/bulan'
 */
bulan.get = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bulan.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::bulan
 * @see app/Http/Controllers/ReportController.php:234
 * @route '/laporan/barang/{barang}/bulan'
 */
bulan.head = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bulan.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReportController::bulan
 * @see app/Http/Controllers/ReportController.php:234
 * @route '/laporan/barang/{barang}/bulan'
 */
    const bulanForm = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: bulan.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReportController::bulan
 * @see app/Http/Controllers/ReportController.php:234
 * @route '/laporan/barang/{barang}/bulan'
 */
        bulanForm.get = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bulan.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReportController::bulan
 * @see app/Http/Controllers/ReportController.php:234
 * @route '/laporan/barang/{barang}/bulan'
 */
        bulanForm.head = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bulan.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    bulan.form = bulanForm
/**
* @see \App\Http\Controllers\ReportController::exportPdf
 * @see app/Http/Controllers/ReportController.php:287
 * @route '/laporan/barang/{barang}/export-pdf'
 */
export const exportPdf = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportPdf.url(args, options),
    method: 'get',
})

exportPdf.definition = {
    methods: ["get","head"],
    url: '/laporan/barang/{barang}/export-pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::exportPdf
 * @see app/Http/Controllers/ReportController.php:287
 * @route '/laporan/barang/{barang}/export-pdf'
 */
exportPdf.url = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return exportPdf.definition.url
            .replace('{barang}', parsedArgs.barang.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::exportPdf
 * @see app/Http/Controllers/ReportController.php:287
 * @route '/laporan/barang/{barang}/export-pdf'
 */
exportPdf.get = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportPdf.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::exportPdf
 * @see app/Http/Controllers/ReportController.php:287
 * @route '/laporan/barang/{barang}/export-pdf'
 */
exportPdf.head = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportPdf.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReportController::exportPdf
 * @see app/Http/Controllers/ReportController.php:287
 * @route '/laporan/barang/{barang}/export-pdf'
 */
    const exportPdfForm = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportPdf.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReportController::exportPdf
 * @see app/Http/Controllers/ReportController.php:287
 * @route '/laporan/barang/{barang}/export-pdf'
 */
        exportPdfForm.get = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportPdf.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReportController::exportPdf
 * @see app/Http/Controllers/ReportController.php:287
 * @route '/laporan/barang/{barang}/export-pdf'
 */
        exportPdfForm.head = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportPdf.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportPdf.form = exportPdfForm
const barang = {
    bulan: Object.assign(bulan, bulanB7a1d5),
exportPdf: Object.assign(exportPdf, exportPdf),
}

export default barang