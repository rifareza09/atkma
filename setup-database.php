<?php
try {
    // Connect to MySQL without database selected
    $pdo = new PDO(
        'mysql:host=127.0.0.1;charset=utf8mb4',
        'root',
        '',
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    
    // Create database if not exists
    $pdo->exec('CREATE DATABASE IF NOT EXISTS `ma`');
    echo "Database 'ma' created or already exists.\n";
    
    // Test connection to the new database
    $pdo = new PDO(
        'mysql:host=127.0.0.1;dbname=ma;charset=utf8mb4',
        'root',
        '',
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    echo "✓ Connected to database 'ma' successfully.\n";
    
} catch (PDOException $e) {
    echo "✗ Error: " . $e->getMessage() . "\n";
    exit(1);
}
?>
