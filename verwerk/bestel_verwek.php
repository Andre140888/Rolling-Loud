require "config.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $volledige_naam = $_POST['volledige_naam'] ?? '';
    $email = $_POST['email'] ?? '';
    $quantity = $_POST['quantity'] ?? '';

    // Foutmeldingen verzamelen
    $foutmeldingen = [];

    if (empty($volledige_naam)) {
        $foutmeldingen[] = "Vul je volledige naam in.";
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $foutmeldingen[] = "Voer een geldig e-mailadres in.";
    }

    if (!is_numeric($quantity) || $quantity <= 0) {
        $foutmeldingen[] = "Aantal moet een getal groter dan nul zijn.";
    }
}

include("View/bestel_view.php");
