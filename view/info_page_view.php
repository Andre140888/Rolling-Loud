<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Database Output</title>
</head>
<body>

<?php if (!empty($error)): ?>
        <p style="color:red;"><?= htmlspecialchars($error) ?></p>

    <?php elseif (empty($result)): ?>
        <p>Geen data gevonden.</p>

    <?php else: ?>
        <ul>
        <?php foreach ($result as $row): ?>
            <?php
                // Split and trim
                $artists = array_map('trim', explode(',', $row['artiest']));
                $times   = array_map('trim', explode(',', $row['time']));
                // Determine how many pairs we can print
                $max = max(count($artists), count($times));
            ?>
            <?php for ($i = 0; $i < $max; $i++): ?>
                <li>
                    <strong>Artiest:</strong>
                    <?= isset($artists[$i]) ? htmlspecialchars($artists[$i]) : '<em>–</em>' ?>
                    <br>
                    <strong>Tijd:</strong>
                    <?= isset($times[$i])   ? htmlspecialchars($times[$i])   : '<em>–</em>' ?>
                </li>
                <hr>
            <?php endfor; ?>
        <?php endforeach; ?>
        </ul>
    <?php endif; ?>

    <a href="bestel.php"/a>

</body>
</html>
