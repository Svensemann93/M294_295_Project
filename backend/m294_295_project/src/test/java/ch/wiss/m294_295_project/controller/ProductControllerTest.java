package ch.wiss.m294_295_project.controller;
import ch.wiss.m294_295_project.model.CategoryModel;
import ch.wiss.m294_295_project.model.ProductModel;
import ch.wiss.m294_295_project.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class ProductControllerTest {

    private MockMvc mvc;

    @Mock
    private ProductRepository productRepository;

    @BeforeEach
    void setup() {
        // 1) Controller instanziieren
        ProductController controller = new ProductController();

        // 2) Mock-Repository ins private Feld injizieren
        ReflectionTestUtils.setField(controller, "productRepository", productRepository);

        // 3) MockMvc standalone aufbauen
        mvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    void getAllProductsReturnsList() throws Exception {
        // Arrange: Stube ein Category- und Product-Objekt
        CategoryModel cat = new CategoryModel("Helme");
        cat.setId(1);
        ProductModel prod = new ProductModel("Testhelm", "Beschreibung", BigDecimal.valueOf(99.90), BigDecimal.valueOf(5), cat);
        prod.setId(42);

        when(productRepository.findAll()).thenReturn(List.of(prod));

        // Act & Assert (hier werden die erwarteten eingegebenen Werte mit den erwarteten Werten verglichen)
        mvc.perform(get("/api/products"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].id").value(42))
            .andExpect(jsonPath("$[0].name").value("Testhelm"))
            .andExpect(jsonPath("$[0].price").value(99.90))
            .andExpect(jsonPath("$[0].rating").value(5))
            .andExpect(jsonPath("$[0].category.id").value(1));
    }

    @Test
    void updateProductReturnsUpdatedProduct() throws Exception {
        // Arrange: existierendes Produkt stubben
        CategoryModel cat = new CategoryModel("Helme");
        cat.setId(1);
        ProductModel existing = new ProductModel("Altname", "Alte Beschreibung", BigDecimal.valueOf(50.00), BigDecimal.valueOf(4), cat);
        existing.setId(7);

        when(productRepository.findById(7)).thenReturn(Optional.of(existing));
        // save(...) soll einfach das übergebene Objekt zurückgeben
        when(productRepository.save(any(ProductModel.class))).thenAnswer(inv -> inv.getArgument(0));

        String updateJson = """
            {
                "name": "NeuerName",
                "description": "Neue Beschreibung",
                "price": 75.00,
                "rating": 4.5,
                "category": { "id": 1 }
            }
        """;

        // Act & Assert
        mvc.perform(put("/api/products/7")
                .contentType(APPLICATION_JSON)
                .content(updateJson))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(7))
            .andExpect(jsonPath("$.name").value("NeuerName"))
            .andExpect(jsonPath("$.price").value(75.00))
            .andExpect(jsonPath("$.rating").value(4.5));
    }
}