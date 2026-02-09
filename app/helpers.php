<?php

use App\Models\Setting;

if (!function_exists('setting')) {
    /**
     * Get or set application settings
     *
     * @param string|null $key
     * @param mixed $default
     * @return mixed
     */
    function setting(?string $key = null, mixed $default = null): mixed
    {
        if ($key === null) {
            return new Setting;
        }

        // If key contains a dot and second parameter, it's a set operation
        if (func_num_args() === 2 && is_string($key)) {
            Setting::set($key, $default);
            return null;
        }

        return Setting::get($key, $default);
    }
}
