<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->nullable()->constrained()->onDelete('set null'); // Link to order
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null'); // Link to order
            $table->string('midtrans_transaction_id')->nullable()->unique(); // Midtrans's Transaction ID
            $table->string('midtrans_order_id')->unique(); // Our unique order ID sent to Midtrans
            $table->decimal('gross_amount', 10, 2);
            $table->string('payment_type')->nullable(); // e.g., bank_transfer, echannel, qris
            $table->string('transaction_status')->default('pending'); // pending, settlement, expire, cancel, etc.
            $table->string('va_number')->nullable();
            $table->string('bank_name')->nullable();
            $table->string('bill_key')->nullable(); // For Mandiri
            $table->string('biller_code')->nullable(); // For Mandiri
            $table->text('qr_code_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
