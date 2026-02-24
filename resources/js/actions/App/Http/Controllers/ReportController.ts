import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
/**
* @see \App\Http\Controllers\ReportController::barangBulan
 * @see app/Http/Controllers/ReportController.php:234
 * @route '/laporan/barang/{barang}/bulan'
 */
export const barangBulan = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: barangBulan.url(args, options),
    method: 'get',
})

barangBulan.definition = {
    methods: ["get","head"],
    url: '/laporan/barang/{barang}/bulan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::barangBulan
 * @see app/Http/Controllers/ReportController.php:234
 * @route '/laporan/barang/{barang}/bulan'
 */
barangBulan.url = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return barangBulan.definition.url
            .replace('{barang}', parsedArgs.barang.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::barangBulan
 * @see app/Http/Controllers/ReportController.php:234
 * @route '/laporan/barang/{barang}/bulan'
 */
barangBulan.get = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: barangBulan.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::barangBulan
 * @see app/Http/Controllers/ReportController.php:234
 * @route '/laporan/barang/{barang}/bulan'
 */
barangBulan.head = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: barangBulan.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReportController::barangBulan
 * @see app/Http/Controllers/ReportController.php:234
 * @route '/laporan/barang/{barang}/bulan'
 */
    const barangBulanForm = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: barangBulan.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReportController::barangBulan
 * @see app/Http/Controllers/ReportController.php:234
 * @route '/laporan/barang/{barang}/bulan'
 */
        barangBulanForm.get = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: barangBulan.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReportController::barangBulan
 * @see app/Http/Controllers/ReportController.php:234
 * @route '/laporan/barang/{barang}/bulan'
 */
        barangBulanForm.head = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: barangBulan.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    barangBulan.form = barangBulanForm
/**
* @see \App\Http\Controllers\ReportController::barangBulanDetail
 * @see app/Http/Controllers/ReportController.php:244
 * @route '/laporan/barang/{barang}/bulan/{month}/{year}'
 */
export const barangBulanDetail = (args: { barang: number | { id: number }, month: string | number, year: string | number } | [barang: number | { id: number }, month: string | number, year: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: barangBulanDetail.url(args, options),
    method: 'get',
})

barangBulanDetail.definition = {
    methods: ["get","head"],
    url: '/laporan/barang/{barang}/bulan/{month}/{year}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::barangBulanDetail
 * @see app/Http/Controllers/ReportController.php:244
 * @route '/laporan/barang/{barang}/bulan/{month}/{year}'
 */
barangBulanDetail.url = (args: { barang: number | { id: number }, month: string | number, year: string | number } | [barang: number | { id: number }, month: string | number, year: string | number ], options?: RouteQueryOptions) => {
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

    return barangBulanDetail.definition.url
            .replace('{barang}', parsedArgs.barang.toString())
            .replace('{month}', parsedArgs.month.toString())
            .replace('{year}', parsedArgs.year.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::barangBulanDetail
 * @see app/Http/Controllers/ReportController.php:244
 * @route '/laporan/barang/{barang}/bulan/{month}/{year}'
 */
barangBulanDetail.get = (args: { barang: number | { id: number }, month: string | number, year: string | number } | [barang: number | { id: number }, month: string | number, year: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: barangBulanDetail.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::barangBulanDetail
 * @see app/Http/Controllers/ReportController.php:244
 * @route '/laporan/barang/{barang}/bulan/{month}/{year}'
 */
barangBulanDetail.head = (args: { barang: number | { id: number }, month: string | number, year: string | number } | [barang: number | { id: number }, month: string | number, year: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: barangBulanDetail.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReportController::barangBulanDetail
 * @see app/Http/Controllers/ReportController.php:244
 * @route '/laporan/barang/{barang}/bulan/{month}/{year}'
 */
    const barangBulanDetailForm = (args: { barang: number | { id: number }, month: string | number, year: string | number } | [barang: number | { id: number }, month: string | number, year: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: barangBulanDetail.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReportController::barangBulanDetail
 * @see app/Http/Controllers/ReportController.php:244
 * @route '/laporan/barang/{barang}/bulan/{month}/{year}'
 */
        barangBulanDetailForm.get = (args: { barang: number | { id: number }, month: string | number, year: string | number } | [barang: number | { id: number }, month: string | number, year: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: barangBulanDetail.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReportController::barangBulanDetail
 * @see app/Http/Controllers/ReportController.php:244
 * @route '/laporan/barang/{barang}/bulan/{month}/{year}'
 */
        barangBulanDetailForm.head = (args: { barang: number | { id: number }, month: string | number, year: string | number } | [barang: number | { id: number }, month: string | number, year: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: barangBulanDetail.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    barangBulanDetail.form = barangBulanDetailForm
/**
* @see \App\Http\Controllers\ReportController::exportBarangBulanPdf
 * @see app/Http/Controllers/ReportController.php:287
 * @route '/laporan/barang/{barang}/export-pdf'
 */
export const exportBarangBulanPdf = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportBarangBulanPdf.url(args, options),
    method: 'get',
})

exportBarangBulanPdf.definition = {
    methods: ["get","head"],
    url: '/laporan/barang/{barang}/export-pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::exportBarangBulanPdf
 * @see app/Http/Controllers/ReportController.php:287
 * @route '/laporan/barang/{barang}/export-pdf'
 */
exportBarangBulanPdf.url = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return exportBarangBulanPdf.definition.url
            .replace('{barang}', parsedArgs.barang.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::exportBarangBulanPdf
 * @see app/Http/Controllers/ReportController.php:287
 * @route '/laporan/barang/{barang}/export-pdf'
 */
exportBarangBulanPdf.get = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportBarangBulanPdf.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::exportBarangBulanPdf
 * @see app/Http/Controllers/ReportController.php:287
 * @route '/laporan/barang/{barang}/export-pdf'
 */
exportBarangBulanPdf.head = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportBarangBulanPdf.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReportController::exportBarangBulanPdf
 * @see app/Http/Controllers/ReportController.php:287
 * @route '/laporan/barang/{barang}/export-pdf'
 */
    const exportBarangBulanPdfForm = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportBarangBulanPdf.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReportController::exportBarangBulanPdf
 * @see app/Http/Controllers/ReportController.php:287
 * @route '/laporan/barang/{barang}/export-pdf'
 */
        exportBarangBulanPdfForm.get = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportBarangBulanPdf.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReportController::exportBarangBulanPdf
 * @see app/Http/Controllers/ReportController.php:287
 * @route '/laporan/barang/{barang}/export-pdf'
 */
        exportBarangBulanPdfForm.head = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportBarangBulanPdf.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportBarangBulanPdf.form = exportBarangBulanPdfForm
/**
* @see \App\Http\Controllers\ReportController::exportInventoryPdf
 * @see app/Http/Controllers/ReportController.php:97
 * @route '/reports/inventory/pdf'
 */
export const exportInventoryPdf = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportInventoryPdf.url(options),
    method: 'get',
})

exportInventoryPdf.definition = {
    methods: ["get","head"],
    url: '/reports/inventory/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::exportInventoryPdf
 * @see app/Http/Controllers/ReportController.php:97
 * @route '/reports/inventory/pdf'
 */
exportInventoryPdf.url = (options?: RouteQueryOptions) => {
    return exportInventoryPdf.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::exportInventoryPdf
 * @see app/Http/Controllers/ReportController.php:97
 * @route '/reports/inventory/pdf'
 */
exportInventoryPdf.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportInventoryPdf.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::exportInventoryPdf
 * @see app/Http/Controllers/ReportController.php:97
 * @route '/reports/inventory/pdf'
 */
exportInventoryPdf.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportInventoryPdf.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReportController::exportInventoryPdf
 * @see app/Http/Controllers/ReportController.php:97
 * @route '/reports/inventory/pdf'
 */
    const exportInventoryPdfForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportInventoryPdf.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReportController::exportInventoryPdf
 * @see app/Http/Controllers/ReportController.php:97
 * @route '/reports/inventory/pdf'
 */
        exportInventoryPdfForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportInventoryPdf.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReportController::exportInventoryPdf
 * @see app/Http/Controllers/ReportController.php:97
 * @route '/reports/inventory/pdf'
 */
        exportInventoryPdfForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportInventoryPdf.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportInventoryPdf.form = exportInventoryPdfForm
/**
* @see \App\Http\Controllers\ReportController::exportInventoryExcel
 * @see app/Http/Controllers/ReportController.php:121
 * @route '/reports/inventory/excel'
 */
export const exportInventoryExcel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportInventoryExcel.url(options),
    method: 'get',
})

exportInventoryExcel.definition = {
    methods: ["get","head"],
    url: '/reports/inventory/excel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::exportInventoryExcel
 * @see app/Http/Controllers/ReportController.php:121
 * @route '/reports/inventory/excel'
 */
exportInventoryExcel.url = (options?: RouteQueryOptions) => {
    return exportInventoryExcel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::exportInventoryExcel
 * @see app/Http/Controllers/ReportController.php:121
 * @route '/reports/inventory/excel'
 */
exportInventoryExcel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportInventoryExcel.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::exportInventoryExcel
 * @see app/Http/Controllers/ReportController.php:121
 * @route '/reports/inventory/excel'
 */
exportInventoryExcel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportInventoryExcel.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReportController::exportInventoryExcel
 * @see app/Http/Controllers/ReportController.php:121
 * @route '/reports/inventory/excel'
 */
    const exportInventoryExcelForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportInventoryExcel.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReportController::exportInventoryExcel
 * @see app/Http/Controllers/ReportController.php:121
 * @route '/reports/inventory/excel'
 */
        exportInventoryExcelForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportInventoryExcel.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReportController::exportInventoryExcel
 * @see app/Http/Controllers/ReportController.php:121
 * @route '/reports/inventory/excel'
 */
        exportInventoryExcelForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportInventoryExcel.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportInventoryExcel.form = exportInventoryExcelForm
/**
* @see \App\Http\Controllers\ReportController::kartuStokPdf
 * @see app/Http/Controllers/ReportController.php:134
 * @route '/reports/kartu-stok/{barang}'
 */
export const kartuStokPdf = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kartuStokPdf.url(args, options),
    method: 'get',
})

kartuStokPdf.definition = {
    methods: ["get","head"],
    url: '/reports/kartu-stok/{barang}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::kartuStokPdf
 * @see app/Http/Controllers/ReportController.php:134
 * @route '/reports/kartu-stok/{barang}'
 */
kartuStokPdf.url = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return kartuStokPdf.definition.url
            .replace('{barang}', parsedArgs.barang.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::kartuStokPdf
 * @see app/Http/Controllers/ReportController.php:134
 * @route '/reports/kartu-stok/{barang}'
 */
kartuStokPdf.get = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kartuStokPdf.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::kartuStokPdf
 * @see app/Http/Controllers/ReportController.php:134
 * @route '/reports/kartu-stok/{barang}'
 */
kartuStokPdf.head = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kartuStokPdf.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReportController::kartuStokPdf
 * @see app/Http/Controllers/ReportController.php:134
 * @route '/reports/kartu-stok/{barang}'
 */
    const kartuStokPdfForm = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: kartuStokPdf.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReportController::kartuStokPdf
 * @see app/Http/Controllers/ReportController.php:134
 * @route '/reports/kartu-stok/{barang}'
 */
        kartuStokPdfForm.get = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: kartuStokPdf.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReportController::kartuStokPdf
 * @see app/Http/Controllers/ReportController.php:134
 * @route '/reports/kartu-stok/{barang}'
 */
        kartuStokPdfForm.head = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: kartuStokPdf.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    kartuStokPdf.form = kartuStokPdfForm
/**
* @see \App\Http\Controllers\ReportController::exportTransactionPdf
 * @see app/Http/Controllers/ReportController.php:164
 * @route '/reports/transactions/pdf'
 */
export const exportTransactionPdf = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportTransactionPdf.url(options),
    method: 'get',
})

exportTransactionPdf.definition = {
    methods: ["get","head"],
    url: '/reports/transactions/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::exportTransactionPdf
 * @see app/Http/Controllers/ReportController.php:164
 * @route '/reports/transactions/pdf'
 */
exportTransactionPdf.url = (options?: RouteQueryOptions) => {
    return exportTransactionPdf.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::exportTransactionPdf
 * @see app/Http/Controllers/ReportController.php:164
 * @route '/reports/transactions/pdf'
 */
exportTransactionPdf.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportTransactionPdf.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::exportTransactionPdf
 * @see app/Http/Controllers/ReportController.php:164
 * @route '/reports/transactions/pdf'
 */
exportTransactionPdf.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportTransactionPdf.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReportController::exportTransactionPdf
 * @see app/Http/Controllers/ReportController.php:164
 * @route '/reports/transactions/pdf'
 */
    const exportTransactionPdfForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportTransactionPdf.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReportController::exportTransactionPdf
 * @see app/Http/Controllers/ReportController.php:164
 * @route '/reports/transactions/pdf'
 */
        exportTransactionPdfForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportTransactionPdf.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReportController::exportTransactionPdf
 * @see app/Http/Controllers/ReportController.php:164
 * @route '/reports/transactions/pdf'
 */
        exportTransactionPdfForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportTransactionPdf.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportTransactionPdf.form = exportTransactionPdfForm
/**
* @see \App\Http\Controllers\ReportController::exportTransactionExcel
 * @see app/Http/Controllers/ReportController.php:208
 * @route '/reports/transactions/excel'
 */
export const exportTransactionExcel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportTransactionExcel.url(options),
    method: 'get',
})

exportTransactionExcel.definition = {
    methods: ["get","head"],
    url: '/reports/transactions/excel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::exportTransactionExcel
 * @see app/Http/Controllers/ReportController.php:208
 * @route '/reports/transactions/excel'
 */
exportTransactionExcel.url = (options?: RouteQueryOptions) => {
    return exportTransactionExcel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::exportTransactionExcel
 * @see app/Http/Controllers/ReportController.php:208
 * @route '/reports/transactions/excel'
 */
exportTransactionExcel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportTransactionExcel.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::exportTransactionExcel
 * @see app/Http/Controllers/ReportController.php:208
 * @route '/reports/transactions/excel'
 */
exportTransactionExcel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportTransactionExcel.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReportController::exportTransactionExcel
 * @see app/Http/Controllers/ReportController.php:208
 * @route '/reports/transactions/excel'
 */
    const exportTransactionExcelForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportTransactionExcel.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReportController::exportTransactionExcel
 * @see app/Http/Controllers/ReportController.php:208
 * @route '/reports/transactions/excel'
 */
        exportTransactionExcelForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportTransactionExcel.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReportController::exportTransactionExcel
 * @see app/Http/Controllers/ReportController.php:208
 * @route '/reports/transactions/excel'
 */
        exportTransactionExcelForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportTransactionExcel.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportTransactionExcel.form = exportTransactionExcelForm
/**
* @see \App\Http\Controllers\ReportController::exportStockMovementExcel
 * @see app/Http/Controllers/ReportController.php:221
 * @route '/reports/stock-movements/excel'
 */
export const exportStockMovementExcel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportStockMovementExcel.url(options),
    method: 'get',
})

exportStockMovementExcel.definition = {
    methods: ["get","head"],
    url: '/reports/stock-movements/excel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::exportStockMovementExcel
 * @see app/Http/Controllers/ReportController.php:221
 * @route '/reports/stock-movements/excel'
 */
exportStockMovementExcel.url = (options?: RouteQueryOptions) => {
    return exportStockMovementExcel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::exportStockMovementExcel
 * @see app/Http/Controllers/ReportController.php:221
 * @route '/reports/stock-movements/excel'
 */
exportStockMovementExcel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportStockMovementExcel.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::exportStockMovementExcel
 * @see app/Http/Controllers/ReportController.php:221
 * @route '/reports/stock-movements/excel'
 */
exportStockMovementExcel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportStockMovementExcel.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReportController::exportStockMovementExcel
 * @see app/Http/Controllers/ReportController.php:221
 * @route '/reports/stock-movements/excel'
 */
    const exportStockMovementExcelForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportStockMovementExcel.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReportController::exportStockMovementExcel
 * @see app/Http/Controllers/ReportController.php:221
 * @route '/reports/stock-movements/excel'
 */
        exportStockMovementExcelForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportStockMovementExcel.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReportController::exportStockMovementExcel
 * @see app/Http/Controllers/ReportController.php:221
 * @route '/reports/stock-movements/excel'
 */
        exportStockMovementExcelForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportStockMovementExcel.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportStockMovementExcel.form = exportStockMovementExcelForm
const ReportController = { inventaris, transaksi, barangBulan, barangBulanDetail, exportBarangBulanPdf, exportInventoryPdf, exportInventoryExcel, kartuStokPdf, exportTransactionPdf, exportTransactionExcel, exportStockMovementExcel }

export default ReportController