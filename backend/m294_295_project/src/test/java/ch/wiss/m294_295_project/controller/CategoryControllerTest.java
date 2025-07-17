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

    @BeforeEach
    void setup() {
        CategoryController controller = new CategoryController();

        ReflectionTestUtils.setField(controller, "categoryRepository", repo);

        mvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    void getAllReturnsList() throws Exception {
        when(repo.findAll()).thenReturn(List.of(new CategoryModel("Boxhandschuhe")));
        mvc.perform(get("/api/categories"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].name").value("Boxhandschuhe"));
    }

    @Test
    void getOneReturnsCategory() throws Exception {
        when(repo.findById(1)).thenReturn(java.util.Optional.of(new CategoryModel("Boxhandschuhe")));
        mvc.perform(get("/api/categories/1"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.name").value("Boxhandschuhe"));
    }

    @Test
    void createCategoryWithEmptyNameReturnsBadRequest() throws Exception {
        mvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post("/api/categories")
                .contentType("application/json")
                .content("{\"name\":\"\"}"))
            .andExpect(status().isBadRequest());
    }

    @Test
    void createCategoryWithTooLongNameReturnsBadRequest() throws Exception {
        String longName = "A".repeat(51);
        mvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post("/api/categories")
                .contentType("application/json")
                .content("{\"name\":\"" + longName + "\"}"))
            .andExpect(status().isBadRequest());
    }

    @Test
    void updateCategoryWithEmptyNameReturnsBadRequest() throws Exception {
        mvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put("/api/categories/1")
                .contentType("application/json")
                .content("{\"name\":\"\"}"))
            .andExpect(status().isBadRequest());
    }

    @Test
    void deleteCategoryReturnsOk() throws Exception {
        mvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete("/api/categories/1"))
            .andExpect(status().isOk());
    }

}
