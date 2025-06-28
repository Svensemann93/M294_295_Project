package ch.wiss.m294_295_project.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import ch.wiss.m294_295_project.model.CategoryModel;
import ch.wiss.m294_295_project.repository.CategoryRepository;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping
    public List<CategoryModel> getAll() {
        return categoryRepository.findAll();
    }

        @GetMapping("/{id}")
    public CategoryModel getOne(@PathVariable Integer id) {
        return categoryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Kategorie nicht gefunden: " + id));
    }

    @PostMapping
    public CategoryModel create(@RequestBody CategoryModel cat) {
        return categoryRepository.save(cat);
    }

    @PutMapping("/{id}")
    public CategoryModel update(@PathVariable Integer id, @RequestBody CategoryModel catDetails) {
        CategoryModel cat = categoryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Kategorie nicht gefunden: " + id));
        cat.setName(catDetails.getName());
        return categoryRepository.save(cat);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        categoryRepository.deleteById(id);
    }
}
