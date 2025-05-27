<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('savings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('type', ['emergencia', 'ocio', 'vivienda', 'educación', 'retiro', 'otro']);
            $table->date('start_date');
            $table->date('target_date');
            $table->decimal('target_amount', 15)->default(0);
            $table->decimal('current_amount', 15)->nullable()->default(0);
            $table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('savings');
    }
};
