<?php

namespace App\Notifications;

use App\Models\Transaction;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TransactionCreatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Transaction $transaction
    ) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $itemsCount = $this->transaction->items->count();
        $ruanganNama = $this->transaction->ruangan_nama ?? '-';

        return (new MailMessage)
            ->subject('📋 Permintaan Barang Baru: ' . $this->transaction->kode_transaksi)
            ->line('Permintaan barang baru telah dibuat dan menunggu persetujuan:')
            ->line('')
            ->line('**Kode Transaksi:** ' . $this->transaction->kode_transaksi)
            ->line('**Ruangan:** ' . $ruanganNama)
            ->line('**Peminta:** ' . $this->transaction->user->name)
            ->line('**Jumlah Item:** ' . $itemsCount . ' item')
            ->line('**Tanggal:** ' . $this->transaction->tanggal->format('d/m/Y'))
            ->line('')
            ->action('Lihat Detail Transaksi', route('transactions.show', $this->transaction->id))
            ->line('Silakan tinjau dan proses permintaan ini.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'transaction_created',
            'title' => 'Permintaan Barang Baru',
            'message' => "Transaksi {$this->transaction->kode_transaksi} menunggu persetujuan",
            'transaction_id' => $this->transaction->id,
            'transaction_code' => $this->transaction->kode_transaksi,
            'ruangan_nama' => $this->transaction->ruangan_nama ?? '-',
            'user_name' => $this->transaction->user->name,
            'items_count' => $this->transaction->items->count(),
            'status' => $this->transaction->status,
            'link' => route('transactions.show', $this->transaction->id),
        ];
    }
}
