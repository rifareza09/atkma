<?php

namespace App\Notifications;

use App\Models\Barang;
use App\Models\StockMovement;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class StockReplenishedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public StockMovement $stockMovement,
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
            ->subject('✅ Stok Berhasil Ditambah: ' . $this->barang->nama)
            ->line('Stok barang telah berhasil ditambahkan:')
            ->line('')
            ->line('**Barang:** ' . $this->barang->nama)
            ->line('**Kode:** ' . $this->barang->kode)
            ->line('**Jumlah Ditambahkan:** ' . $this->stockMovement->quantity . ' ' . $this->barang->satuan)
            ->line('**Stok Sekarang:** ' . $this->barang->stok . ' ' . $this->barang->satuan)
            ->line('**Keterangan:** ' . ($this->stockMovement->keterangan ?? '-'))
            ->line('')
            ->action('Lihat Detail Barang', route('barang.show', $this->barang->id))
            ->line('Stok barang telah diperbarui di sistem.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'stock_replenished',
            'title' => 'Stok Ditambah',
            'message' => "Stok {$this->barang->nama} bertambah {$this->stockMovement->quantity} {$this->barang->satuan}",
            'barang_id' => $this->barang->id,
            'barang_kode' => $this->barang->kode,
            'barang_nama' => $this->barang->nama,
            'quantity_added' => $this->stockMovement->quantity,
            'stock_current' => $this->barang->stok,
            'satuan' => $this->barang->satuan,
            'stock_movement_id' => $this->stockMovement->id,
            'link' => route('barang.show', $this->barang->id),
        ];
    }
}
