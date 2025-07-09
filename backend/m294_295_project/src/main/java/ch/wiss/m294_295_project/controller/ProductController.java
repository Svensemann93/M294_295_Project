/*
Der ProductController ist eine REST-API, die CRUD-Operationen für Produkte bereitstellt.
Er ermöglicht das Abrufen, Erstellen, Aktualisieren und Löschen von Produkten.
Die API ist so konfiguriert, dass sie Cross-Origin-Anfragen von einem Frontend auf "http://localhost:5173" erlaubt.
Das bedeutet, dass das Frontend auf einem anderen Port oder einer anderen Domain laufen kann, ohne dass es zu CORS-Problemen kommt.
CORS (Cross-Origin Resource Sharing) ist eine Sicherheitsfunktion, die es Webanwendungen ermöglicht, Ressourcen von anderen
Ursprüngen (Domains) anzufordern.
*/
package ch.wiss.m294_295_project.controller;
import ch.wiss.m294_295_project.model.ProductModel;
import ch.wiss.m294_295_project.repository.ProductRepository;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/*
@RestController macht diese Klasse zu einem REST-Controller, der HTTP-Anfragen verarbeitet.
@RequestMapping("/api") legt den Basis-Pfad für alle Endpunkte dieser Klasse fest.
@CrossOrigin(origins = "http://localhost:5173") erlaubt Cross-Origin-Anfragen von der angegebenen URL.
*/
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    /*
    @Autowired bedeutet, dass Spring Boot automatisch eine Instanz von ProductRepository
    in dieses Feld injiziert, wenn die Anwendung gestartet wird. Das heisst, dass Spring Boot die Abhängigkeit für uns verwaltet
    und wir nicht manuell eine Instanz erstellen müssen.
    */
    @Autowired
    private ProductRepository productRepository;

    /*
    @GetMapping("/products") bedeutet, dass diese Methode auf GET-Anfragen an die URL /api/products reagiert.
    Diese Methode gibt eine Liste aller Produkte zurück, die im Repository gespeichert sind.
    */
    @GetMapping("/products")
    public List<ProductModel> getAllProducts() {
        return productRepository.findAll();
    }

    /*
    hier wird eine Get-Methode definiert, die ein Produkt anhand seiner ID abruft. Wenn das Produkt nicht gefunden wird,
    wird eine Fehlermeldung ausgelöst. @PathVariable wird verwendet, um den Wert der Produkt-ID aus der URL zu extrahieren.
    */
    @GetMapping("/products/{id}")
    public ProductModel getProductById(@PathVariable Integer id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Produkt nicht gefunden mit der ID: " + id));
    }

    /* hier wird eine Post-Methode definiert, die ein neues Produkt erstellt.
    @PostMapping("/products") bedeutet, dass diese Methode auf POST-Anfragen an die URL /api/products reagiert.
    @Valid bedeutet, dass die übergebenen Daten den Validierungsregeln entsprechen müssen,
    die in der ProductModel-Klasse definiert sind.
    @RequestBody wird verwendet, um die Daten des Produkts aus der Anfrage zu extrahieren.
    */
    @PostMapping("/products")
    public ProductModel createProduct(@Valid @RequestBody ProductModel product) {
        return productRepository.save(product);
    }

    /* hier wird eine Delete-Methode definiert, die ein Produkt anhand seiner ID löscht.
    @PathVariable wird verwendet, um den Wert der Produkt-ID aus der URL zu extrahieren. Das heisst,
    dass die ID des zu löschenden Produkts in der URL angegeben wird.
    */
    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable Integer id) {
        productRepository.deleteById(id);
    }

    /* hier wird eine Put-Methode definiert, die ein bestehendes Produkt aktualisiert.
    @PathVariable wird verwendet, um den Wert der Produkt-ID aus der URL zu extrahieren.
    @Valid bedeutet, dass die übergebenen Daten den Validierungsregeln entsprechen müssen,
    die in der ProductModel-Klasse definiert sind.
    @RequestBody wird verwendet, um die Daten des Produkts aus der Anfrage zu extrahieren.
    bei RuntimeException wird eine Fehlermeldung ausgelöst, wenn das Produkt nicht gefunden wird.
    */
    @PutMapping("/products/{id}")
    public ProductModel updateProduct(@PathVariable Integer id, @Valid @RequestBody ProductModel productDetails) {
        ProductModel product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Produkt nicht gefunden: " + id));
        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setRating(productDetails.getRating());
        product.setCategory(productDetails.getCategory());
        return productRepository.save(product);
    }
}