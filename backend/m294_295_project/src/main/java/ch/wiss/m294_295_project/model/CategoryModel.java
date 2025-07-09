/*
Hier wird die Klasse CategoryModel definiert, die eine Kategorie in der Datenbank repräsentiert.
Diese Klasse ist mit JPA-Annotationen versehen, um die Datenbankinteraktion zu ermöglichen.
Die Klasse enthält Attribute wie id, name und eine Liste von Produkten, die zu dieser Kategorie gehören.
*/

package ch.wiss.m294_295_project.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

/*
Die Klasse ist mit @Entity annotiert, was bedeutet, dass sie eine Entität in der Datenbank repräsentiert.
Die Annotation @Table gibt an, dass diese Entität in der Tabelle "categories" gespeichert wird.
*/
@Entity
@Table(name = "categories")
public class CategoryModel {

    /*
    @Id kennzeichnet das Attribut id als Primärschlüssel der Entität.
    @GeneratedValue(strategy = GenerationType.IDENTITY) bedeutet, dass die ID automatisch generiert wird und zwar als Integer-Wert.
    Dies ist nützlich, um sicherzustellen, dass jede Kategorie eine eindeutige ID hat, die von der Datenbank verwaltet wird.
    */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /*
    @Size(min = 1, max = 50, message = "Kategoriename muss zwischen 1 und 50 Zeichen lang sein") ist eine Validierungsannotation,
    die sicherstellt, dass der Name der Kategorie zwischen 1 und 50 Zeichen lang ist.
    Wenn der Name nicht den Anforderungen entspricht, wird eine Fehlermeldung zurückgegeben.
    Wir verwenden @Column, um die Spaltenattribute zu definieren.
    - nullable = false bedeutet, dass der Name nicht leer sein darf.
    - length = 50 begrenzt die Länge des Namens auf 50 Zeichen.
    - unique = true stellt sicher, dass der Name in der Datenbank eindeutig ist.
    Wir definieren die Maximallänge in @Size und in @Column, um sicherzustellen, dass der Name der Kategorie
    sowohl in der Anwendung als auch in der Datenbank den gleichen Einschränkungen unterliegt.
    */
    @Size(min = 1, max = 50, message = "Kategoriename muss zwischen 1 und 50 Zeichen lang sein") // Validierung der Länge des Namens
    @Column(nullable = false, length = 50, unique = true)
    private String name;


    /*
    @OneToMany verwenden wir, um eine Eins-zu-Viele-Beziehung zwischen der Kategorie und den Produkten zu definieren.
    - mappedBy = "category" gibt an, dass die Beziehung in der Klasse ProductModel definiert ist, das heisst, dass die Kategorie
    in der ProductModel-Klasse referenziert wird.
    - cascade = {CascadeType.PERSIST, CascadeType.MERGE} bedeutet, dass Änderungen an der Kategorie auch auf die zugehörigen
    Produkte angewendet werden. Das heisst, wenn wir eine Kategorie speichern oder aktualisieren, werden auch die zugehörigen
    Produkte gespeichert oder aktualisiert. Somit verhindern wir, dass die Produkte gelöscht werden, wenn die Kategorie gelöscht wird.
    - private List<ProductModel> products = new ArrayList<>(); initialisiert die Liste der Produkte als leere Liste.
    Diese Liste wird verwendet, um alle Produkte zu speichern, die zu dieser Kategorie gehören.
    */

    @OneToMany(mappedBy = "category", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<ProductModel> products = new ArrayList<>();
    public CategoryModel() {
    }

    /*
    Konstruktor, der den Namen der Kategorie als Parameter akzeptiert.
    Dieser Konstruktor wird verwendet, um eine neue Kategorie zu erstellen, wenn nur der Name bekannt ist.
    */
    public CategoryModel(String name) {
        this.name = name;
    }

    /*
    Getter- und Setter-Methoden für die Attribute der Klasse.
    Diese Methoden ermöglichen den Zugriff auf die Attribute der Klasse und deren Modifikation.
    */
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public List<ProductModel> getProducts() { return products; }
    public void setProducts(List<ProductModel> products) { this.products = products; }
}
