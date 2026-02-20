<?php

namespace App\Notifications;

use App\Models\Transaction;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TransactionStatusChangedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Transaction $transaction,
        public string $oldStatus,
        public string $newStatus
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
        $statusText = match($this->newStatus) {
            'approved' => 'Disetujui ✅',
            'rejected' => 'Ditolak ❌',
            'revised' => 'Perlu Revisi 🔄',
            default => ucfirst($this->newStatus),
        };

        $mail = (new MailMessage)
            ->subject("Status Transaksi: {$statusText}")
            ->line("Status permintaan barang Anda telah diubah:")
            ->line('')
            ->line('**Kode Transaksi:** ' . $this->transaction->kode_transaksi)
            ->line('**Status Baru:** ' . $statusText);

        if ($this->newStatus === 'approved') {
            $mail->line('**Disetujui oleh:** ' . ($this->transaction->approver->name ?? '-'))
                ->line('**Tanggal:** ' . ($this->transaction->approved_at?->format('d/m/Y H:i') ?? '-'));
        } elseif ($this->newStatus === 'rejected') {
            $mail->line('**Ditolak oleh:** ' . ($this->transaction->rejector->name ?? '-'))
                ->line('**Alasan:** ' . ($this->transaction->rejection_reason ?? '-'))
                ->line('**Tanggal:** ' . ($this->transaction->rejected_at?->format('d/m/Y H:i') ?? '-'));
        } elseif ($this->newStatus === 'revised') {
            $mail->line('**Direview oleh:** ' . ($this->transaction->revisor->name ?? '-'))
                ->line('**Catatan Revisi:** ' . ($this->transaction->revision_notes ?? '-'))
                ->line('**Tanggal:** ' . ($this->transaction->revised_at?->format('d/m/Y H:i') ?? '-'));
        }

        $mail->line('')
            ->action('Lihat Detail Transaksi', route('transactions.show', $this->transaction->id));

        return $mail;
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'transaction_status_changed',
            'title' => 'Status Transaksi Berubah',
            'message' => "Transaksi {$this->transaction->kode_transaksi} {$this->getStatusText()}",
            'transaction_id' => $this->transaction->id,
            'transaction_code' => $this->transaction->kode_transaksi,
            'old_status' => $this->oldStatus,
            'new_status' => $this->newStatus,
            'link' => route('transactions.show', $this->transaction->id),
        ];
    }

    /**
     * Get status text in Indonesian
     */
    private function getStatusText(): string
    {
        return match($this->newStatus) {
            'approved' => 'telah disetujui',
            'rejected' => 'ditolak',
            'revised' => 'perlu direvisi',
            'pending' => 'menunggu persetujuan',
            default => $this->newStatus,
        };
    }
}
