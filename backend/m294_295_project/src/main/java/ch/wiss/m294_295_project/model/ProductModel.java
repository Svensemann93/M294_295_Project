package ch.wiss.m294_295_project.model;

import java.math.BigDecimal;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

@Entity // Diese Annotation kennzeichnet die Klasse als Entität, die in der Datenbank gespeichert wird.
@Table(name = "products")
public class ProductModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    /* Diese Annotation generiert automatisch eine eindeutige ID für jedes Produkt.
    GenerationType.IDENTITY bedeutet, dass es der Primärschlüssel ist.*/
    private Integer id;

    @NotNull(message = "Name darf nicht leer sein")
    @Size(min = 1, max = 100, message = "Name muss zwischen 1 und 100 Zeichen lang sein")
    @Column(nullable = false, length = 100)
    private String name;

    @Size(min = 1, max = 2000, message = "Beschreibung muss zwischen 1 und 2000 Zeichen lang sein")
    @Column(columnDefinition = "TEXT")
    private String description;

    @PositiveOrZero(message = "Preis muss positiv oder null sein")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;
    /* Ich benutze hier absichtlich BigDecimal für den Preis, um Genauigkeit bei finanziellen Berechnungen zu gewährleisten.
    Im Gegensatz zu float oder double, die Rundungsfehler verursachen können,
    bietet BigDecimal eine präzise Darstellung von Dezimalzahlen.*/

    @Positive(message = "Rating muss positiv sein")
    @NotNull(message = "Rating darf nicht leer sein")
    @Column(name = "rating", precision = 2, scale = 1)
    private BigDecimal rating;

        public ProductModel() {
        // Standardkonstruktor für JPA
    }

    public ProductModel(String name, String description, BigDecimal price, BigDecimal  rating) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.rating = rating;
    }

    // Getter & Setter
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public BigDecimal getRating() { return rating; }
    public void setRating(BigDecimal rating) { this.rating = rating; }
}

// Diese Klasse repräsentiert ein Produkt in der Datenbank.
// Sie enthält Felder für die ID, den Namen, die Beschreibung, den Preis und das Rating des Produkts.
//Weiter enthält sie Validierungsanmerkungen, um sicherzustellen, dass die Daten korrekt erfasst werden.



