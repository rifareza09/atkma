<?php

namespace App\Notifications;

use App\Models\Barang;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class LowStockNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Barang $barang
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
        return (new MailMessage)
            ->subject('⚠️ Peringatan Stok Rendah: ' . $this->barang->nama)
            ->line('Stok barang berikut telah mencapai batas minimum:')
            ->line('')
            ->line('**Barang:** ' . $this->barang->nama)
            ->line('**Kode:** ' . $this->barang->kode)
            ->line('**Stok Tersisa:** ' . $this->barang->stok . ' ' . $this->barang->satuan)
            ->line('**Stok Minimum:** ' . $this->barang->stok_minimum . ' ' . $this->barang->satuan)
            ->line('')
            ->action('Lihat Detail Barang', route('barang.show', $this->barang->id))
            ->line('Segera lakukan pengadaan untuk menghindari kehabisan stok.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'low_stock',
            'title' => 'Stok Rendah',
            'message' => "Stok {$this->barang->nama} tersisa {$this->barang->stok} {$this->barang->satuan}",
            'barang_id' => $this->barang->id,
            'barang_kode' => $this->barang->kode,
            'barang_nama' => $this->barang->nama,
            'stok_current' => $this->barang->stok,
            'stok_minimum' => $this->barang->stok_minimum,
            'satuan' => $this->barang->satuan,
            'link' => route('barang.show', $this->barang->id),
        ];
    }
}
