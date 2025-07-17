/*
In dieser Klasse wird ein Produktmodell definiert, das die Eigenschaften eines Produkts in der Datenbank repräsentiert.
Inklusive Validierungsanmerkungen, um sicherzustellen, dass die Daten korrekt erfasst werden.
*/
package ch.wiss.m294_295_project.model;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

/*
@Entity bedeutet, dass diese Klasse eine JPA-Entität ist. JPA (Java Persistence API) ist eine Spezifikation für die Verwaltung von
persistenten Daten in Java-Anwendungen. Es ermöglicht die Abbildung von Java-Klassen auf Datenbanktabellen und die Verwaltung von
Datenbankoperationen. Dies ist nützlich, um die Datenbankoperationen zu vereinfachen und die Entitäten in der Anwendung zu verwenden,
ohne direkt mit SQL-Abfragen arbeiten zu müssen.
@Table(name = "products") gibt an, dass diese Entität in der Tabelle "products" gespeichert wird. Das ist nützlich, um
die Entität mit der Datenbank zu verknüpfen und die Struktur der Tabelle zu definieren.
*/
@Entity
@Table(name = "products")
public class ProductModel {

    /*
    @Id kennzeichnet das Attribut id als Primärschlüssel der Entität.
    */
    @Id

    /*
    @GeneratedValue(strategy = GenerationType.IDENTITY) bedeutet, dass die ID automatisch generiert wird.
    strategy = GenerationType.IDENTITY bedeutet, dass die ID von der Datenbank generiert wird.
    Das ist nützlich, um sicherzustellen, dass jede Entität eine eindeutige ID hat, die von der Datenbank verwaltet wird.
    */
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Integer id;

    /*
    @NotNull(message = "Name darf nicht leer sein) ist eine Validierungsanmerkung, die sicherstellt, dass das Feld "name"
    nicht null ist. Wenn das Feld leer ist, wird eine Fehlermeldung mit dem angegebenen Text zurückgegeben.
    @Size(min = 1, max = 100, message = "Name muss zwischen 1 und 100 Zeichen lang sein") ist eine Validierungsanmerkung,
    die sicherstellt, dass der Name des Produkts zwischen 1 und 100 Zeichen lang ist. Wenn der Name nicht den Anforderungen
    entspricht, wird eine Fehlermeldung mit dem angegebenen Text zurückgegeben.
    @Column(nullable = false, length = 100) bedeutet, dass die Spalte "name" in der Datenbank nicht null sein darf
    und eine maximale Länge von 100 Zeichen hat. Das ist nützlich, um sicherzustellen, dass der Name des Produkts
    in der Datenbank gespeichert werden kann und die Länge des Namens nicht überschreitet.
    */
    @NotNull(message = "Name darf nicht leer sein")
    @Size(min = 1, max = 100, message = "Name muss zwischen 1 und 100 Zeichen lang sein")
    @Column(nullable = false, length = 100)
    private String name;

    /*
    In diesem Fall haben wir bei @Column(columnDefinition = "TEXT") angegeben, dass die Spalte in der Datenbank
    als TEXT-Typ definiert werden soll. Das ist nützlich, wenn die Beschreibung des Produkts länger sein kann
    als die Standardlänge eines VARCHAR-Feldes. Die maximale Länge für VARCHAR-Felder sind in der Regel auf 255 Zeichen begrenzt.
    Text-Felder sind bei 65'535 Zeichen begrenzt.
    */
    @Size(min = 1, max = 2000, message = "Beschreibung muss zwischen 1 und 2000 Zeichen lang sein")
    @Column(columnDefinition = "TEXT")
    private String description;

    /*
    @PositiveOrZero(message = "Preis muss positiv oder null sein) ist eine Validierungsanmerkung, die sicherstellt, dass der Preis
    entweder positiv oder null ist. Wenn der Preis negativ ist, wird eine Fehlermeldung mit dem angegebenen Text zurückgegeben.
    @NotNull(message = "Preis darf nicht leer sein) ist eine Validierungsanmerkung, die sicherstellt, dass das Feld "price"
    nicht null ist. Wenn das Feld leer ist, wird eine Fehlermeldung mit dem angegebenen Text zurückgegeben.
    @Column(nullable = false, precision = 10, scale = 2) bedeutet, dass die Spalte "price" in der Datenbank nicht null sein darf
    und eine maximale Präzision von 10 Ziffern hat, davon 2 Nachkommastellen.
    -BigDecimal ist hier die beste Wahl, da es eine präzise Darstellung von Dezimalzahlen ermöglicht,
    insbesondere bei finanziellen Berechnungen. Im Gegensatz zu float oder double, die Rundungsfehler verursachen können,
    bietet BigDecimal eine genaue Darstellung von Dezimalzahlen und ist daher ideal für Preisangaben.
    */
    @PositiveOrZero(message = "Preis muss positiv oder null sein")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    /*
    @Positive(message = "Rating muss positiv sein) ist eine Validierungsanmerkung, die sicherstellt, dass das Rating
    positiv ist. Wenn das Rating negativ oder null ist, wird eine Fehlermeldung mit dem angegebenen Text zurückgegeben.
    @NotNull(message = "Rating darf nicht leer sein) ist eine Validierungsanmerkung, die sicherstellt, dass das Feld "rating"
    nicht null ist. Wenn das Feld leer ist, wird eine Fehlermeldung mit dem angegebenen Text zurückgegeben.
    @Column(name = "rating", precision = 2, scale = 1) bedeutet, dass die Spalte "rating" in der Datenbank
    eine maximale Präzision von 2 Ziffern hat, davon 1 Nachkommastelle.
    -BigDecimal ist hier die beste Wahl, da es eine präzise Darstellung von Dezimalzahlen ermöglicht,
    insbesondere bei Bewertungen, die oft auf einer Skala von 1 bis 5 oder 1 bis 10 liegen.
    */
    @Positive(message = "Rating muss positiv sein")
    @NotNull(message = "Rating darf nicht leer sein")
    @Column(name = "rating", precision = 2, scale = 1)
    private BigDecimal rating;

    /*
    Eine Kategorie kann mehrere Produkte haben, aber ein Produkt gehört zu genau einer Kategorie (Many-to-One-Beziehung).
    optional = false bedeutet, dass jedes Produkt eine Kategorie haben muss.
    */
    @ManyToOne(optional = false )

    /*
    @JoinColumn gibt an, dass die Spalte "category_id" in der Tabelle "products" die Fremdschlüsselspalte ist,
    die auf die Kategorie verweist. Das bedeutet, dass jedes Produkt eine Kategorie haben muss. nullable = false bedeutet,
    dass die Kategorie für jedes Produkt erforderlich ist und nicht null sein darf.
    */
    @JoinColumn(name = "category_id", nullable = false)


    /*
    @JsonIgnoreProperties("products") verhindert, dass die Produkte der Kategorie in der JSON-Ausgabe enthalten sind,
    wenn die Kategorie geladen wird. Dadurch wird ein Endlosloop vermieden, da sonst beim Laden der Kategorie
    auch die Produkte der Kategorie geladen würden, was wiederum die Kategorie laden würde, und so weiter.
    */
    @JsonIgnoreProperties ("products")
    private CategoryModel category;

        public ProductModel() {
    }

    /*
    Konstruktor, der alle Felder initialisiert. Der Konstruktor wird verwendet, um ein neues Produkt zu erstellen,
    indem alle erforderlichen Informationen wie Name, Beschreibung, Preis, Rating und Kategorie übergeben werden. Das bedeutet,
    dass beim Erstellen eines neuen Produkts alle erforderlichen Informationen bereitgestellt werden müssen.
    */
    public ProductModel(String name, String description, BigDecimal price, BigDecimal  rating, CategoryModel category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.rating = rating;
        this.category = category;
    }

    /* Getter- und Setter-Methoden für jedes Feld.
    Diese Methoden ermöglichen den Zugriff auf die privaten Felder der Klasse und das Setzen neuer Werte.
    Getter-Methoden geben den aktuellen Wert des Feldes zurück, während Setter-Methoden es zulassen, den Wert des Feldes zu ändern.
    */
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

    public CategoryModel getCategory() { return category; }
    public void setCategory(CategoryModel category) { this.category = category; }
}

/*
Fazit:
Diese Klasse repräsentiert ein Produkt in der Datenbank.
Sie enthält Felder für die ID, den Namen, die Beschreibung, den Preis und das Rating des Produkts.
Weiter enthält sie Validierungsanmerkungen, um sicherzustellen, dass die Daten korrekt erfasst werden.
*/