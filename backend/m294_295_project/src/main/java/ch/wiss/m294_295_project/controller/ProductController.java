package ch.wiss.m294_295_project.controller;
import ch.wiss.m294_295_project.model.ProductModel;
import ch.wiss.m294_295_project.repository.ProductRepository;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/products")
    public List<ProductModel> getAllProducts() {
        return productRepository.findAll();
    }

    @PostMapping("/products")
    public ProductModel createProduct(@Valid @RequestBody ProductModel product) {
        return productRepository.save(product);
    }

    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable Integer id) {
        productRepository.deleteById(id);
    }

    @PutMapping("/products/{id}")
    public ProductModel updateProduct(@PathVariable Integer id, @Valid @RequestBody ProductModel productDetails) {
        ProductModel product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Produkt nicht gefunden: " + id));
        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setRating(productDetails.getRating());
        return productRepository.save(product);
    }
}