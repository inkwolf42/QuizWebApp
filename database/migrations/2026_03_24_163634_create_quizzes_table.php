<?php

use App\Enums\DifficultyEnum;
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
        Schema::create('quizzes', function (Blueprint $table) {
            $table->id();
            $table->foreignId("category_id")->nullable()->constrained()->nullOnDelete();
            $table->enum("difficulty",array_column(DifficultyEnum::cases(),'value'))->default(DifficultyEnum::NORMAL->value);
            $table->string("question","255");
            $table->boolean("has_multi_answer")->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quizzes');
    }
};
