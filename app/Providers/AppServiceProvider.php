<?php

namespace App\Providers;

use App\Events\LowStockDetected;
use App\Events\StockReplenished;
use App\Events\TransactionCreated;
use App\Events\TransactionStatusChanged;
use App\Listeners\SendLowStockNotification;
use App\Listeners\SendStockReplenishedNotification;
use App\Listeners\SendTransactionCreatedNotification;
use App\Listeners\SendTransactionStatusNotification;
use App\Listeners\UpdateLastLogin;
use App\Models\AuditLog;
use App\Models\Setting;
use App\Policies\AuditLogPolicy;
use App\Policies\SettingPolicy;
use Carbon\CarbonImmutable;
use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
        $this->registerPolicies();
        $this->registerEventListeners();
    }

    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null
        );
    }

    protected function registerPolicies(): void
    {
        Gate::policy(Setting::class, SettingPolicy::class);
        Gate::policy(AuditLog::class, AuditLogPolicy::class);
    }

    protected function registerEventListeners(): void
    {
        Event::listen(
            LowStockDetected::class,
            SendLowStockNotification::class
        );

        Event::listen(
            TransactionCreated::class,
            SendTransactionCreatedNotification::class
        );

        Event::listen(
            StockReplenished::class,
            SendStockReplenishedNotification::class
        );

        Event::listen(
            TransactionStatusChanged::class,
            SendTransactionStatusNotification::class
        );

        Event::listen(
            Login::class,
            UpdateLastLogin::class
        );
    }
}
