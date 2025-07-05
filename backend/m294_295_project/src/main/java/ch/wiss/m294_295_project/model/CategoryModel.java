package ch.wiss.m294_295_project.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

@Entity // Diese Annotation kennzeichnet die Klasse als Entität, die in der Datenbank gespeichert wird.
@Table(name = "categories")
public class CategoryModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) /*Diese Annotation generiert automatisch eine eindeutige ID für jede Kategorie.*/
    private Integer id;

    /* Wir verwenden @Column, um die Spaltenattribute zu definieren.
    - nullable = false bedeutet, dass der Name nicht leer sein darf.
    - length = 50 begrenzt die Länge des Namens auf 50 Zeichen.
    - unique = true stellt sicher, dass der Name in der Datenbank eindeutig ist.*/
    @Size(min = 1, max = 50, message = "Kategoriename muss zwischen 1 und 50 Zeichen lang sein") // Validierung der Länge des Namens
    @Column(nullable = false, length = 50, unique = true)
    private String name;


    /*Eine Kategorie kann mehrere Produkte haben, aber ein Produkt gehört zu genau einer Kategorie (One-to-Many-Beziehung).
    Wir verwenden hier @OneToMany, um die Beziehung zwischen Kategorie und Produkten zu definieren.
    mappedBy gibt an, dass die Beziehung in der ProductModel-Klasse definiert ist

    CascadeType.ALL bedeutet, dass alle Operationen (Persist, Merge, Remove, Refresh, Detach) auf die Produkte angewendet werden,
    wenn die Kategorie gespeichert oder gelöscht wird.

    orphanRemoval = true bedeutet, dass Produkte, die nicht mehr zu dieser Kategorie gehören,
    automatisch aus der Datenbank entfernt werden.
    Dies ist nützlich, wenn Produkte gelöscht oder ihre Kategorie geändert wird.

    Wir nutzen eine ArrayList, um die Produkte zu speichern, die zu dieser Kategorie gehören.*/

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductModel> products = new ArrayList<>();
    public CategoryModel() {
        // Standardkonstruktor für JPA
    }

    public CategoryModel(String name) {
        this.name = name;
    }

    // Getter & Setter
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public List<ProductModel> getProducts() { return products; }
    public void setProducts(List<ProductModel> products) { this.products = products; }
}
