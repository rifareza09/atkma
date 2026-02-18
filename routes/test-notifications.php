<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;

Route::get('/test-notifications', function () {
    $user = User::find(1);

    if (!$user) {
        return response()->json(['error' => 'User not found']);
    }

    $notifications = $user->notifications()
        ->orderBy('created_at', 'desc')
        ->limit(10)
        ->get()
        ->map(fn($notification) => [
            'id' => $notification->id,
            'type' => $notification->data['type'] ?? 'info',
            'title' => $notification->data['title'] ?? '',
            'message' => $notification->data['message'] ?? '',
            'link' => $notification->data['link'] ?? null,
            'read_at' => $notification->read_at,
            'created_at' => $notification->created_at,
            'data' => $notification->data,
        ]);

    return response()->json([
        'user_id' => $user->id,
        'user_name' => $user->name,
        'notifications_count' => $user->notifications()->count(),
        'unread_count' => $user->unreadNotifications()->count(),
        'notifications' => $notifications,
    ]);
});
