package ch.wiss.m294_295_project.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categories")
public class CategoryModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Size(min = 1, max = 50, message = "Kategoriename muss zwischen 1 und 50 Zeichen lang sein")
    @Column(nullable = false, length = 50, unique = true)
    private String name;

    @OneToMany(mappedBy = "category", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<ProductModel> products = new ArrayList<>();

    public CategoryModel() {
    }

    public CategoryModel(String name) {
        this.name = name;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public List<ProductModel> getProducts() { return products; }
    public void setProducts(List<ProductModel> products) { this.products = products; }
}
