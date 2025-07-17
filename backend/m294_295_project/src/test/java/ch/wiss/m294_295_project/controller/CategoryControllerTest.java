package ch.wiss.m294_295_project.controller;

import ch.wiss.m294_295_project.model.CategoryModel;
import ch.wiss.m294_295_project.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class CategoryControllerTest {

    private MockMvc mvc;

    @Mock
    private CategoryRepository repo;

    /*Wir erstellen den Controller „von Hand“, um ihn isoliert und ohne Spring-Umgebung zu testen
    und anschließend gezielt Mocks (Dummys) einzupflanzen. */
    @BeforeEach
    void setup() {
        CategoryController controller = new CategoryController();

        /*Der Controller hält jetzt statt eines echten Repositories ein repo–Mock in der privaten Variable.
        Wenn man später in einem Test controller.getAllCategories() o. Ä. aufruft, greift er nicht auf die echte Datenbank zu,
        sondern auf dein Stub-/Mock-Objekt.*/
        ReflectionTestUtils.setField(controller, "categoryRepository", repo);

        /*Standalone MockMvc bauen ( Statt den ganzen Spring-Boot-Context zu starten
        (mit allen Komponenten, Filtern, Security usw.), setzen wir den Controller
        “standalone” auf und bauen nur MockMvc  drumherum.)
        Mock MVc ist eine Test-Hilfe von Spring, mit der HTTP-Requests an den Controller geschickt werden,
        ohne einen echten Web-Server zu starten*/
        mvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    /*Ziel des Tests:
    - Sicherstellung, dass der Controller tatsächlich repo.findAll() aufruft
    - das Ergebnis korrekt in ein JSON-Array serialisiert
    - die erwartete Struktur und Werte liefert. */
    @Test
    void getAllReturnsList() throws Exception {
        when(repo.findAll()).thenReturn(List.of(new CategoryModel("Boxhandschuhe")));

        mvc.perform(get("/api/categories"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].name").value("Boxhandschuhe"));
    }

    /*Ziel des Tests:
    - Wenn im Test /api/categories/1 angefragt wird, ruft der Controller repo.findById(1) auf.
    Die so gefundene Kategorie gibt er dann als JSON-Antwort mit Status 200 zurück.
    - Er nimmt das CategoryModel und gibt es im JSON-Format zurück, damit der Client ein JSON-Objekt mit den Kategorien erhält.
    - Statuscode und JSON-Feld stimmen mit der Erwartung überein. */
    @Test
    void getOneReturnsCategory() throws Exception {
        when(repo.findById(1)).thenReturn(java.util.Optional.of(new CategoryModel("Boxhandschuhe")));

        mvc.perform(get("/api/categories/1"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.name").value("Boxhandschuhe"));
    }

    @Test
    void createCategoryWithEmptyNameReturnsBadRequest() throws Exception {
        // Testet, ob das Erstellen einer Kategorie mit leerem Namen abgelehnt wird.
        // Der Name ist ein Pflichtfeld. Fehlt er oder ist er leer, soll der Server "Bad Request" (400) zurückgeben.
        mvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post("/api/categories")
                .contentType("application/json")
                .content("{\"name\":\"\"}"))
            .andExpect(status().isBadRequest());
    }

    @Test
    void createCategoryWithTooLongNameReturnsBadRequest() throws Exception {
        // Testet, ob das Erstellen einer Kategorie mit zu langem Namen abgelehnt wird.
        // Angenommen, der Name darf maximal 50 Zeichen lang sein.
        String longName = "A".repeat(51); // 51 Zeichen
        mvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post("/api/categories")
                .contentType("application/json")
                .content("{\"name\":\"" + longName + "\"}"))
            .andExpect(status().isBadRequest());
    }

    @Test
    void updateCategoryWithEmptyNameReturnsBadRequest() throws Exception {
        // Testet, ob das Aktualisieren einer Kategorie mit leerem Namen abgelehnt wird.
        // Auch beim Update muss der Name ein Pflichtfeld sein.
        mvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put("/api/categories/1")
                .contentType("application/json")
                .content("{\"name\":\"\"}"))
            .andExpect(status().isBadRequest());
    }

    @Test
    void deleteCategoryReturnsOk() throws Exception {
        // Testet, ob das Löschen einer Kategorie funktioniert.
        // Wir erwarten, dass der Server mit "OK" (200) antwortet.
        mvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete("/api/categories/1"))
            .andExpect(status().isOk());
    }

}
