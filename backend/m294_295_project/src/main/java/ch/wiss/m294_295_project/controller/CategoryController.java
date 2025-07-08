/*
hier  werden die REST-API-Endpunkte für Kategorien definiert. Das bedeutet, dass die URLs der Anwendung definiert und
aufgerufen werden können, um mit Kategorien zu interagieren.
Die Klasse ermöglicht das Abrufen, Erstellen, Aktualisieren und Löschen von Kategorien.
Sie verwendet Spring Boot's @RestController und @RequestMapping Annotationen.
 */
package ch.wiss.m294_295_project.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import ch.wiss.m294_295_project.model.CategoryModel;
import ch.wiss.m294_295_project.repository.CategoryRepository;
import jakarta.validation.Valid;

import java.util.List;

/*
hier wird die Klasse CategoryController definiert und die REST-API-Endpunkte für Kategorien bereitstellt.
Die Klasse ist mit @RestController annotiert, was bedeutet, dass sie HTTP-Anfragen verarbeitet
*/
@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {
    /*
    @Autowired bedeutet, dass Spring Boot automatisch eine Instanz von CategoryRepository
    in dieses Feld injiziert, wenn die Anwendung gestartet wird. Das heisst, dass Spring Boot die Abhängigkeit für uns verwaltet
    und wir nicht manuell eine Instanz erstellen müssen.
    */
    @Autowired
    private CategoryRepository categoryRepository;

    /*
    @GetMapping bedeutet, dass diese Methode auf GET-Anfragen an die URL /api/categories reagiert.
    Diese Methode gibt eine Liste aller Kategorien zurück, die im Repository gespeichert sind.
    */
    @GetMapping
    public List<CategoryModel> getAll() {
        return categoryRepository.findAll();
    }
    /*
    hier wird eine Get-Methode definiert, die eine Kategorie anhand ihrer ID abruft. Wenn die Kategorie nicht gefunden wird,
    wird eine Fehlermeldung ausgelöst.
    @PathVariable wird verwendet, um den Wert der Kategorie-ID aus der URL zu extrahieren.
    */
    @GetMapping("/{id}")
    public CategoryModel getOne(@PathVariable Integer id) {
        return categoryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Kategorie nicht gefunden: " + id));
    }
    /*
    @PostMapping bedeutet, dass diese Methode auf POST-Anfragen an die URL /api/categories reagiert.
    Diese Methode erstellt eine neue Kategorie basierend auf den im Request-Body übergebenen Daten und gibt sie zurück.
    Die @Valid Annotation stellt sicher, dass die übergebenen Daten den Validierungsregeln entsprechen,
    die in der CategoryModel-Klasse definiert sind.
    @RequestBody wird verwendet, um die Daten der Kategorie aus der Eingabe zu extrahieren.
    */
    @PostMapping
    public CategoryModel create(@Valid @RequestBody CategoryModel cat) {
        return categoryRepository.save(cat);
    }
    /*
    @PutMapping("/{id}") bedeutet, dass diese Methode auf PUT-Anfragen an die URL /api/categories/{id} reagiert.
    Diese Methode aktualisiert eine bestehende Kategorie basierend auf der übergebenen ID und den im Request-Body übergebenen Daten.
    Wenn die Kategorie nicht gefunden wird, wird eine Fehlermeldung ausgelöst.
    @PathVariable wird verwendet, um den Wert der Kategorie-ID aus der URL zu extrahieren.
    Die @Valid Annotation stellt sicher, dass die übergebenen Daten den Validierungsregeln entsprechen,
    die in der CategoryModel-Klasse definiert sind.
    @RequestBody wird verwendet, um die Daten der Kategorie aus der Eingabe zu extrahieren.
    */
    @PutMapping("/{id}")
    public CategoryModel update(@PathVariable Integer id,@Valid @RequestBody CategoryModel catDetails) {
        CategoryModel cat = categoryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Kategorie nicht gefunden: " + id));
        cat.setName(catDetails.getName());
        return categoryRepository.save(cat);
    }
    /*
    @DeleteMapping("/{id}") bedeutet, dass die Kategorie mit der angegebenen ID gelöscht wird.
    */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        categoryRepository.deleteById(id);
    }
}
