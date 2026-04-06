<?php
echo "Current directory: " . __DIR__ . "\n";
echo "Current file: " . __FILE__ . "\n";

$basePath = dirname(__DIR__);
$autoloadPath = $basePath . '/vendor/autoload.php';

echo "Looking for autoload at: " . $autoloadPath . "\n";
echo "File exists: " . (file_exists($autoloadPath) ? 'YES' : 'NO') . "\n";

if (file_exists($autoloadPath)) {
    require_once $autoloadPath;
    echo "✓ Autoload loaded\n";
    echo "✓ Application class exists: " . (class_exists('Illuminate\\Foundation\\Application') ? 'YES' : 'NO') . "\n";
} else {
    echo "✗ Autoload not found\n";
}
?>
